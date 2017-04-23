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
