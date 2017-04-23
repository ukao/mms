/**
 * 
 */
ClassFactory.defineClass("sdk_upload_window", isc.Window);

/**
 * plant window
 */
isc.sdk_upload_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
    title:null,
    data:null,
    pane:null
});


/**
 * 
 */
isc.sdk_upload_window.addMethods({
    initWidget: function()
    {
    	this.Super("initWidget", arguments);
		this.title=Page_I18n.title_sdk_window_upload;
        this.addItem(this.createVLayout());
	},
	createVLayout:function()
	{
		this.form = this.createUploadForm();
		var hlayout = this.createLayout();
		var layout = isc.VLayout.create({
			layoutTopMargin: 10
		});
		layout.addMember(this.form );
		layout.addMember(hlayout );
		return layout;
	},
	createUploadForm:function()
	{
		var that = this;
		return isc.MyUploadForm.create({
			firstColWidth:  80,
            showTitle: true,
            selectTitle: "",
			action: "/business/sdk/upload",
			idValue:this.data.id,
			nameValue:this.data.name,
            cellPadding: 2,//元素内补丁
            cellSpacing: 2,//元素间间隙
            onSuccess: function(response){
                if( response.result ==web_const.result_success)
                {
                	that.closeClick();
					that.pane.searchList();
                }
                isc.say(response.desc);
            },
            onFailed: function(response){
            	that.result.setWidth(that.getWidth()-30); 
            	that.result.setContents("<div width='"+(that.getWidth()-30)+"'><hr><font color='blue'>"+response.desc.replace(/\r\n/g,"<br>")+"</font><hr></div>");
            }
        });
	},
	/**
	 * save and cancle button
	 */
	createLayout: function(){
		this.result = isc.Label.create({
		    height: 50,
			layoutLeftMargin: 10,
		    width:"100%",
		    align: "left",
		    valign: "center",
		    wrap: false,
		    contents: ""
		});
		return this.result;
	}
});