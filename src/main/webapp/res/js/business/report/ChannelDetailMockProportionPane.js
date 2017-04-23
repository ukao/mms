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
});