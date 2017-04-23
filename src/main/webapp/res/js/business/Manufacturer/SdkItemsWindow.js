/**
 * 
 */
ClassFactory.defineClass("sdk_items_window", isc.Window);

/**
 * plant window
 */
isc.sdk_items_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
    data:null,
	isShowDeliveryDate:false,
	width:700,
	height:310
});


/**
 * 
 */
isc.sdk_items_window.addMethods({
    initWidget: function()
    {
    	this.Super("initWidget", arguments);
		this.title=Page_I18n.title_manufacturer_sdk_list;
        this.addItem(this.createVLayout());
	},
	createVLayout:function()
	{
		var exportLayout = this._createDownloadForm();
		this.listGridLayout = this.createListLayout();
		var layout = isc.VLayout.create({
			layoutLeftMargin: 0,
			layoutRightMargin: 0,
			layoutTopMargin: 5,   
			membersMargin: 10,
		    autoDraw: false,
			members:[this.listGridLayout]
		});
		
		return layout;
	},
	/**
	 *
	 */
	_createDownloadForm:function()
	{
		var that = this;
		isc.CommonUtil.initResponseFrame();
		this.exportForm = isc.CommonUtil.createDownloadForm("sdk")
		return isc.HLayout.create({width:"*",height:"*",members:[this.exportForm]});
	},
	createListLayout:function()
	{
		var that = this;
		var dataSource = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/sdk/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"name", align:"left",title:Page_I18n.title_sdk_name},
		        {name:"version",align: "left", title:Page_I18n.title_sdk_version},
		        {name:"m_name",hidden:true,align: "left", title:Page_I18n.title_manufacturer_name},
		        {name:"desc",align: "left", title:Page_I18n.title_sdk_desc},
		        {name:"operator",align: "left", title:Page_I18n.title_common_operator}
		    ]
		});
		
		return isc.ListGrid.create({
		    width:680, 
		    height:300,
		    showRecordComponents: true,    
		    showRecordComponentsByCell: true,  
		    initialCriteria :{m_id:this.data.id},
		    createRecordComponent : function (record, colNum) {  
		        var fieldName = this.getFieldName(colNum);
		        
		        if (fieldName == "operator") {  
		        	
		            if( record.attachmentRelativePath != "" )
		            {
			            return isc.ImgButton.create({
			                showDown: false,
			                showRollOver: false,
			                layoutAlign: "center",
			                src: "/res/images/icon_download.png",
			                prompt: Page_I18n.title_common_download,
			                valign: "center",
			                height: 16,
			                width: 16,
			                grid: this,
			                click : function () 
			                {
			                    that.exportForm.getField("id").setValue(record.id);
			    				that.exportForm.submit();
			                }
			            });
		            }
		        }
		    },
		        
		    alternateRecordStyles:true,
		    showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: true
		});
	}
});