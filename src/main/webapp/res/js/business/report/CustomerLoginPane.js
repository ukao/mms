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
});