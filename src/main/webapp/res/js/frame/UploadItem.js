/**
 * 
 */

ClassFactory.defineClass("WaitImage", "CanvasItem");

isc.WaitImage.addProperties({
    height : 16, 
    width : 16,
    createCanvas : function () {
        return isc.Img.create({
            name : "wait",
            width : this.width, 
            height : this.height,
            imageType : "center", 
//            src : "../images/fms/wait.gif"
            src : null
        });
    }
});

// 

ClassFactory.defineClass("NotifyLabel", "CanvasItem");

isc.NotifyLabel.addProperties({
    height: "100%",
    width: "100%",
    createCanvas: function(){
        return isc.Label.create({
            name: "notifyLabel",
            height: this.height,
            width: this.width,
            align: "right",
            //backgroundColor: "lightblue",
            contents: ""
        })
    }
})

// 
ClassFactory.defineClass("MyUploadForm", isc.DynamicForm);

isc.MyUploadForm.addClassProperties({
    _$isc_iframe_upload_999 : "isc_iframe_upload_999",
    _iframe : null,
    responseCallback:null //

});

// 
isc.MyUploadForm.addProperties({
    
    encoding : "multipart",
    /**
     * 
     * @property {read write String} ? 
     */     
    action : null,//
    target : isc.MyUploadForm._$isc_iframe_upload_999,//
    selectTitle : isc.i18nMessages.uploadForm_selectTitle,
    submitTitle : isc.i18nMessages.uploadForm_submitTitle,
    cellPadding:2,//
    shouldPrompt : true,
    completePrompt : isc.i18nMessages.uploadForm_completePrompt,
    failedPrompt : isc.i18nMessages.uploadForm_failedPrompt,
    /**
     * 
     * @property {read write boolean} ? 
     */ 
    showTitle: false,
    wrapItemTitles : false,// 
    response:null,
    firstColWidth: 80, //
    button:null,
    idValue:null,
    nameValue:null
});



isc.MyUploadForm.addMethods({
	/**
	 * 
	 * @function {void} ?
	 */	
	initWidget : function() {

		//
		ret = this.Super("initWidget", arguments);
		
		var body = document.getElementsByTagName("body")[0];
		if (isc.MyUploadForm.iframe == null) {
			var ele = null;
			if (isc.Browser.isIE) {
				var sHTML = '<iframe name="' + isc.MyUploadForm._$isc_iframe_upload_999 + '" id="' + isc.MyUploadForm._$isc_iframe_upload_999 + '" style="display: none"' + '><' + '/iframe>';
				body.insertAdjacentHTML("afterBegin", sHTML);
				ele=document.getElementById(isc.MyUploadForm._$isc_iframe_upload_999);
			}
			else {
				ele = document.createElement("iframe");
				ele.setAttribute("name", isc.MyUploadForm._$isc_iframe_upload_999);
				ele.style.display = "none";
				body.appendChild(ele);
			}
			
			isc.MyUploadForm.iframe = ele;
		}
				
	
		var upLoadWidth=null;
		if(!this.showTitle){
			upLoadWidth=150;
			this.numCols=4;
			this.colWidths= ["*", 300, 70, 16]
		}
		else{
			upLoadWidth=150;
			this.numCols=5;
			this.colWidths= [this.firstColWidth, "*", 300, 70, 16]
		}		
                
		
		var that = this;
		this.button = 
		{

				title : "上传附件",
				name:"uploadButton",
				type : "button",
				width : 70,
				startRow : false,
				endRow : false,
				click : function() {
					var form1 = this.form;
					if (isc.Browser.isIE) {
						if(isc.MyUploadForm.responseCallback!=null){
							isc.MyUploadForm.iframe.detachEvent("onload",isc.MyUploadForm.responseCallback);
						}
						isc.MyUploadForm.responseCallback=(function(){
							return function(){
								form1.onFinished()
							};
						})()
						isc.MyUploadForm.iframe.attachEvent("onload",isc.MyUploadForm.responseCallback );
					}
					else{
						isc.MyUploadForm.iframe.onload = (function(){
							return function(){
								form1.onFinished()
							};
						})();							
					}
					

//					that.waitImg=isc.Dialog.create({
//						showModalMask  :true,
//						isModal: true,
//						showStatusBar :false,
//						showTitle :false,
//						showResizer :false,
//						showMinimizeButton :false,
//						showHeaderIcon :false,
//						showHeader :false,
//						showFooter :false,
//						showCloseButton :false,
//						items:[isc.Img.create({imageWidth:8,imageHeight:8,src:"../images/fms/wait.gif"})]
//					});
//					that.waitImg.show();
					
					if(that.getValue("upload"))
					{
					    that.getField("notify").canvas.setContents("");
					    that.getField("image").canvas.setBackgroundImage("res/images/wait.gif");
//					    that.getFiled("image").show();
					    
					}
					else
					{
					    that.getField("notify").canvas.setContents("<em>"
							+ "上传中"
							+ "</em>");
					    return;
					}
					
					this.form.submitForm();					
				}
			};
		
		this.setFields([
				{
					name : "upload",
					showTitle : this.showTitle,
					title : this.selectTitle,
					width : upLoadWidth,
					type : "upload",
					colSpan : 1,
					endRow : false
				},
				{
                    title : "上传中",
                    name : "notify",
                    align: "right",
                    width : 150,
                    editorType :"NotifyLabel",
                    showTitle : false,
                    startRow : false,
                    endRow : false,
                    visible: true
                },
				this.button,
				{
				    title : "waitImage",
				    name : "image",
				    width : 16,
			        editorType :"WaitImage",
			        showTitle : false,
			        startRow : false
//			        visible : false
				},
				{
					type:"hidden",
					defaultValue:this.idValue,
					name:"id"
				},
				{
					type:"hidden",
					defaultValue:this.nameValue,
					name:"name"
				}
				
				]);
		return ret;
	},
	
	disable: function(){
        this.getItem("upload").disable();
        this.getItem("uploadButton").disable();
        
    },
    
    
    enable: function(){
        this.getItem("upload").enable();
        this.getItem("uploadButton").enable();
    },
    
    /**
     * 
     * @function {void} ?
     */
	onFinished: function(){
	   	try {
//	   		this.waitImg.hide();
//	   	    this.getField("image").hide();
	   	    
	   	    //
	   	    this.getField("image").canvas.setBackgroundImage("null");
	   		var fileName=this.getValue("upload");
			if(!isc.MyUploadForm.iframe||!this.getValue("upload"))
			{
				return;
			}

			//
			var sJson = isc.MyUploadForm.iframe.contentWindow.document.body.innerText;
			if( sJson == undefined ){
				sJson = isc.MyUploadForm.iframe.contentWindow.document.body.textContent;
			}
			
			eval("this.response=" + sJson);
			if( this.response.response.result == web_const.result_success )
			{
				this.onSuccess( this.response.response );
	   	    }
			else
			{
				this.onFailed( this.response.response );
			}
	   	}
	   	catch (e) {
	   		this.onFailed(this.getValue("upload"),"上传失败");
	   	}
   },
    
    /**
     * 
     * @function {void}
     * @param {String} fileName - 
     */
    onSuccess: function(fileName){
        isc.say(this.completePrompt+"<br>"+fileName);
        
    },

    /**
     * 
     * @function {void} ?
     * @param {String} fileName - 
     */
    onFailed: function(fileName){
        if(this.response)
            isc.say(this.failedPrompt+"<br>"+fileName+this.response.response.data);
        else
            isc.say(this.failedPrompt+"<br>"+fileName);
    }
		
});