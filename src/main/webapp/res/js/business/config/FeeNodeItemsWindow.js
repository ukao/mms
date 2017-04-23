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
});