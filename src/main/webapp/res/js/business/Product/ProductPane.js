/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("product_pane", isc.VLayout);

/**
 */
isc.product_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null
});

/**
 */
isc.product_pane.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.listGrid = this._createListGrid();
		this.addMember(this._createFilter());
		this.addMember(this.listGrid);
		this.searchList();
	},
	/**
	 * 列表查询条件
	 */
	_createFilter:function()
	{
		var that = this;
		this.totalRowLabel = isc.Label.create({contents:"0",width:30});
		this.searchForm = isc.DynamicForm.create({
        	numCols: 4,
        	width:250,
			cellPadding : 5,
        	fields: [
        	         {name: "name",
        	        	startRow:"true",
        	        	title: Page_I18n.ui_condition_keyword,
        	        	type: "text",
        	        	defaultValue: ""
        	         }]
        });
		
		isc.CommonUtil.initResponseFrame();
		this.exportForm = isc.CommonUtil.createDownloadForm("product");

		return isc.HLayout.create({
			width: "100%",		
			height : 24,
			membersMargin : 10,
			defaultLayoutAlign : "center",
		    members: [
		        this.searchForm,
		        isc.IButton.create(
		        { name: "search",
		         title: Page_I18n.ui_button_search,
		         type: "button",
		         icon: isc.web_const.icon_path+"demoApp/icon_find.png",
		         iconWidth:24,
		         width:90,
		         click: function()
		         {
			    	that.searchList();
		         }
		        }),
		        isc.IButton.create(
				{ 
					name: "reset",
					title: Page_I18n.ui_button_reset,
				    type: "button",
				    icon: "/res/images/icon_reset.ico",
				    iconWidth:16,
			        width:90,
				    click: function()
				    {
				    	that.searchForm.reset();
				    }
				 }),
		        isc.Label.create({contents:"",width:"*"}),
		        isc.Label.create({contents:Page_I18n.title_common_totalrow,width:60}),
		        that.totalRowLabel,
		        isc.IButton.create({
			        title: Page_I18n.title_common_add,
			        type: "button",
			        iconWidth:16,
			        icon: isc.web_const.icon_path+"demoApp/icon_add.png",
		        	click:function(){
		        		that._createEditWindow();
		        	}
		        })
		    ]
		});
	},
	/**
	 * 创建数据列表
	 */
	_createListGrid:function()
	{
		var dataSource = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/product/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"name", showHover :true,align:"left",title:Page_I18n.title_product_name},
		        {name:"version", showHover :true,align:"left",title:Page_I18n.title_product_version},
		        {name:"corporation_name", showHover :true,align:"left",title:Page_I18n.title_corporation_name},
		        {name:"app_key",width:230,showHover :true,align: "left", title:Page_I18n.title_product_appkey},
				{name:"app_channel",align: "left",showHover :true, title:Page_I18n.title_product_appchannel},
		        {name:"desc",align: "left", showIf :function(){return false},title:Page_I18n.title_product_desc},
		        {name:"upload",align: "left", title:Page_I18n.title_product_upload},
		        {name:"operator",align: "center",width:100, title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
//		    autoFitFieldWidths :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_product_delete+data.name,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/product/edit",
		    						isc.JSON.encode({
		    							id:data.id,
		    							editorType:web_const.window_delete,
		    							attachmentRelativePath:data.attachmentRelativePath}),
									function(msg)
									{
										if( msg.response.result == web_const.result_success )
										{
											that.searchList();
										}
										//失败必须要刷新界面
									    isc.say(msg.response.desc);
									},
									"json"
									);
				    		}
		    		}
		    		)
		    },
		    showRecordComponents: true,    
		    showRecordComponentsByCell: true,  
		    createRecordComponent : function (record, colNum) {  
		        var fieldName = this.getFieldName(colNum);
		        
		        if (fieldName == "operator") {  
		        	var hlayout = isc.HLayout.create({
			    		 height: 22,
			        	 membersMargin:10,
			        	 align: "center"
			    	});
		        	
		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_product_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            
		            
		            hlayout.addMember(editImg);
		            if( record.attachmentRelativePath != "" )
		            {
			            var downlaodImg = isc.ImgButton.create({
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
		            	hlayout.addMember(downlaodImg);	
		            }
		            return hlayout;  
		        }
		        else if( fieldName == "upload" )
		        {
		        	var hlayout = isc.HLayout.create({
			    		 height: 22,
			        	 membersMargin:10,
			        	 align: "center"
			    	});
		        	var upload_status = Page_I18n.title_product_upload_no;
		            if( record.attachmentRelativePath != "" )
		            {
			        	upload_status = Page_I18n.title_product_upload_yes;
		            }
		            var label = isc.Label.create({width:90,contents:upload_status});
		            
		        	var uploadImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: "/res/images/icon_upload.png",
		                prompt: Page_I18n.title_common_upload,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createUploadWindow(record);  
		                }
		            });
		        	hlayout.addMember(label);
		        	hlayout.addMember(uploadImg);
		        	return hlayout;
		        }
		    },
		        
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var param = null;
		var window = isc.product_edit_window.create({data:data,pane:this});
		window.show();
	}
	,
	/**
	 * 下载附件
	 */
	_downloadproduct:function(data)
	{
		
	}
	,
	/**
	 * 上传窗口 
	 */
	_createUploadWindow:function(data)
	{
		var param = null;
		var window = isc.product_upload_window.create({data:data,pane:this});
		window.show();
	}
	,
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({keyword: this.searchForm.getValue("keyword")},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});
