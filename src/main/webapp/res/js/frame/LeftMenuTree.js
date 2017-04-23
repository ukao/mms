/**
 * 菜单树
 */
ClassFactory.defineClass("menu_operator_tree", isc.TreeGrid);

/**
 */
isc.menu_operator_tree.addProperties({
    autoFetchData: true,
    showResizeBar: true,
    tabset:null,
    width: 250,
    fields: null,
    dataSource: null,
	dataProperties: null
});
/**
 * 
 */
isc.menu_operator_tree.addMethods({
	/**
	 * 
	 * @returns
	 */
	initWidget: function(){
		this.Super("initWidget", arguments);
		this.dataSource = isc.RestDataSource.create({
			dataFormat: "json",
			titleField:"Menu",
		    fields:[
		        {name:"name", title:"Menu"},
		        {name:"actionNo", title:"No"},
		        {name:"parentId", foreignKey:"opId"},
		        {name:"opId", primaryKey:true}
		    ],
		    fetchDataURL:"/business/getUserMenuTree"
		});
		
		//TreeGrid是继承于Listgrid(表头只有一列，所以需要field)
        this.fields = [
            {name:"name", 
                title: Page_I18n.title_menu,
                type: "text"}
        ];
        
     // 设置dataProperties属性
    	this.dataProperties = {
            loadDataOnDemand:false,
            dataArrived: function (parentNode) {
                this.openAll();
            }
        };
	},
	
	_initTree:function()
	{
		var util = isc.CommonUtil.create({});
        var data = util.sendRequest("/business/getUserMenuTree","get");
        
        var tree = isc.Tree.create({
            modelType: "parent",
            nameProperty: "Name",
            idField: "opId",
            parentIdField: "parentId",
            data : data
        });
        
        this.data = tree;
	},
	/**
	 * 
	 * 
	 * @param {Object}
	 *            view
	 * @param {Object}
	 *            node
	 * @param {Object}
	 *            ss
	 */
    nodeClick: function(view, node, ss){
    	actionNo = node.actionNo;
    	var tabId = "";
    	var pane = null;
    	var title="";
    	switch ( Number(actionNo) ) 
    	{
    		case 91:
    		{
    			tabId = "user_management_tab";
    			//
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.user_management.create({});
    			}
    			break;
    		}
    		case 92:
    		{
    			tabId = "role_management_tab";
    			//
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.role_management.create({});
    			}
    			break;
    		}
    		case 21:
    		{
    			tabId = "manufacturer_tab";
    			//
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.manufacturer_pane.create({});
    			}
    			break;
    		}
    		case 22:
    		{
    			tabId = "sdk_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.sdk_pane.create({});
    			}
    			break;
    		}
    		case 11:
    		{
    			tabId = "corporation_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.corporation_pane.create({});
    			}
    			break;
    		}
    		case 12:
    		{
    			tabId = "channel_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.channel_pane.create({});
    			}
    			break;
    		}
    		case 31:
    		{
    			tabId = "product_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.product_pane.create({});
    			}
    			break;
    		}
    		case 32:
    		{
    			tabId = "relative_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.relative_pane.create({});
    			}
    			break;
    		}
    		case 411:
    		{
    			tabId = "customer_info_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.customer_info_pane.create({});
    			}
    			break;
    		}
    		case 412:
    		{
    			tabId = "customer_login_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.customer_login_pane.create({});
    			}
    			break;
    		}
    		case 413:
    		{
    			tabId = "sdk_fee_detail_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.sdk_fee_detail_pane.create({});
    			}
    			break;
    		}
    		case 414:
    		{
    			tabId = "local_fee_detail_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.local_fee_detail_pane.create({});
    			}
    			break;
    		}
    		case 415:
    		{
    			tabId = "channel_detail_count_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.channel_detail_pane.create({category:"0"});
    			}
    			break;
    		}
    		case 416:
    		{
    			tabId = "channel_detail_fee_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.channel_detail_pane.create({category:"1"});
    			}
    			break;
    		}
    		case 421:
    		{
    			tabId = "sdk_fee_sta_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.sdk_fee_sta_pane.create({});
    			}
    			break;
    		}
    		case 422:
    		{
    			tabId = "local_fee_sta_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.local_fee_sta_pane.create({});
    			}
    			break;
    		}
    		case 423:
    		{
    			tabId = "active_sta_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.active_sta_pane.create({});
    			}
    			break;
    		}
    		case 424:
    		{
    			tabId = "sdk_transfer_sta_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.sdk_transfer_sta_pane.create({});
    			}
    			break;
    		}
    		case 51:
    		{
    			tabId = "relative_channel_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.relative_pane.create({canOperate:false});
    			}
    			break;
    		}
    		case 52:
    		{
    			tabId = "channel_detail_mock_count_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.channel_detail_mock_active_pane.create({category:"0"});
    			}
    			break;
    		}
    		case 53:
    		{
    			tabId = "channel_detail_mock_fee_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.channel_detail_mock_proportion_pane.create({category:"1"});
    			}
    			break;
    		}
    		case 61:
    		{
    			tabId = "channel_detail_mock_count_config_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.channel_detail_mock_active_pane.create({category:"0",canOperate:true});
    			}
    			break;
    		}
    		case 62:
    		{
    			tabId = "channel_detail_mock_fee_config_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.channel_detail_mock_proportion_pane.create({category:"1",canOperate:true});
    			}
    			break;
    		}
    		case 631:
    		{
    			tabId = "fee_node_strategy_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.fee_node_strategy_pane.create({});
    			}
    			break;
    		}
    		case 632:
    		{
    			tabId = "fee_node_template_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.fee_node_template_pane.create({});
    			}
    			break;
    		}
    		case 633:
    		{
    			tabId = "fee_node_relative_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.fee_node_relative_pane.create({});
    			}
    			break;
    		}
    		case 64:
    		{
    			tabId = "product_config_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.product_config_pane.create({});
    			}
    			break;
    		}
    		case 65:
    		{
    			tabId = "sdk_config_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.sdk_config_pane.create({});
    			}
    			break;
    		}
    		case 66:
    		{
    			tabId = "statistic_pane_tab";
    			if( !this.tabset.getTab( tabId ) )
    			{
    				pane = isc.statistic_pane.create({});
    			}
    			break;
    		}
    		default:return;
    	}
		title = node.name;
    	this.createTab(tabId,pane,title);
		this.tabset.selectTab(tabId);
    },
	
	createTab:function(tabId,pane,title)
	{
		if( !this.tabset.getTab( tabId ) )
		{
			this.tabset.addTab({
				ID:tabId,
				title:title,
				pane:pane,
				canClose:true
			});
		}		
	}
});