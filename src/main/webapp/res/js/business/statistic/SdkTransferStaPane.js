/**
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
});