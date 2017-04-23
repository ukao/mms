/**
 * 
 */

ClassFactory.defineClass("fee_node_edit_window", isc.Window);

isc.fee_node_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 500,
    height: 200,
    title:"",
    data:null,
    pane:null
});

isc.fee_node_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_product,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          autoFetchData :false,
				          criteriaField:"product",
				          textMatchStyle :"substring",
				          required: true,
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     },
			         {
			        	 name: "name",
			        	 width: 300,
						 length:100,
			        	 title: Page_I18n.title_fee_node_name,
			        	 type: "text",		required: true
			          },
				      {
				       	 name: "price",
				       	 width: 300,
						 length:16,
				         title: Page_I18n.title_fee_node_price,
				         type: "text",		
				         required: true
				      },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:200}
									],
			              name: "desc",		title: Page_I18n.title_product_config_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			          
			      ]
		});

		this.title=Page_I18n.title_fee_node_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_fee_node_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				product:this.data.product,
				price:this.data.price,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/fee_node/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
		       snapTo:"BR",
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_config_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 
 */
ClassFactory.defineClass("fee_node_items_window", isc.Window);

/**
 * plant window
 */
isc.fee_node_items_window.addProperties({
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
isc.fee_node_items_window.addMethods({
    initWidget: function()
    {
    	this.Super("initWidget", arguments);
		this.title=Page_I18n.title_fee_node_list;
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
			dataURL:"/business/fee_node_template/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"name", align:"left",title:Page_I18n.title_fee_node_name},
		        {name:"price",align: "left", title:Page_I18n.title_fee_node_price,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
	        			return  (value/100.0).toFixed(2);
		        	}
		        },
		        {name:"desc",align: "left", title:Page_I18n.title_fee_node_desc}
		    ]
		});
		
		return isc.ListGrid.create({
		    width:680, 
		    height:300,
		    initialCriteria :{strategy_id:this.data.strategy_id},
		    alternateRecordStyles:true,
		    showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: true
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("fee_node_pane", isc.VLayout);

/**
 */
isc.fee_node_pane.addProperties({
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
isc.fee_node_pane.addMethods({
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
        	         {
			        	  name: "product",
//			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          criteriaField:"product",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }]
        });
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
					name: "search",
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
			dataURL:"/business/fee_node/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"product", align:"left",title:Page_I18n.title_product},
		        {name:"name", align:"left",title:Page_I18n.title_fee_node_name},
		        {name:"price",align: "left", title:Page_I18n.title_fee_node_price},
		        {name:"desc",align: "left", title:Page_I18n.title_fee_node_desc},
		        {name:"operator",width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_config_delete,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/fee_node/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_fee_node_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
		        }
		    },
		    alternateRecordStyles:true,
//		    showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var window = isc.fee_node_edit_window.create({data:data,pane:this});
		window.show();
	}
	,
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({product: this.searchForm.getValue("product")},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});
/**
 * 
 */

ClassFactory.defineClass("fee_node_relative_edit_window", isc.Window);

isc.fee_node_relative_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 500,
    height: 200,
    title:"",
    data:null,
    pane:null
});

isc.fee_node_relative_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_product,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          autoFetchData :false,
				          criteriaField:"product",
				          textMatchStyle :"substring",
				          required: true,
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     },
			         {
			        	  name: "strategy_id",
			        	  width: 300,
			        	  title: Page_I18n.title_fee_node_strategy_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"id",
				          displayField :"name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          required: true,
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/fee_node_strategy/queryList")
				     },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			          
			      ]
		});

		this.title=Page_I18n.title_fee_node_relative_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_fee_node_relative_window_modify;
			editForm.getField("product").setCanEdit(false);
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				strategy_id:this.data.strategy_id,
				product:this.data.product,
				price:this.data.price,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/fee_node_relative/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
		       snapTo:"BR",
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_config_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("fee_node_relative_pane", isc.VLayout);

/**
 */
isc.fee_node_relative_pane.addProperties({
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
isc.fee_node_relative_pane.addMethods({
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
        	         {
			        	  name: "product",
//			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          criteriaField:"product",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }]
        });
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
					name: "search",
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
			dataURL:"/business/fee_node_relative/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"product", align:"left",title:Page_I18n.title_product},
		        {name:"strategy_name", align:"left",title:Page_I18n.title_fee_node_strategy_name},
		        {name:"fee_node_list",align: "left", title:Page_I18n.title_fee_node_list},
		        {name:"operator",width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_config_delete,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/fee_node_relative/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_fee_node_relative_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
		        }
				else if(fieldName == "fee_node_list") 
		        {  

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: "/res/images/icon_list.png",
		                prompt: "Edit Comments",
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createFeeNodeListWindow(record);  
		                }
		            });
		            return editImg;
		        }
		    },
		    alternateRecordStyles:true,
//		    showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var window = isc.fee_node_relative_edit_window.create({data:data,pane:this});
		window.show();
	}
	,
	_createFeeNodeListWindow:function(data)
	{
		var window = isc.fee_node_items_window.create({data:data});
		window.show();
	},
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({product: this.searchForm.getValue("product")},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});
/**
 * 
 */

ClassFactory.defineClass("fee_node_strategy_edit_window", isc.Window);

isc.fee_node_strategy_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 500,
    height: 200,
    title:"",
    data:null,
    pane:null
});

isc.fee_node_strategy_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "name",
			        	 width: 300,
						 length:50,
			        	 title: Page_I18n.title_fee_node_strategy_name,
			        	 type: "text",		required: true
			          },
				      
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:200}
									],
			              name: "desc",		title: Page_I18n.title_fee_node_strategy_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			          
			      ]
		});

		this.title=Page_I18n.title_fee_node_strategy_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_fee_node_strategy_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/fee_node_strategy/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
		       snapTo:"BR",
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_config_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("fee_node_strategy_pane", isc.VLayout);

/**
 */
isc.fee_node_strategy_pane.addProperties({
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
isc.fee_node_strategy_pane.addMethods({
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
        	width:350,
			cellPadding : 5,
        	fields: [
        	         {
			        	  name: "name",
//			        	  width: 300,
			        	  title: Page_I18n.title_fee_node_strategy_name,
			        	  type: "text"	
				     }]
        });
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
					name: "search",
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
			dataURL:"/business/fee_node_strategy/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"name", align:"left",title:Page_I18n.title_fee_node_strategy_name},
		        {name:"desc",align: "left", title:Page_I18n.title_fee_node_strategy_desc},
		        {name:"operator",width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.title_fee_node_strategy_delete,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/fee_node_strategy/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_fee_node_strategy_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
		        }
		    },
		    alternateRecordStyles:true,
//		    showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var window = isc.fee_node_strategy_edit_window.create({data:data,pane:this});
		window.show();
	}
	,
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({name: this.searchForm.getValue("name")},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});
/**
 * 
 */

ClassFactory.defineClass("fee_node_templat_edit_window", isc.Window);

isc.fee_node_templat_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 500,
    height: 200,
    title:"",
    data:null,
    pane:null
});

isc.fee_node_templat_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	  name: "strategy_id",
//			        	  width: 300,
			        	  title: Page_I18n.title_fee_node_strategy_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"id",
				          displayField :"name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          required: true,
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/fee_node_strategy/queryList")
				     },
			         {
			        	 name: "name",
			        	 width: 300,
						 length:100,
			        	 title: Page_I18n.title_fee_node_name,
			        	 type: "text",		required: true
			          },
				      {
				       	 name: "price",
				       	 width: 300,
						 length:16,
				         title: Page_I18n.title_fee_node_price,
				         type: "text",		
				         required: true
				      },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:200}
									],
			              name: "desc",		title: Page_I18n.title_product_config_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			          
			      ]
		});

		this.title=Page_I18n.title_fee_node_template_window_add;
		//判断是否修改
		if( this.data )
		{
			var price = (this.data.price/100.0).toFixed(2);
			this.title = Page_I18n.title_fee_node_template_window_modify;
			editForm.getField("strategy_id").setCanEdit(false);
			editForm.editRecord({
				id:this.data.id,
				strategy_id:this.data.strategy_id,
				name:this.data.name,
				price:price,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/fee_node_template/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
		       snapTo:"BR",
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   postParam.price = postParam.price*100;
					   isc.ask(
					    	Page_I18n.ask_config_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("fee_node_template_pane", isc.VLayout);

/**
 */
isc.fee_node_template_pane.addProperties({
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
isc.fee_node_template_pane.addMethods({
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
        	width:350,
			cellPadding : 5,
        	fields: [
        	         {
			        	  name: "strategy_id",
//			        	  width: 300,
			        	  title: Page_I18n.title_fee_node_strategy_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"id",
				          displayField :"name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/fee_node_strategy/queryList")
				     }]
        });
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
					name: "search",
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
			dataURL:"/business/fee_node_template/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"strategy_name", align:"left",title:Page_I18n.title_fee_node_strategy_name},
		        {name:"name", align:"left",title:Page_I18n.title_fee_node_name},
		        {name:"price",align: "left", title:Page_I18n.title_fee_node_price,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
	        			return  (value/100.0).toFixed(2);
		        	}
		        },
		        {name:"desc",align: "left", title:Page_I18n.title_fee_node_desc},
		        {name:"operator",width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_config_delete,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/fee_node_template/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_fee_node_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
		        }
		    },
		    alternateRecordStyles:true,
//		    showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var window = isc.fee_node_templat_edit_window.create({data:data,pane:this});
		window.show();
	}
	,
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({strategy_id: this.searchForm.getValue("strategy_id")},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});
/**
 * 
 */

ClassFactory.defineClass("product_config_edit_window", isc.Window);

isc.product_config_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 500,
    height: 200,
    title:"",
    data:null,
    pane:null
});

isc.product_config_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_product,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          autoFetchData :false,
				          criteriaField:"product",
				          textMatchStyle :"substring",
				          required: true,
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     },
			         {
			        	 name: "name",
			        	 width: 300,
						 length:200,
			        	 title: Page_I18n.title_product_config_name,
			        	 type: "text",		required: true
			          },
				      {
				       	 name: "value",
				       	 width: 300,
						 length:200,
				         title: Page_I18n.title_product_config_value,
				         type: "text",		
				         required: true
				      },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:100}
									],
			              name: "desc",		title: Page_I18n.title_product_config_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			          
			      ]
		});

		this.title=Page_I18n.title_product_config_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_product_config_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				product:this.data.product,
				desc:this.data.desc,
				value:this.data.value,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/product_config/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_config_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("product_config_pane", isc.VLayout);

/**
 */
isc.product_config_pane.addProperties({
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
isc.product_config_pane.addMethods({
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
        	         {
			        	  name: "product",
//			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          criteriaField:"product",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }]
        });
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
			dataURL:"/business/product_config/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"product", align:"left",title:Page_I18n.title_product},
		        {name:"name", align:"left",title:Page_I18n.title_product_config_name},
		        {name:"value",align: "left", title:Page_I18n.title_product_config_value},
		        {name:"desc",align: "left", title:Page_I18n.title_product_config_desc},
		        {name:"operator",width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_config_delete,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/product_config/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_product_config_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
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
		var window = isc.product_config_edit_window.create({data:data,pane:this});
		window.show();
	}
	,
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({product: this.searchForm.getValue("product")},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});
/**
 * 
 */

ClassFactory.defineClass("sdk_config_edit_window", isc.Window);

isc.sdk_config_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 500,
    height: 200,
    title:"",
    data:null,
    pane:null
});

isc.sdk_config_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			          {
			        	  width:300,
			              name: "m_id",		title: Page_I18n.title_manufacturer_name,
			              type: "text",
			              editorType:"comboBox",
			              pickListProperties :{showAllRecords:false},
			              pickListHeight:150,
			              valueField:"id",
			              displayField :"name",
			              autoFetchData :false,
			              textMatchStyle :"substring",
			              required: false,
			              addUnknownValues :false,
			              optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/manufacturer/queryList")
			          },
			         {
				    	  name: "sdk_id",
			        	  title: Page_I18n.title_sync_url,
			        	  width:300,
						  length:64,
					      type: "text",
					      required: false,
					      visible:false
				      },
				      {name:"order_id", title:Page_I18n.title_order_id,
				    	  	 width:300,
							 length:25,
					         type: "text",
					         required: false},
				      {name:"price", title:Page_I18n.title_product_config_price,
					         width: 300,
							 length:25,
						     type: "text",
						     required: false
					},
				     {name:"price_unit", title:Page_I18n.title_price_unit,
						      width: 300,
							 startRow:false,
						     type: "radioGroup",
						     vertical :false,
						     valueMap:Page_I18n.title_price_unit_map,
						    required: false
					 },	     
				      {name:"status", title:Page_I18n.title_fee_status,
				        	 width: 300,
							 length:25,
				        	 type: "text",
				        	 required: false},
				        {name:"operator",align: "left", title:Page_I18n.title_operator,
					        width: 300,
							length:25,
					        type: "text",
					        required: false},
				        {name:"signer", title:Page_I18n.title_signer,
						    width: 300,
							length:25,
						    type: "text",
						    required: false},
				        {name:"app_key", title:Page_I18n.title_app_key,
							width: 300,
							length:25,
							type: "text"
//							required: false
						},
						{name:"product", title:Page_I18n.title_product,
					    	  	 width:300,
								 length:25,
						         type: "text"
//						         required: false
						},
				        {name:"sdk_param", title:Page_I18n.title_sdk_param,
							width: 300,
							length:25,
//							required: false,
							type: "text"
						},
						{name:"response_code", title:Page_I18n.title_response_code,
								width: 300,
								length:10,
								type: "text"
//								required: false
						},
						{name:"http_method", title:Page_I18n.title_http_method,
							width: 300,
						     type: "radioGroup",
						     vertical :false,
						     valueMap:Page_I18n.title_http_method_map,
						    required: false},
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			          
			      ]
		});

		this.title=Page_I18n.title_sdk_config_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_sdk_config_window_modify;
			editForm.editRecord({
				id:this.data.id,
				sdk_id:this.data.sdk_id,
				product:this.data.product,
				order_id:this.data.order_id,
				price:this.data.price,
				status:this.data.status,
				operator:this.data.operator,
				signer:this.data.signer,
				app_key:this.data.app_key,
				sdk_param:this.data.sdk_param,
				response_code:this.data.response_code,
				m_id:this.data.m_id,
				http_method:this.data.http_method,
				price_unit:this.data.price_unit,
				editorType:web_const.window_modify
				});
			//editForm.getField("sdk_id").setVisible(true);
			//editForm.getField("sdk_id").setRequied(true);
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/sdk_config/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_config_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("sdk_config_pane", isc.VLayout);

/**
 */
isc.sdk_config_pane.addProperties({
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
isc.sdk_config_pane.addMethods({
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
        	width:350,
			cellPadding : 5,
        	fields: [
        	         {
//			        	  width:300,
			              name: "m_id",		title: Page_I18n.title_manufacturer_name,
			              type: "text",
			              editorType:"comboBox",
			              pickListHeight:150,
			              valueField:"id",
			              displayField :"name",
			              autoFetchData :false,
			              textMatchStyle :"substring",
			              required: true,
			              addUnknownValues :false,
			              optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/manufacturer/queryList")
			          },
			         ]
        });
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
			dataURL:"/business/sdk_config/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"m_name", showHover :true,align:"left",title:Page_I18n.title_manufacturer_name},
		        {name:"sdk_id",showHover :true, align:"left",title:Page_I18n.title_sync_url},
		        {name:"order_id", showHover :true,align:"left",title:Page_I18n.title_order_id},
		        {name:"price", align:"left",showHover :true,title:Page_I18n.title_product_config_price,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
	        			return  value+"("+Page_I18n.title_price_unit_map[record.price_unit]+")";
					}
		        },
		        {name:"status",showHover :true,align: "left", title:Page_I18n.title_fee_status},
		        {name:"operator",showHover :true,align: "left", title:Page_I18n.title_operator},
		        {name:"signer", showHover :true,align:"left",title:Page_I18n.title_signer},
		        {name:"app_key",showHover :true, align:"left",title:Page_I18n.title_app_key},
		        {name:"product", showHover :true,align:"left",title:Page_I18n.title_product},
		        {name:"sdk_param",showHover :true, align:"left",title:Page_I18n.title_sdk_param},
		        {name:"response_code", showHover :true,align:"left",title:Page_I18n.title_response_code},
		        {name:"http_method",showHover :true, align:"left",title:Page_I18n.title_http_method},
		        {name:"operator_real",align: "center", title:Page_I18n.title_common_operator}
		       ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_config_delete,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/sdk_config/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		        if (fieldName == "operator_real") {  

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_sdk_config_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
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
		var window = isc.sdk_config_edit_window.create({data:data,pane:this});
		window.show();
	}
	,
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({sdk_id: this.searchForm.getValue("sdk_id")},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});
ClassFactory.defineClass("statistic_pane", isc.VLayout);


/*常量**/
isc.statistic_pane.addProperties({
	width:"100%",
	height:"100%",
	margin:0
});

isc.statistic_pane.addMethods({
	/**
	 * 
	 * @returns
	 */
	initWidget: function(){
		this.Super("initWidget", arguments);
		
		this.addMember(this._createTaskFormLayout(0,"运行所有"));
		this.addMember(this._createTaskFormLayout(1,"运行SDK计费统计"));
		this.addMember(this._createTaskFormLayout(2,"运行本地计费统计"));
		this.addMember(this._createTaskFormLayout(3,"运行渠道数据统计"));
		this.addMember(this._createTaskFormLayout(4,"运行激活量统计"));
		this.addMember(this._createTaskFormLayout(5,"运行SDK转化率统计"));
	},
	_createTaskFormLayout:function(method,buttonTitle)
	{
		var taskForm = isc.DynamicForm.create({
			width:"100%",
			numCols: 6,
			height:50,
			fields: [
			          {
			        	 name: "run",
			        	 width: 150,
						 length:50,
						 startRow:false,
						 endRow :false,
			        	 title: buttonTitle,
			        	 type: "button",
			        	 click:function(form)
			        	 {
			        		 if( form.validate() )
							   {
								   var postParam = form.getValues();
								   isc.ask(
								    	"确定运行任务吗?",
								    	function(value)
								    	{
								    		if(value)
								    		{
								    			jQuery.post(
													"/business/statistic_task",
													isc.JSON.encode(postParam),
													function(msg)
													{
														//失败成功都需要信息
													    isc.say(msg.response.desc);
													},
													"json"
													);
								    			}
								    	});
							   }
			        	 }
			          },
			          {
			        	  name:"param",
			        	  type:"date",
			        	  title:"运行日期",
			        	  required:true,
			        	  useTextField:true
			          },
			          {
			        	  name:"method",
			        	  type:"hidden",
			        	  value:method
			          }
			      ]
		});

		return taskForm;
	}
})/**
 * 
 */

ClassFactory.defineClass("manufacturer_edit_window", isc.Window);

isc.manufacturer_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 500,
    height: 200,
    title:"",
    data:null,
    pane:null
});

isc.manufacturer_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "name",
			        	 width: 300,
						 length:25,
			        	 title: Page_I18n.title_manufacturer_name,
			        	 type: "text",		required: true
			          },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:100}
									],
			              name: "desc",		title: Page_I18n.title_manufacturer_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			          
			      ]
		});

		this.title=Page_I18n.title_manufacturer_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_manufacturer_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/manufacturer/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_manufacturer_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("manufacturer_pane", isc.VLayout);

/**
 */
isc.manufacturer_pane.addProperties({
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
isc.manufacturer_pane.addMethods({
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
        	         {name: "keyword",
        	        	startRow:"true",
        	        	title: Page_I18n.ui_condition_keyword,
        	        	type: "text",
        	        	defaultValue: ""
        	         }]
        });
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
			dataURL:"/business/manufacturer/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"name", align:"left",title:Page_I18n.title_manufacturer_name},
		        {name:"desc",align: "left", title:Page_I18n.title_manufacturer_desc},
		        {name:"sdkList",width:100,align: "left", title:Page_I18n.title_manufacturer_sdk_list},
		        {name:"operator",width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_manufacturer_delete+data.name,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/manufacturer/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_manufacturer_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
		        }
		        else if(fieldName == "sdkList") 
		        {  

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: "/res/images/icon_list.png",
		                prompt: "Edit Comments",
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createSdkListWindow(record);  
		                }
		            });
		            return editImg;
		        }
		    },
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},
	_createSdkListWindow:function(data)
	{
		var window = isc.sdk_items_window.create({data:data});
		window.show();
	},
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var window = isc.manufacturer_edit_window.create({data:data,pane:this});
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
/**
 * 
 */

ClassFactory.defineClass("sdk_edit_window", isc.Window);

isc.sdk_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 450,
    height: 250,
    title:"",
    data:null,
    pane:null
});

isc.sdk_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "name",
			        	 width: 300,
						 length:25,
			        	 title: Page_I18n.title_sdk_name,
			        	 type: "text",		required: true
			          },
			          {
			        	  width:300,
			        	  length:25,
			              name: "version",		title: Page_I18n.title_sdk_version,
			              type: "text",required: true
			          },
			          {
				        	 name: "rate",
				        	 width: 300,
							 length:50,
				        	 title: Page_I18n.title_sdk_rate,
				        	 editorType: "spinner", 
							 defaultValue: 8.50,
							 min: 0, 
							 max: 100, 
							 step: 0.01,
							 required: true
				      },
			          {
			        	  width:300,
			              name: "m_id",		title: Page_I18n.title_manufacturer_name,
			              type: "text",
			              editorType:"comboBox",
			              pickListHeight:150,
			              valueField:"id",
			              displayField :"name",
			              autoFetchData :false,
			              textMatchStyle :"substring",
			              required: true,
			              addUnknownValues :false,
			              optionDataSource:this._createComboboxDataSource()
			          },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:100}
									],
			              name: "desc",		title: Page_I18n.title_sdk_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			      ]
		});

		this.title=Page_I18n.title_sdk_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_sdk_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				desc:this.data.desc,
				m_id:this.data.m_id,
				version:this.data.version,
				rate:this.data.rate,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createComboboxDataSource:function()
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/manufacturer/queryList",
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"name"}
		    ]
		});
	}
	,
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
//		this.uploadForm = this._createUploadForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
//					this.uploadForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/sdk/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_sdk_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


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
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("sdk_pane", isc.VLayout);

/**
 */
isc.sdk_pane.addProperties({
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
isc.sdk_pane.addMethods({
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
        	         {name: "keyword",
        	        	startRow:"true",
        	        	title: Page_I18n.ui_condition_keyword,
        	        	type: "text",
        	        	defaultValue: ""
        	         }]
        });
		
		isc.CommonUtil.initResponseFrame();
		this.exportForm = isc.CommonUtil.createDownloadForm("sdk");

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
			dataURL:"/business/sdk/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"name", align:"left",title:Page_I18n.title_sdk_name},
		        {name:"version",align: "left", title:Page_I18n.title_sdk_version},
		        {name:"rate",align: "left", title:Page_I18n.title_sdk_rate},
		        {name:"m_name",align: "left", title:Page_I18n.title_manufacturer_name},
		        {name:"desc",align: "left", title:Page_I18n.title_sdk_desc},
		        {name:"upload",align: "left", title:Page_I18n.title_sdk_upload},
		        {name:"operator",align: "left", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_sdk_delete+data.name,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/sdk/edit",
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
		                prompt: Page_I18n.title_sdk_window_modify,
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
		        	var upload_status = Page_I18n.title_sdk_upload_no;
		            if( record.attachmentRelativePath != "" )
		            {
			        	upload_status = Page_I18n.title_sdk_upload_yes;
		            }
		            var label = isc.Label.create({width:50,contents:upload_status});
		            
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
		var window = isc.sdk_edit_window.create({data:data,pane:this});
		window.show();
	}
	,
	/**
	 * 下载附件
	 */
	_downloadSdk:function(data)
	{
		
	}
	,
	/**
	 * 上传窗口 
	 */
	_createUploadWindow:function(data)
	{
		var param = null;
		var window = isc.sdk_upload_window.create({data:data,pane:this});
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
});/**
 * 
 */

ClassFactory.defineClass("channel_edit_window", isc.Window);

isc.channel_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 450,
    height: 150,
    title:"",
    data:null,
    pane:null
});

isc.channel_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "name",
			        	 width: 300,
						 length:25,
			        	 title: Page_I18n.title_channel_name,
			        	 type: "text",		required: true
			          },
			          {
			        	  name: "userName",
			        	  width: 300,
			        	  title: Page_I18n.title_channel_username,
			        	  type: "text",		
			        	  editorType:"comboBox",
//			        	  criteriaField:"keyword",
				          pickListHeight:150,
				          optionCriteria :{roleIds:isc.web_const.ChannelRoleId},
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          addUnknownValues :false,
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/system/getUserList")
				     },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
								{type:"lengthRange", min:0, max:100}
							],
			              name: "desc",		title: Page_I18n.title_channel_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			          
			      ]
		});

		this.title=Page_I18n.title_channel_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_channel_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				userName:this.data.userName,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/channel/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_channel_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("channel_pane", isc.VLayout);

/**
 */
isc.channel_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null
});

/**
 */
isc.channel_pane.addMethods({
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
        	         {name: "keyword",
        	        	startRow:"true",
        	        	title: Page_I18n.ui_condition_keyword,
        	        	type: "text",
        	        	defaultValue: ""
        	         }]
        });
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
			dataURL:"/business/channel/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"name", align:"left",title:Page_I18n.title_channel_name},
		        {name:"desc",align: "left", title:Page_I18n.title_channel_desc},
		        {name:"userName",align: "left", title:Page_I18n.title_channel_username},
		        {name:"operator",width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_channel_delete+data.name,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/channel/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_channel_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
		        }
		        else if(fieldName == "sdkList") 
		        {  

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: "/res/images/icon_list.png",
		                prompt: "Edit Comments",
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createSdkListWindow(record);  
		                }
		            });
		            return editImg;
		        }
		    },
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},
	_createSdkListWindow:function(data)
	{
		var window = isc.sdk_items_window.create({data:data});
		window.show();
	},
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var window = isc.channel_edit_window.create({data:data,pane:this});
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
/**
 * 
 */

ClassFactory.defineClass("corporation_edit_window", isc.Window);

isc.corporation_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 450,
    height: 150,
    title:"",
    data:null,
    pane:null
});

isc.corporation_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "name",
			        	 width: 300,
						 length:25,
			        	 title: Page_I18n.title_corporation_name,
			        	 type: "text",		required: true
			          },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
								{type:"lengthRange", min:0, max:100}
							],
			              name: "desc",		title: Page_I18n.title_corporation_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			          
			      ]
		});

		this.title=Page_I18n.title_corporation_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_corporation_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/corporation/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_corporation_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("corporation_pane", isc.VLayout);

/**
 */
isc.corporation_pane.addProperties({
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
isc.corporation_pane.addMethods({
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
        	         {name: "keyword",
        	        	startRow:"true",
        	        	title: Page_I18n.ui_condition_keyword,
        	        	type: "text",
        	        	defaultValue: ""
        	         }]
        });
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
			dataURL:"/business/corporation/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"name", align:"left",title:Page_I18n.title_corporation_name},
		        {name:"desc",align: "left", title:Page_I18n.title_corporation_desc},
		        {name:"operator",width:100,align: "left", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_corporation_delete+data.name,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/corporation/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_corporation_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
		        }
		        else if(fieldName == "sdkList") 
		        {  

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: "/res/images/icon_list.png",
		                prompt: "Edit Comments",
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createSdkListWindow(record);  
		                }
		            });
		            return editImg;
		        }
		    },
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},
	_createSdkListWindow:function(data)
	{
		var window = isc.sdk_items_window.create({data:data});
		window.show();
	},
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var window = isc.corporation_edit_window.create({data:data,pane:this});
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
/**
 * 
 */

ClassFactory.defineClass("product_edit_window", isc.Window);

isc.product_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 450,
    height: 250,
    title:"",
    data:null,
    pane:null
});

isc.product_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "name",
			        	 width: 300,
						 length:25,
			        	 title: Page_I18n.title_product_name,
			        	 type: "text",		required: true
			          },
			          {
			        	 name: "version",
				       	 width: 300,
						 length:25,
				         title: Page_I18n.title_product_version,
				         type: "text",		required: true
				      },
			          {
			        	  name: "corporation_id",
			        	  width: 300,
			        	  title: Page_I18n.title_corporation_name,
			        	  type: "text",		
			        	  required: true, 
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"id",
				          displayField :"name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          addUnknownValues :false,
				          optionDataSource:this._createComboboxDataSource()
				     },
			         {
			        	 name: "app_key",
			        	 width: 300,
						 length:50,
			        	 title: Page_I18n.title_product_appkey,
			        	 type: "text",		required: true
			          },
			         {
			        	 name: "app_channel",
			        	 width: 300,
						 length:50,
			        	 title: Page_I18n.title_product_appchannel,
			        	 type: "text",		required: true
			          },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:100}
									],
			              name: "desc",		title: Page_I18n.title_product_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			      ]
		});

		this.title=Page_I18n.title_product_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_product_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				version:this.data.version,
				app_key:this.data.app_key,
				app_channel:this.data.app_channel,
				corporation_id:this.data.corporation_id,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createComboboxDataSource:function()
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/corporation/queryList",
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"name"}
		    ]
		});
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
//		this.uploadForm = this._createUploadForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
//					this.uploadForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/product/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_product_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


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
/**
 * 
 */
ClassFactory.defineClass("product_upload_window", isc.Window);

/**
 * plant window
 */
isc.product_upload_window.addProperties({
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
isc.product_upload_window.addMethods({
    initWidget: function()
    {
    	this.Super("initWidget", arguments);
		this.title=Page_I18n.title_product_window_upload;
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
			action: "/business/product/upload",
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
});/**
 * 
 */

ClassFactory.defineClass("relative_edit_window", isc.Window);

isc.relative_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 450,
    height: 250,
    title:"",
    data:null,
    pane:null
});

isc.relative_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		var editForm = isc.DynamicForm.create({
			width:"100%",
			wrapItemTitles :false,
			fields: [
			         {
			        	 name: "name",
			        	 width: 300,
						 length:50,
			        	 title: Page_I18n.title_relative_name,
			        	 type: "text",		required: true
			          },
			          {
			        	  width:300,
			              name: "product_id",		title: Page_I18n.title_product_name,
			              type: "text",
			              editorType:"comboBox",
			              filterFields :["name"],
			              pickListHeight:150,
			              valueField:"id",
			              displayField :"name_version",
			              criteriaField :"keyword",
			              addUnknownValues :false,
			              autoFetchData :false,
			              required: true,		
			              textMatchStyle :"substring",
			              optionDataSource:this._createComboboxDataSource("product")
			          },
			          {
			        	  width:300,
			              name: "channel_id",		title: Page_I18n.title_channel_name,
			              type: "text",
			              editorType:"comboBox",
			              pickListHeight:150,
			              valueField:"id",
			              filterFields :["name"],
			              displayField :"name",
			              required: true,
			              criteriaField :"keyword",
			              addUnknownValues :false,
			              autoFetchData :false,
			              textMatchStyle :"substring",
			              optionDataSource:this._createComboboxDataSource("channel")
			          },
			          {
			        	  width:300,
			              name: "sdk_id",		title: Page_I18n.title_sdk_name,
			              editorType:"comboBox",
			              pickListHeight:150,
			              valueField:"id",
			              filterFields :["name"],
			              displayField :"name_version",
			              autoFetchData :false,
			              required: true,
			              textMatchStyle :"substring",
			              addUnknownValues :false,
						  pickListFields: [
							  { name:"name",title:Page_I18n.title_sdk_name},
							  { name:"version",title:Page_I18n.title_sdk_version }
						],
			              optionDataSource:this._createComboboxDataSource("sdk")
			          },
			          {
			        	  name:"extraction_category",
			        	  type:"radioGroup",
 			        	 width: 300,
			        	  title:Page_I18n.title_relative_extraction_category,
			        	  valueMap:Page_I18n.title_ralative_extraction_category_map,
			        	  defaultValue:"0",
						  required: true,
						  vertical :false,
			        	  changed :function(form,item,value)
			        	  {
			        		  
			        	  } 
			          },
			          {
			        	 name: "extraction_num",
			        	 width: 300,
						 length:20,
						 warpTitle:false,
			        	 title: Page_I18n.title_relative_extraction_num,
//			        	 editorType: "spinner", 
//						 defaultValue: 8.50,
//						 min: 0, 
//						 max: 100, 
//						 step: 0.01,
						 required: true
			          },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:100}
									],
			              name: "desc",		title: Page_I18n.title_sdk_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			      ]
		});

		this.title=Page_I18n.title_relative_window_add;
		//判断是否修改
		if( this.data )
		{
			var extraction_num = this.data.extraction_num;
			if( this.data.extraction_category == "1" )
			{
				extraction_num = (extraction_num/100.0).toFixed(2);
			}
			this.title = Page_I18n.title_relative_window_modify;
			editForm.getField("name").setCanEdit(false);
			editForm.editRecord({
				id:this.data.id,
				rate:this.data.rate,
				name:this.data.name,
				desc:this.data.desc,
				product_id:this.data.product_id,
				channel_id:this.data.channel_id,
				sdk_id:this.data.sdk_id,
				extraction_num:extraction_num,
				extraction_category:this.data.extraction_category,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createComboboxDataSource:function(module)
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/"+module+"/queryList",
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"keyword"},
		        {name:"name"}
		    ]
		});
	}
	,
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
//		this.uploadForm = this._createUploadForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
//					this.uploadForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/productRelative/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   if( postParam.extraction_category=='1')
					   {
						  postParam.extraction_num = postParam.extraction_num*100;
					   }
					   isc.ask(
					    	Page_I18n.ask_relative_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("relative_pane", isc.VLayout);

/**
 */
isc.relative_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    canOperate:true
});

/**
 */
isc.relative_pane.addMethods({
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
        	width:550,
			cellPadding : 5,
        	fields: [
        	         {
			        	  name: "product_id",
			        	  title: Page_I18n.title_product_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"id",
				          displayField :"name_version",
				          filterFields:["name"],
				          autoFetchData :false,
//			              addUnknownValues :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/product/queryList")
				     },
				     {
			        	  name: "channel_id",
//			        	  width: 300,
			        	  title: Page_I18n.title_channel_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"id",
				          displayField :"name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/channel/queryList")
				     }]
        });
		
		isc.CommonUtil.initResponseFrame();
		this.exportForm = isc.CommonUtil.createDownloadForm("relative");

        var addButton = isc.IButton.create({
        	visible: this.canOperate,
	        title: Page_I18n.title_common_add,
	        type: "button",
	        iconWidth:16,
	        icon: isc.web_const.icon_path+"demoApp/icon_add.png",
        	click:function(){
        		that._createEditWindow();
        	}
        });
        var searchButton = isc.IButton.create(
		       { name: "search",
		         title: Page_I18n.ui_button_search,
		         type: "button",
		         icon: isc.web_const.icon_path+"demoApp/icon_find.png",
		         iconWidth:24,
		         click: function()
		         {
			    	that.searchList();
		         }
		        });
		var resetButton = isc.IButton.create(
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
				 });
        //right controll
        if( !this.canOperate )
        {
        	addButton.hide();
        	this.searchForm.hide();
        	searchButton.hide();
			resetButton.hide();
        }
        
		return isc.HLayout.create({
			width: "100%",		
			height : 24,
			membersMargin : 10,
			defaultLayoutAlign : "center",
		    members: [
		        this.searchForm,
		        searchButton,
				resetButton,
		        isc.Label.create({contents:"",width:"*"}),
		        isc.Label.create({contents:Page_I18n.title_common_totalrow,width:60}),
		        that.totalRowLabel,
		        addButton
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
			dataURL:"/business/productRelative/queryList",
		    fields:[
		        {name:"id",hidden:true},
		        {name:"name", showHover :true,align:"left",title:Page_I18n.title_relative_name},
				{name:"product_name",showHover :true, align:"left",title:Page_I18n.title_product_name},
				{name:"channel_name",showHover :true, align:"left",title:Page_I18n.title_channel_name},
		        {name:"sdk_name",showHover :true,align: "left", title:Page_I18n.title_sdk_name},
		        {name:"extraction_category",align: "left", title:Page_I18n.title_relative_extraction_category,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
	        			return  Page_I18n.title_ralative_extraction_category_map[value];
					}
		        },
		        {name:"extraction_num",align: "left", title:Page_I18n.title_relative_extraction_num,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
		        		if(record.extraction_category == '0')
		        		{
		        			return value+"%"
		        		}
	        			return  (value/100.0).toFixed(2);
					}
		        },
				{name:"desc",showIf :function(){return false},align: "left", title:Page_I18n.title_relative_desc},
//		        {name:"upload",align: "left", title:Page_I18n.title_sdk_upload},
		        {name:"operator",hidden: !this.canOperate , align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    canRemoveRecords :this.canOperate,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_sdk_delete+data.name,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/productRelative/edit",
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
		                prompt: Page_I18n.title_relative_window_modify,
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
		        else if( fieldName == "upload"  && that.canOperate)
		        {
		        	var hlayout = isc.HLayout.create({
			    		 height: 22,
			        	 membersMargin:10,
			        	 align: "center"
			    	});
		        	var upload_status = Page_I18n.title_relative_upload_no;
		            if( record.attachmentRelativePath != "" )
		            {
			        	upload_status = Page_I18n.title_relative_upload_yes;
		            }
		            var label = isc.Label.create({width:50,contents:upload_status});
		            
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
		var window = isc.relative_edit_window.create({data:data,pane:this});
		window.show();
	}
	,
	/**
	 * 上传窗口 
	 */
	_createUploadWindow:function(data)
	{
		var param = null;
		var window = isc.relative_upload_window.create({data:data,pane:this});
		window.show();
	}
	,
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData(
    			{
    		channel_id: this.searchForm.getValue("channel_id"),
    		product_id: this.searchForm.getValue("product_id")
    		},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});
/**
 * 
 */

ClassFactory.defineClass("channel_detail_mock_active_edit_window", isc.Window);

isc.channel_detail_mock_active_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 350,
    height: 150,
    title:"",
    data:null,
    pane:null
});

isc.channel_detail_mock_active_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{

		var account_title = Page_I18n.title_active_count;
		if( this.pane.category == "1" )
		{
			account_title = Page_I18n.title_active_fee_add;
		}
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "account_num",
			        	 width: 200,
						 length:25,
			        	 title: account_title,
			        	 type: "text",
			        	 required: true
			          },
			          {
			        	  name: "product",
			        	  width: 200,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          optionCriteria:{extraction_category:'1'},
				          criteriaField:"product",
				          required: true,
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     },
				     {
				    	  name:"sta_date",
			        	  width: 150,
				          showTitle :true,
			        	  title: Page_I18n.title_sta_date,
			        	  type: "date",
			        	  useTextField:true,
				        	 required: true
					  },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"category",
			        	  type:"hidden",
			        	  value:this.pane.category
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			      ]
		});

		this.title=Page_I18n.title_channel_detail_mock_window_add;
		//判断是否修改
		if( this.data )
		{
			var account_num = this.data.account_num;

			//分成的话数据库里面存分所以要除以100
			if( this.pane.category == "1" )
			{
				account_num = (account_num/100.0).toFixed(2);
			}
			this.title = Page_I18n.title_channel_detail_mock_window_modify;
			editForm.editRecord({
				id:this.data.id,
				account_num:account_num,
				product:this.data.product,
				sta_date:this.data.sta_date,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/channel_detail_active_mock/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   //分成的话数据库里面存分所以要乘以100
					   if( that.pane.category == "1" )
						{
						   postParam.account_num = postParam.account_num*100;
						}
					   
					   isc.ask(
					    	Page_I18n.ask_channel_detail_mock_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("channel_detail_mock_active_pane", isc.VLayout);

/**
 */
isc.channel_detail_mock_active_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null,
    category:"0",
    canOperate:false
});

/**
 */
isc.channel_detail_mock_active_pane.addMethods({
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
        	width:700,
//			cellPadding : 5,
        	fields: [
			         {
						type:"date_condition_pane",
						name:"sta_date",
						title:Page_I18n.title_sta_date,
						showTitle:true,
						warpTitle:false
			         },
			          {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }
			         ]
        });
		
		var addButton = isc.IButton.create({
	        title: Page_I18n.title_common_add,
	        type: "button",
	        iconWidth:16,
	        icon: isc.web_const.icon_path+"demoApp/icon_add.png",
        	click:function()
        	{
        		that._createEditWindow();
        	}
        });
		
		if( !this.canOperate )
		{
			addButton.hide();
		}
		
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
		        addButton
		    ]
		});
	},
	_createEditWindow:function(data)
	{
		var window = isc.channel_detail_mock_active_edit_window.create({data:data,pane:this});
		window.show();
	},
	/**
	 * 创建数据列表
	 */
	_createListGrid:function()
	{
		var that = this;
		var account_title = Page_I18n.title_active_count;
		var unit_title = Page_I18n.title_ralative_price;
		if( this.category == "1" )
		{
			account_title = Page_I18n.title_active_fee;
			unit_title = Page_I18n.title_relative_rate;
		}
		var dataSource = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/channel_detail_active_mock/queryList",
		    fields:[
				{name:"sta_date", showHover :true,align:"left",title:Page_I18n.title_sta_date
					,showGridSummary:true,summaryValue :Page_I18n.title_common_total_sum
				},
				{
					name:"account_num", showHover :true,align:"left",title:account_title
					,summaryFunction:"sum",showGridSummary:true, showGroupSummary:true,
					formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
		        		if(that.category == '1')
		        		{
		        			return  (value/100.0).toFixed(2);
		        		}
	        			return value;
					}
				},
				{name:"extraction_num",showHover :true, align:"left",title:unit_title,
					formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
		        		if(that.category == '1')
		        		{
		        			return value+"%"
		        		}
	        			return  (value/100.0).toFixed(2);
					}
				},
		        {name:"channel_name", showHover :true,align:"left",title:Page_I18n.title_channel_name},
		        {name:"product", showHover :true,align:"left",title:Page_I18n.title_product},
		        {name:"app_name",showHover :true, align:"left",title:Page_I18n.title_app_name},
		        {name:"app_version", showHover :true,align:"left",title:Page_I18n.title_app_version},
		        {name:"operator",hidden:!this.canOperate,width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    groupStartOpen:"first",
			groupByField:"channel_name",
			showGroupSummaryInHeader:true,
			showGridSummary:true,
			showGroupSummary:true,
		    canRemoveRecords :this.canOperate,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_channel_detail_mock_delete,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/channel_detail_active_mock/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_channel_detail_mock_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
		        }
		    },
		    alternateRecordStyles:true,
		    showAllRecords:false,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData(
    			{
    	    		sta_date:this.searchForm.getValue("sta_date"),
    	    		channel_id:this.searchForm.getValue("channel_id"),
    	    		product:this.searchForm.getValue("product"),
    	    		category:this.category
    	    		},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 
 */

ClassFactory.defineClass("channel_detail_mock_proportion_edit_window", isc.Window);

isc.channel_detail_mock_proportion_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 350,
    height: 150,
    title:"",
    data:null,
    pane:null
});

isc.channel_detail_mock_proportion_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{

		var account_title = Page_I18n.title_active_count;
		if( this.pane.category == "1" )
		{
			account_title = Page_I18n.title_active_fee_add;
		}
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "account_num",
			        	 width: 200,
						 length:25,
			        	 title: account_title,
			        	 type: "text",
			        	 required: true
			          },
				      {
				        	 name: "active_count",
				        	 width: 200,
							 length:25,
				        	 title: Page_I18n.title_active_count,
				        	 type: "text",
				        	 required: true
				      },
			          {
			        	  name: "product",
			        	  width: 200,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          optionCriteria:{extraction_category:"0"},
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          criteriaField:"product",
				          required: true,
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     },
				     {
				    	  name:"sta_date",
			        	  width: 150,
				          showTitle :true,
			        	  title: Page_I18n.title_sta_date,
			        	  type: "date",
			        	  useTextField:true,
				        	 required: true
					  },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"category",
			        	  type:"hidden",
			        	  value:this.pane.category
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			      ]
		});

		this.title=Page_I18n.title_channel_detail_mock_window_add;
		//判断是否修改
		if( this.data )
		{
			var account_num = this.data.account_num;

			//分成的话数据库里面存分所以要除以100
			if( this.pane.category == "1" )
			{
				account_num = (account_num/100.0).toFixed(2);
			}
			this.title = Page_I18n.title_channel_detail_mock_window_modify;
			editForm.editRecord({
				id:this.data.id,
				account_num:account_num,
				product:this.data.product,
				sta_date:this.data.sta_date,
				active_count:this.data.active_count,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
					this.saveButton
					]
		       });
		
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function()
	{
		var that = this;

	    var url = "/business/channel_detail_proportion_mock/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var postParam = that.editForm.getValues();
					   //分成的话数据库里面存分所以要乘以100
					   if( that.pane.category == "1" )
						{
						   postParam.account_num = postParam.account_num*100;
						}
					   
					   isc.ask(
					    	Page_I18n.ask_channel_detail_mock_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.closeClick();
												that.pane.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
		});
	}

})


/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("channel_detail_mock_proportion_pane", isc.VLayout);

/**
 */
isc.channel_detail_mock_proportion_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null,
    category:"1",//按比例
    canOperate:false
});

/**
 */
isc.channel_detail_mock_proportion_pane.addMethods({
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
        	width:700,
//			cellPadding : 5,
        	fields: [
			         {
						type:"date_condition_pane",
						name:"sta_date",
						title:Page_I18n.title_sta_date,
						showTitle:true,
						warpTitle:false
			         },
			          {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }
			         ]
        });
		
		var addButton = isc.IButton.create({
	        title: Page_I18n.title_common_add,
	        type: "button",
	        iconWidth:16,
	        icon: isc.web_const.icon_path+"demoApp/icon_add.png",
        	click:function()
        	{
        		that._createEditWindow();
        	}
        });
		
		if( !this.canOperate )
		{
			addButton.hide();
		}
		
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
		        addButton
		    ]
		});
	},
	_createEditWindow:function(data)
	{
		var window = isc.channel_detail_mock_proportion_edit_window.create({data:data,pane:this});
		window.show();
	},
	/**
	 * 创建数据列表
	 */
	_createListGrid:function()
	{
		var that = this;
		var account_title = Page_I18n.title_active_count;
		var unit_title = Page_I18n.title_ralative_price;
		if( this.category == "1" )
		{
			account_title = Page_I18n.title_active_fee;
			unit_title = Page_I18n.title_relative_rate;
		}
		var dataSource = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/channel_detail_proportion_mock/queryList",
		    fields:[
				{name:"sta_date", showHover :true,align:"left",title:Page_I18n.title_sta_date
					,summaryValue :Page_I18n.title_common_total_sum
				},
				{
					name:"account_num", showHover :true,align:"left",title:account_title
					,summaryFunction:"sum",showGridSummary:true, showGroupSummary:true,
					formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
		        		if(that.category == '1')
		        		{
		        			return  (value/100.0).toFixed(2);
		        		}
	        			return value;
					}
				},
				{name:"extraction_num",showHover :true, align:"left",title:unit_title,
					formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
		        		if(that.category == '1')
		        		{
		        			return value+"%"
		        		}
	        			return  (value/100.0).toFixed(2);
					}
				},
				{name:"active_count",showHover :true, align:"left",title:Page_I18n.title_active_count},
				{name:"arpu",showHover :true, align:"left",title:Page_I18n.title_arpu,
					formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
						return  (record.account_num*0.01/record.active_count*1.0).toFixed(2);
					}
				},
		        {name:"channel_name", showHover :true,align:"left",title:Page_I18n.title_channel_name},
		        {name:"product", showHover :true,align:"left",title:Page_I18n.title_product},
		        {name:"app_name",showHover :true, align:"left",title:Page_I18n.title_app_name},
		        {name:"app_version", showHover :true,align:"left",title:Page_I18n.title_app_version},
		        {name:"operator",hidden:!this.canOperate,width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    groupStartOpen:"first",
			groupByField:"channel_name",
			showGridSummary:true,
			showGroupSummaryInHeader:true,
			showGroupSummary:true,
		    canRemoveRecords :this.canOperate,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.ask_channel_detail_mock_delete,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.post(
		    						"/business/channel_detail_proportion_mock/edit",
		    						isc.JSON.encode({id:data.id,editorType:web_const.window_delete}),
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

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: Page_I18n.title_channel_detail_mock_window_modify,
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () 
		                {
		                    that._createEditWindow(record);  
		                }
		            });
		            return editImg;  
		        }
		    },
		    alternateRecordStyles:true,
		    showAllRecords:false,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData(
    			{
    	    		sta_date:this.searchForm.getValue("sta_date"),
    	    		channel_id:this.searchForm.getValue("channel_id"),
    	    		product:this.searchForm.getValue("product"),
    	    		category:this.category
    	    		},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("channel_detail_pane", isc.VLayout);

/**
 */
isc.channel_detail_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null,
    category:"0"
});

/**
 */
isc.channel_detail_pane.addMethods({
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
        	width:700,
//			cellPadding : 5,
        	fields: [
			         {
							 type:"date_condition_pane",
							 name:"sta_date",
						      title:Page_I18n.title_active_date,
							 showTitle:true,
						    warpTitle:false
						},
			           {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }]
        });
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
		        that.totalRowLabel
		    ]
		});
	},
	/**
	 * 创建数据列表
	 */
	_createListGrid:function()
	{
		var that = this;
		var account_title = Page_I18n.title_active_count;
		if( this.category == "1" )
		{
			account_title = Page_I18n.title_channel_report_active_fee;
		}
		var dataSource = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/channel_detail/queryList",
		    fields:[
					{name:"sta_date",showHover :true, align:"left",title:Page_I18n.title_sta_date},
					{name:"account_num", showHover :true,align:"left",title:account_title,
						formatCellValue:function(value, record, rowNum, colNum, grid)
			        	{
			        		if(that.category == '1')
			        		{
			        			return (value/100.0).toFixed(2);
			        		}
		        			return  value;
						}
					},
					{name:"channel_name",showHover :true, align:"left",title:Page_I18n.title_channel_name},
					{name:"product", showHover :true,align:"left",title:Page_I18n.title_product},
					{name:"app_name",showHover :true, align:"left",title:Page_I18n.title_app_name},
					{name:"app_version",showHover :true, align:"left",title:Page_I18n.title_app_version}
				 ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
		    groupStartOpen:"all",
//		    heigth:400,
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData(
    			{
    	    		product: this.searchForm.getValue("product"),
    	    		sta_date:this.searchForm.getValue("sta_date"),
    	    		category:this.category
    	    		},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("customer_info_pane", isc.VLayout);

/**
 */
isc.customer_info_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null,
    //totalCustomerLabel
    totalCustomerLabel:null
});

/**
 */
isc.customer_info_pane.addMethods({
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
		this.totalCustomerLabel = isc.Label.create({contents:"0",width:30});
		
		this.searchForm = isc.DynamicForm.create({
        	numCols: 4,
        	width:750,
//			cellPadding : 5,
        	fields: [
						{
							 type:"date_condition_pane",
							 name:"sta_date",
						      title:Page_I18n.title_active_date,
							 showTitle:true,
							 date1:new Date(),
						    warpTitle:false
						},
			          {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }]
        });
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
		        isc.Label.create({contents:Page_I18n.title_total_customer_count,width:75}),
		        that.totalCustomerLabel,
		        isc.Label.create({contents:Page_I18n.title_common_totalrow,width:60}),
		        that.totalRowLabel
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
			dataURL:"/business/customer_info/queryList",
		    fields:[
			    {name:"imei", showHover :true,align:"left",title:Page_I18n.title_imei},
		        {name:"model",showHover :true, align:"left",title:Page_I18n.title_model},
		        {name:"login_ip",showHover :true,align: "left", title:Page_I18n.title_login_ip},
		        {name:"customer_id",showHover :true,align: "left", title:Page_I18n.title_customer_id},
		        {name:"product", showHover :true,align:"left",title:Page_I18n.title_product},
		        {name:"app_name",showHover :true, align:"left",title:Page_I18n.title_app_name},
		        {name:"app_version", showHover :true,align:"left",title:Page_I18n.title_app_version},
		        {name:"android_version",showHover :true, align:"left",title:Page_I18n.title_android_version},
		        {name:"active_time", showHover :true,align:"left",title:Page_I18n.title_active_time}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData(
    			{
    		product: this.searchForm.getValue("product"),
    		sta_date:this.searchForm.getValue("sta_date")
    		},
//    		this.searchForm.getValuesAsCriteria(),
    	function(response, data, request)
    	{
			that.totalRowLabel.setContents(response.totalRows+"");
			that.totalRowLabel.redraw();
			jQuery.get(
					"/business/customer_allcustomer/query",
					{},
					function(msg)
					{
						that.totalCustomerLabel.setContents(msg.response.desc+"");
						that.totalCustomerLabel.redraw();
					},
					"json"
			);
			
		});
	}
});
/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("customer_login_pane", isc.VLayout);

/**
 */
isc.customer_login_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null
});

/**
 */
isc.customer_login_pane.addMethods({
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
        	width:700,
//			cellPadding : 5,
        	fields: [
        	         {
							 type:"date_condition_pane",
							 name:"sta_date",
						      title:Page_I18n.title_login_time,
							 showTitle:true,
							 date1:new Date(),
						    warpTitle:false
						},
			           {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }]
        });
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
		        that.totalRowLabel
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
			dataURL:"/business/customer_login/queryList",
		    fields:[
		        {name:"imei", showHover :true,align:"left",title:Page_I18n.title_imei},
		        {name:"model", showHover :true,align:"left",title:Page_I18n.title_model},
		        {name:"login_ip",showHover :true,align: "left", title:Page_I18n.title_login_ip},
		        {name:"customer_id",showHover :true,align: "left", title:Page_I18n.title_customer_id},
		        {name:"product", showHover :true,align:"left",title:Page_I18n.title_product},
		        {name:"app_name",showHover :true, align:"left",title:Page_I18n.title_app_name},
		        {name:"app_version",showHover :true, align:"left",title:Page_I18n.title_app_version},
		        {name:"login_time", showHover :true,align:"left",title:Page_I18n.title_login_time},
		        {name:"logout_time",showHover :true, align:"left",title:Page_I18n.title_logout_time},
		        {name:"online_time", showHover :true,align:"left",title:Page_I18n.title_online_time}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},
	
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({
    		product: this.searchForm.getValue("product"),
    		sta_date:this.searchForm.getValue("sta_date")
    		},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("local_fee_detail_pane", isc.VLayout);

/**
 */
isc.local_fee_detail_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null
});

/**
 */
isc.local_fee_detail_pane.addMethods({
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
        	width:700,
//			cellPadding : 5,
        	fields: [{
				 type:"date_condition_pane",
				 name:"sta_date",
			      title:Page_I18n.title_fee_time,
				 showTitle:true,
				 date1:new Date(),
			    warpTitle:false
			},
          {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }]
        });
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
		        that.totalRowLabel
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
			dataURL:"/business/local_fee_detail/queryList",
		    fields:[
			    {name:"imei", showHover :true,align:"left",title:Page_I18n.title_imei},
		        {name:"login_ip",showHover :true,align: "left", title:Page_I18n.title_login_ip},
		        {name:"customer_id",showHover :true,align: "left", title:Page_I18n.title_customer_id},
		        {name:"price",showHover :true, align:"left",title:Page_I18n.title_price},
		        {name:"status",showHover :true,align: "left", title:Page_I18n.title_fee_status,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
		        		var mapValue = value;
		        		if( value != "200" )
		        		{
//		        			mapValue = "-1";
		        			return value;
		        		}
	        			return Page_I18n.title_fee_status_map[mapValue] ;
					}
		        },
//		        {name:"signer", showHover :true,align:"left",title:Page_I18n.title_signer},
		        {name:"product",showHover :true, align:"left",title:Page_I18n.title_product},
		        {name:"app_name", showHover :true,align:"left",title:Page_I18n.title_app_name},
		        {name:"app_version", showHover :true,align:"left",title:Page_I18n.title_app_version},
		        {name:"fee_node", showHover :true,align:"left",title:Page_I18n.title_fee_node},
		        {name:"fee_time", showHover :true,align:"left",title:Page_I18n.title_fee_time}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({
    		product: this.searchForm.getValue("product"),
    		sta_date:this.searchForm.getValue("sta_date")
    		},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("sdk_fee_detail_pane", isc.VLayout);

/**
 */
isc.sdk_fee_detail_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null
});

/**
 */
isc.sdk_fee_detail_pane.addMethods({
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
        	width:700,
//			cellPadding : 5,
        	fields: [{
				 type:"date_condition_pane",
				 name:"sta_date",
			      title:Page_I18n.title_sync_time,
				 showTitle:true,
				 date1:new Date(),
			    warpTitle:false
			},
           {
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }]
        });
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
		        that.totalRowLabel
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
			dataURL:"/business/sdk_fee_detail/queryList",
		    fields:[
			    {name:"order_id",showHover :true, align:"left",title:Page_I18n.title_order_id},
		        {name:"price",showHover :true, align:"left",title:Page_I18n.title_price},
		        {name:"status",showHover :true,align: "left", title:Page_I18n.title_fee_status,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
	        			return Page_I18n.title_fee_status_map[value] ;
					}
		        },
		        {name:"operator",showHover :true,align: "left", title:Page_I18n.title_operator,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
//	        			return Page_I18n.title_operator_map[value] ;
		        		return value;
					}
		        },
		        {name:"signer",showHover :true, align:"left",title:Page_I18n.title_signer},
		        {name:"app_key", showHover :true,align:"left",title:Page_I18n.title_app_key},
		        {name:"product",showHover :true, align:"left",title:Page_I18n.title_product},
		        {name:"app_name",showHover :true, align:"left",title:Page_I18n.title_app_name},
		        {name:"app_version", showHover :true,align:"left",title:Page_I18n.title_app_version},
		        {name:"sdk_param",showHover :true, align:"left",title:Page_I18n.title_sdk_param},
		        {name:"sync_time", showHover :true,align:"left",title:Page_I18n.title_sync_time}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
//		    heigth:400,
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData({
    		product: this.searchForm.getValue("product"),
    		sta_date:this.searchForm.getValue("sta_date")
    		},
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("active_sta_pane", isc.VLayout);

/**
 */
isc.active_sta_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null
});

/**
 */
isc.active_sta_pane.addMethods({
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
        	numCols: 6,
        	width:710,
			cellPadding : 2,
//			titleWidth:100,
			warpItemTitles:false,
        	fields: [
				     {
				    	 type:"month_condition_pane",
				    	 name:"sta_date",
  			             title:Page_I18n.ui_condition_sta_datetype,
				    	 showTitle:true,
				         warpTitle:false
				     },{
			        	  name: "channel_id",
//			        	  width: 300,
			        	  title: Page_I18n.title_channel_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"id",
				          displayField :"name",
				          criteriaField:"channel_id",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/channel/queryList")
				     }
				     ,{
			        	  name: "product",
			        	  width: 325,
						  startRow:true,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }
        	]
        });
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
		        that.totalRowLabel
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
			dataURL:"/business/active_sta/queryList",
		    fields:[
				{name:"sta_date", showHover :true,align:"left",title:Page_I18n.title_sta_date
					,showGridSummary:true,summaryValue :Page_I18n.title_common_total_sum
				},
		        {name:"product", showHover :true,align:"left",title:Page_I18n.title_product},
		        {name:"app_name", showHover :true,align:"left",title:Page_I18n.title_app_name},
		        {name:"channel_name",showHover :true, align:"left",title:Page_I18n.title_channel_name},
		        {name:"online_count",showHover :true, align:"left",title:Page_I18n.title_online_count
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"new_count",showHover :true, align:"left",title:Page_I18n.title_new_count
		            	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        }
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
			showGridSummary:true,
			showGroupSummary:false,
//		    heigth:400,
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	_createComboboxDataSource:function()
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/product/queryList",
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"name"}
		    ]
		});
	},
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData(
    			{
    	    		product: this.searchForm.getValue("product"),
    	    		sta_date:this.searchForm.getValue("sta_date"),
    	    		channel_id:this.searchForm.getValue("channel_id")
    	    		},
//    	this.searchForm.getValuesAsCriteria(),
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("local_fee_sta_pane", isc.VLayout);

/**
 */
isc.local_fee_detail_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null
});

/**
 */
isc.local_fee_sta_pane.addMethods({
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
        	width:700,
			cellPadding : 2,
//			titleWidth:100,
			warpItemTitles:false,
        	fields: [
				     {
				    	 type:"month_condition_pane",
				    	 name:"sta_date",
  			             title:Page_I18n.ui_condition_sta_datetype,
				    	 showTitle:true,
				         warpTitle:false
				     }
				     ,{
			        	  name: "product",
			        	  width: 325,
						  startRow:true,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
						  addUnknownValues :false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList"),
						  changed :function(form,item,value)
						  {
							  var feeNode = form.getField("fee_node");
							  feeNode.optionCriteria ={product:value};
							  feeNode.setValue("");
							  if( value == undefined )
							  {
								feeNode.setDisabled(true);  
							  }
							  else
							  {
								feeNode.setDisabled(false);  
							  }
							  
						  }
				     },
				     {
			        	  name: "fee_node",
			        	  width: 200,
						  //startRow:true,
			        	  title: Page_I18n.title_fee_node,
			        	  type: "select",		
			        	 // editorType:"comboBox",
				          valueField:"name",
				          displayField :"name",
						  disabled :true,
				          autoFetchData :false,
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/fee_node_template/queryList")
				     }
        	]
        });
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
		        that.totalRowLabel
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
			dataURL:"/business/local_fee_sta/queryList",
		    fields:[
				{name:"sta_date", showHover :true,align:"left",title:Page_I18n.title_sta_date
					,showGridSummary:true,summaryValue :Page_I18n.title_common_total_sum
				},
		        {name:"product",showHover :true, align:"left",title:Page_I18n.title_product},
		        {name:"app_name", showHover :true,align:"left",title:Page_I18n.title_app_name},
		        {name:"fee_node", showHover :true,align:"left",title:Page_I18n.title_fee_node},
		        {name:"total_fee", showHover :true,align:"left",title:Page_I18n.title_total_fee,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
	        			return  (record.success_fee*1+record.failed_fee*1).toFixed(2);
					}
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:false
		        },
		        {name:"success_fee",showHover :true, align:"left",title:Page_I18n.title_success_fee
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:false
		        },
		        {name:"failed_fee",showHover :true, align:"left",title:Page_I18n.title_failed_fee
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"total_count", showHover :true,align:"left",title:Page_I18n.title_total_count,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
	        			return  record.success_count*1+record.failed_count*1;
					}
		        , summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"success_count",showHover :true, align:"left",title:Page_I18n.title_success_count
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"failed_count", showHover :true,align:"left",title:Page_I18n.title_failed_count
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        }
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
			showGridSummary:true,
			showGroupSummary:false,
//		    heigth:400,
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	_createComboboxDataSource:function()
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/product/queryList",
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"name"}
		    ]
		});
	},
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData(
    			{
    	    		fee_node: this.searchForm.getValue("fee_node"),
    	    		sta_date:this.searchForm.getValue("sta_date"),
    	    		product:this.searchForm.getValue("product")
    	    		},
//    	this.searchForm.getValuesAsCriteria(),
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("sdk_fee_sta_pane", isc.VLayout);

/**
 */
isc.sdk_fee_detail_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null
});

/**
 */
isc.sdk_fee_sta_pane.addMethods({
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
        	width:780,
			cellPadding : 2,
//			titleWidth:100,
			warpItemTitles:false,
        	fields: [
				     {
				    	 type:"month_condition_pane",
				    	 name:"sta_date",
  			             title:Page_I18n.ui_condition_sta_datetype,
				    	 showTitle:true,
				         warpTitle:false
				     }
				     ,{
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }
        	]
        });
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
		        that.totalRowLabel
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
			dataURL:"/business/sdk_fee_sta/queryList",
		    fields:[
			    {name:"sta_date",showHover :true, align:"left",title:Page_I18n.title_sta_date
			    	,showGridSummary:true,summaryValue :Page_I18n.title_common_total_sum
			    },
		        {name:"product",showHover :true, align:"left",title:Page_I18n.title_product},
		        {name:"app_name",showHover :true, align:"left",title:Page_I18n.title_app_name},
		        {name:"total_fee", showHover :true,align:"left",title:Page_I18n.title_total_fee,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
	        			return  (record.success_fee*1+record.failed_fee*1).toFixed(2);
					}
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"success_fee",showHover :true, align:"left",title:Page_I18n.title_success_fee
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"failed_fee", showHover :true,align:"left",title:Page_I18n.title_failed_fee
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"total_count",showHover :true, align:"left",title:Page_I18n.title_total_count,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
	        			return  record.success_count*1+record.failed_count*1;
					}
		        , summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"success_count",showHover :true, align:"left",title:Page_I18n.title_success_count
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"failed_count",showHover :true, align:"left",title:Page_I18n.title_failed_count
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        }
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
			showGridSummary:true,
			showGroupSummary:false,
//		    heigth:400,
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	_createComboboxDataSource:function()
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/product/queryList",
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"name"}
		    ]
		});
	},
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData(
    			{
    	    		product: this.searchForm.getValue("product"),
    	    		sta_date:this.searchForm.getValue("sta_date")
    	    		},
//    	this.searchForm.getValuesAsCriteria(),
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("sdk_transfer_sta_pane", isc.VLayout);

/**
 */
isc.sdk_transfer_sta_pane.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    listGrid:null,
    //searchForm
    searchForm:null,
    //totalRow
    totalRowLabel:null
});

/**
 */
isc.sdk_transfer_sta_pane.addMethods({
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
        	width:700,
			cellPadding : 2,
//			titleWidth:100,
			warpItemTitles:false,
        	fields: [
				     {
				    	 type:"month_condition_pane",
				    	 name:"sta_date",
  			             title:Page_I18n.ui_condition_sta_datetype,
				    	 showTitle:true,
				         warpTitle:false
				     },{
			        	  name: "sdk_id",
//			        	  width: 300,
			        	  title: Page_I18n.title_sdk_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"id",
				          displayField :"name",
				          criteriaField:"sdk_id",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/sdk/queryList")
				     }
				     , {
			        	  name: "product",
			        	  width: 325,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          filterFields:["name"],
				          valueField:"name",
				          displayField :"full_name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          pickListFields: 
				        	[
								{ name:"name",title:Page_I18n.title_relative_name},
								{ name:"product_name",title:Page_I18n.title_product_name }
						    ],
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     }
        	]
        });
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
		        that.totalRowLabel
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
			dataURL:"/business/sdk_transfer_sta/queryList",
		    fields:[
				{name:"sta_date",showHover :true, align:"left",title:Page_I18n.title_sta_date
					,showGridSummary:true,summaryValue :Page_I18n.title_common_total_sum
				},
		        {name:"product",showHover :true, align:"left",title:Page_I18n.title_product},
		        {name:"app_name",showHover :true, align:"left",title:Page_I18n.title_app_name},
		        {name:"sdk_name",showHover :true, align:"left",title:Page_I18n.title_sdk_name},
		        {name:"local_success_fee",showHover :true, align:"left",title:Page_I18n.title_local_success_fee
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"sdk_success_fee",showHover :true, align:"left",title:Page_I18n.title_sdk_success_fee
		        	, summaryFunction:"sum",showGridSummary:true, showGroupSummary:true
		        },
		        {name:"sdk_transfer_rate", showHover :true,align:"left",title:Page_I18n.title_sdk_transfer_rate,
		        	formatCellValue:function(value, record, rowNum, colNum, grid)
		        	{
		        		var rate = ((record.sdk_success_fee*1/record.local_success_fee*1)*100).toFixed(2);
		        		if( rate )
		        		{
		        			return rate +"%";
		        		}
	        			return  "";
					}
		        }
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
			showGridSummary:true,
			showGroupSummary:false,
//		    heigth:400,
		    alternateRecordStyles:true,
		    //showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: false
		});
	},

	_createComboboxDataSource:function()
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/product/queryList",
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"name"}
		    ]
		});
	},
	searchList:function()
	{
		var that = this;
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData(
    			{
    	    		product: this.searchForm.getValue("product"),
    	    		sta_date:this.searchForm.getValue("sta_date"),
    	    		sdk_id:this.searchForm.getValue("sdk_id")
    	    		},
//    	this.searchForm.getValuesAsCriteria(),
    	function(request)
    	{
			that.totalRowLabel.setContents(request.totalRows+"");
			that.totalRowLabel.redraw();
		});
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("role_management", isc.VLayout);

/**
 */
isc.role_management.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    roleListGrid:null,
    //编辑框
    editForm:null,
    //权限树
    rightTree:null
});

/**
 */
isc.role_management.addMethods({
	initWidget: function(){
		this.Super("initWidget", arguments);
		this.roleListGrid = this._createRoleListGrid();
		this.addMember(this._createRoleFilter());
		this.addMember(this.roleListGrid);
	},
	/**
	 * 列表查询条件
	 */
	_createRoleFilter:function()
	{
		var that = this;
		var form = isc.DynamicForm.create({
        	numCols: 4,
        	width:250,
			cellPadding : 5,
        	fields: [
        	         {name: "keyword",
        	        	startRow:"true",
        	        	title: Page_I18n.ui_condition_keyword,
        	        	type: "text",
        	        	defaultValue: ""
        	         }]
        });
		return isc.HLayout.create({
			width: "100%",		
			height : 24,
			membersMargin : 10,
			defaultLayoutAlign : "center",
		    members: [
		        form,
		        isc.IButton.create(
		        { name: "search",
		         title: Page_I18n.ui_button_search,
		         type: "button",
		         icon: isc.web_const.icon_path+"demoApp/icon_find.png",
		         iconWidth:24,
		         click: function()
		         {
			    	that.roleListGrid.invalidateCache();
			    	that.roleListGrid.fetchData({keyword: form.getValue("keyword")});
		         }
		        }),
		        isc.Label.create({contents:"",width:"100%"}),
		        isc.IButton.create({
			        title: Page_I18n.title_role_management_add,
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
	_createRoleListGrid:function()
	{
		var dataSource = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/system/getRoleList",
		    fields:[
		        {name:"roleName", title:Page_I18n.title_role_management_list_table_rolename},
		        {name:"operator",align: "center", title:Page_I18n.title_common_operator},
		        {name:"roleId",hidden :true, title:Page_I18n.title_role_management_list_table_fullname}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.role_management_list_delete+data.roleName,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.get("/business/system/roleDelete",
		    					{roleId:data.roleId},
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
		    				)
		    			}
		    		}
		    	)
		    },
		    showRecordComponents: true,    
		    showRecordComponentsByCell: true,  
		    createRecordComponent : function (record, colNum) {  
		        var fieldName = this.getFieldName(colNum);  

		        if (fieldName == "operator") {  

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: "Edit Comments",
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () {
		                    that._createEditWindow(record);  
		                }
		            });

		            return editImg;  
		        }else
		        {
		        	return null;
		        }
		    },
		    alternateRecordStyles:true,
		    showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: true
		});
	},
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var that = this;
		this.editForm = this._crateEditForm(data);
		this.rightTree = this._createRightTree(data);
		var save = this._createSaveButton(data);
		
		
		//如果是修改
	    var windowTitle = Page_I18n.title_role_management_window_add;		
		if( data  )
		{
			windowTitle = Page_I18n.title_role_management_window_modify;
		}
		
		//window
		this.editWindow = isc.Window.create({
			width: 450,
		    height: 500,
		    autoCenter: true,
		    showMinimizeButton: false,
		    isModal: true,
		    title: windowTitle,
		    showCloseButton: true,
		    canDragReposition: true,
		    keepInParentRect: true,
		    canDragResize: true,
		    showModalMask: true,
			items:[
			       isc.VLayout.create({
			    	   width:"100%",
			    	   height:"100%",
			    	   layoutMargin: 10,
			    	   membersMargin: 10,
			    	   members:[
						that.editForm,
						that.rightTree,
						save
						]
			       })  
			]
		});
		return this.editWindow;
	},
	/**
	 * 创建Form
	 */
	_crateEditForm:function(data)
	{
		//form
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "roleName",		title: Page_I18n.title_role_management_list_table_rolename,
			        	 type: "text",			required: true
			          },
			          {
			              name: "roleId",
			              type: "hidden"
			          }
			      ]
		});

		if(  data )
		{
			editForm.editRecord(data);
			editForm.getField("roleName").setCanEdit(false);
		}
		return editForm;
	},
	/**
	 * 创建菜单树
	 */
	_createRightTree:function(data)
	{
		//权限树获取所有树结构
		var ds = isc.RestDataSource.create({
			dataFormat: "json",
			titleField:"Menu",
		    fields:[
		        {name:"name", title:"Menu"},
		        {name:"actionNo", title:"No"},
		        {name:"parentId", foreignKey:"opId"},
		        {name:"opId", primaryKey:true}
		    ],
		    fetchDataURL:"/business/system/getRoleRight"
		});

		jQuery.ajax({
			url:"/business/system/getRoleRight",
			type:"GET",
			success:function(msg)
			{
				rightTree
			}
		})
		
		//TreeGrid是继承于Listgrid(表头只有一列，所以需要field)
		var rightTree = isc.TreeGrid.create({
			fields:
			[
			 { 
				 name:"name",width:300,
			     title: Page_I18n.title_operation,
			     type: "text"
			 }
			 ,
			 {
				 
			 }
			 ],
			 dataProperties:{
				loadDataOnDemand:false,
				//parentNode是根，需要getChildren才能取到自己的parent
			    dataArrived:function (parentNode)
			    {
			    	var that = this;
			    	this.openAll();
			    	var allNode = this.getAllNodes();  
			    	
			    	//修改状态时
			    	if(data){
			    		jQuery.ajax({
							url:"/business/system/getRoleRight?roleId="+data.roleId,
							type: "GET",
							success:function(msg)
							{
								//根据当前用户的角色勾选
								var listRole = isc.JSON.decode(msg).response.data;
								$.each(allNode,function(i,node){
									$.each(listRole,function(j,role){
										if( role.opId == node.opId && role.actionNo != "-1" )
										{
											rightTree.selectRecords(i);
										}
									})
								});
								
								//先close，再打开否则以上的勾选没有效果
								that.closeAll();
						    	that.openFolder( that.getChildren(parentNode)[0] );
							}
						});
			    	}
			    }
			 },
			 autoFetchData: true,
			 tabset:null,
			 width: "100%",
			 height:"100%",
			 showEdges:false,
			 showHeader:false,
			 border:"0px",
			 dataSource:ds, 
			 showOpenIcons:true,
			 showDropIcons:true,
			 selectionAppearance:"checkbox",
			 showSelectedStyle:false,
			 showPartialSelection:true,
			 cascadeSelection:true
		});
		
		

		
		return rightTree;
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function(data)
	{
		var that = this;

		//如果是修改
	    var url = "/business/system/roleAdd";
		if( data  )
		{
		    url = "/business/system/roleModify";
		}
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var formValue = that.editForm.getValues()
					   var postParam = {
						   roleName:formValue.roleName,
						   roleId:formValue.roleId
					   };
					   
					   var opList = "";
					   //半选的提交到服务端
					   var selectedRecord = that.rightTree.getSelection();
					   $.each(selectedRecord , function(i,data){
						   opList += ","+data.opId;
					   });
					   postParam.opList = opList.replace(/^,/g,"");
					   
					   jQuery.post(
							url,
							isc.JSON.encode(postParam),
							function(msg)
							{
								if( msg.response.result == web_const.result_success )
								{
									that.editWindow.closeClick();
									that.searchList();
								}
								//失败成功都需要信息
							    isc.say(msg.response.desc);
							},
							"json"
						);
				   }
			   }
		});
	},
	searchList:function()
	{
		this.roleListGrid.invalidateCache();
    	this.roleListGrid.fetchData();
	}
});

isc.role_management.addClassMethods({
	/**
	 * 获取唯一实例对象
	 * 
	 * @returns
	 */
	getInstance : function() {
		if (role_management.instance == null) {
			role_management.instance = role_management
					.create({
						width : "100%",
						height : "100%"
					});
		}		
		return role_management.instance;
	}
});/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("user_management", isc.VLayout);

/**
 */
isc.user_management.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    //列表
    listGrid:null,
    //查看
    viewTab:null,
    //编辑
    editTab:null
});

/**
 */
isc.user_management.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.listGrid = this._createUserListGrid();
		var filter = this._createUserFilter();

		this.addMember(filter);
		this.addMember(this.listGrid);
//		this.addMember(this._createOperatorItem());
	},
	/**
	 * 列表查询条件
	 */
	_createUserFilter:function()
	{
		var that = this;
		var form = isc.DynamicForm.create({
        	numCols: 4,
        	width:300,
			cellPadding : 5,
        	fields: [
        	         {name: "keyword",
        	        	startRow:"true",
        	        	title: Page_I18n.ui_condition_keyword,
        	        	type: "text",
        	        	defaultValue: ""
        	         }]
        });
		return isc.HLayout.create({
			width: "100%",		
			height : 20,
			membersMargin : 10,
			defaultLayoutAlign : "center",
		    members: [
		        form,
		        isc.IButton.create(
		        { name: "search",
		         title: Page_I18n.ui_button_search,
		         icon: isc.web_const.icon_path+"demoApp/icon_find.png",
		         iconWidth:24,
		         type: "button",
		         click: function()
		         {
			    	that.listGrid.invalidateCache();
			    	that.listGrid.fetchData({keyword: form.getValue("keyword")});
		         }
		        }),
		        isc.Label.create({contents:"",width:"100%"}),
		        isc.IButton.create({
			        title: Page_I18n.title_user_management_add,
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
	_createUserListGrid:function()
	{
		var dataSource = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/system/getUserList",
		    fields:[
		        {name:"userName", title:Page_I18n.title_user_management_list_table_username},
		        {name:"fullName", title:Page_I18n.title_user_management_list_table_fullname},
		        {name:"roleName", title:Page_I18n.title_role_management_list_table_rolename},
		        {name:"operator",width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.user_management_list_delete+data.userName,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.get("/business/system/userDelete",
		    					{userName:data.userName},
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
		    				)
		    			}
		    		}
		    	)
		    },
		    showRecordComponents: true,    
		    showRecordComponentsByCell: true,  
		    createRecordComponent : function (record, colNum) {  
		        var fieldName = this.getFieldName(colNum);  

		        if (fieldName == "operator") {  

		            var editImg = isc.ImgButton.create({
		                showDown: false,
		                showRollOver: false,
		                layoutAlign: "center",
		                src: isc.web_const.icon_path+"icons/16/comment_edit.png",
		                prompt: "Edit Comments",
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () {
		                    that._createEditWindow(record);  
		                }
		            });

		            return editImg;  
		        }else
		        {
		        	return null;
		        }
		    },
		    alternateRecordStyles:true,
		    showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: true
		});
	},
	searchList:function()
	{
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData();
	}
	,
	_createEditWindow:function(data)
	{
		var that = this;
		var roleListDS = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/system/getRoleList?_startRow=0&_endRow=10000",
		    fields:[
		        {name:"roleName"},
		        {name:"roleId"}
		    ],
		    cacheAllData :true
		});
		
		//form
		var editForm = isc.DynamicForm.create({
			numCols: 4,
			cellPadding : 5,
			fields: [
			         {
			        	 name: "userName",		title: Page_I18n.title_user_management_list_table_username,
			        	 type: "text",			required: true
			          },
			          {
			        	  name: "fullName",		title: Page_I18n.title_user_management_list_table_fullname,
			        	  required: true,		type: "text"
			          },
			          {
			        	  name: "password",		title: Page_I18n.title_common_password,
			        	  required: true,		type: "password",
			        	  validators: [
			        	               {
			        	            	   type: "matchesField",
			        	            	   otherField: "password2",
			        	            	   errorMessage: Page_I18n.error_common_password_not_match
			        	               }
			        	               ]
			          },
			          {
			        	  name: "password2",	title: Page_I18n.title_common_password2,
			        	  required: true,		type: "password"
			          },
			          {
			              name: "roleId", 		title: Page_I18n.title_role_management_list_table_rolename,
			              required:true,		type: "select",
			              optionDataSource: roleListDS,
			              valueField:"roleId",
			              displayField:"roleName"
			          }
			      ]
		});
		
		var url="/business/system/userAdd";
		if( data )
		{
			editForm.getField("userName").setCanEdit(false);
			editForm.setValue("userName",data.userName);
			editForm.setValue("fullName",data.fullName);
			editForm.getField("password").setRequired(false);
			editForm.getField("password2").setRequired(false);;
			editForm.setValue("roleId",data.roleId);
			url="/business/system/userModify";
		}
		//保存按钮
		var saveButton = isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( editForm.validate() )
				   {
					   var postParam = editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_sdk_add,
					    	function(value)
					    	{
					    		if(value)
					    		{
					    			jQuery.post(
										url,
										isc.JSON.encode(postParam),
										function(msg)
										{
											if( msg.response.result == web_const.result_success )
											{
												that.editWindow.closeClick();
												that.searchList();
											}
											//失败成功都需要信息
										    isc.say(msg.response.desc);
										},
										"json"
										);
					    			}
					    	});
				   }
			   }
			   });
		//如果是修改
	    var windowTitle = Page_I18n.title_user_management_window_add;		
		if( data  )
		{
			windowTitle = Page_I18n.title_user_management_window_modify;
		}
		
		//window
		this.editWindow = isc.Window.create({
			width: 500,
		    height: 200,
		    autoCenter: true,
		    showMinimizeButton: false,
		    isModal: true,
		    title: windowTitle,
		    showCloseButton: true,
		    canDragReposition: true,
		    keepInParentRect: true,
		    canDragResize: true,
		    showModalMask: true,
			items:[
			       isc.VLayout.create({
			    	   width:"100%",
			    	   height:"100%",
			    	   layoutMargin: 10,
			    	   membersMargin: 10,
			    	   members:[
						editForm,
						saveButton
						]
			       })  
			]
		});
		return this.editWindow;
	}
});

isc.user_management.addClassMethods({
	/**
	 * 获取唯一实例对象
	 * 
	 * @returns
	 */
	getInstance : function() {
		if (user_management.instance == null) {
			user_management.instance = user_management
					.create({
						width : "100%",
						height : "100%"
					});
		}		
		return user_management.instance;
	}
});