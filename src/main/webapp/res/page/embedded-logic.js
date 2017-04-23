/**
 * 主界面中间的区域
 */
ClassFactory.defineClass("center_frame_work", isc.HLayout);


isc.center_frame_work.addProperties({
    leftMenu: null,
    rightTab: null,
    width:"100%",
	height:"100%",
	margin:0
});

/**
 */
isc.center_frame_work.addMethods({
	/**
	 * 
	 * @returns
	 */
	initWidget: function(){
		this.Super("initWidget", arguments);
		this.rightTab = this._createRightTab();
		this.leftMenu =this._createLeftMenu();
		this.addMember(this.leftMenu);
		this.addMember(this.rightTab);
		this._initWebCome();
	},
	_createLeftMenu:function()
	{
		//将tab传给节点，便于能引用
		return isc.menu_operator_tree.create({tabset:this.rightTab});
	},_createRightTab:function()
	{
		return isc.TabSet.create({width:"100%",height:"100%"});
	},_initWebCome:function()
	{
		this.rightTab.addTab(
				{
					title:Page_I18n.title_webcome,
					pane:isc.welcome_pane.create({}),
					canClose:false
				}
				)
	}
	
});/**
 * 
 */

ClassFactory.defineClass("changpwd_window", isc.Window);

isc.changpwd_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 400,
    height: 150,
    title:"修改密码",
    data:null,
    pane:null
});

isc.changpwd_window.addMethods({
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
			        	 name: "old_password",
			        	 width: 300,
						 length:50,
			        	 title: Page_I18n.title_common_old_password,
			        	 type: "password",		required: true
			          },
			          {
				        	 name: "password",
				        	 width: 300,
							 length:50,
				        	 title: Page_I18n.title_common_password,
				        	 type: "password",		required: true,
				        	 validators: 
				        		 [
				        		  {
				        	      type: "matchesField",
				        	      otherField: "password2",
				        	      errorMessage: Page_I18n.error_common_password_not_match
				        	      }
				        	     ]
				       },
				       {
				        	 name: "password2",
				        	 width: 300,
							 length:50,
				        	 title: Page_I18n.title_common_password2,
				        	 type: "password",		required: true
				       }
			          
			      ]
		});

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

	    var url = "/business/system/changepwd";
		
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


ClassFactory.defineClass("CommonUtil", Class);


isc.CommonUtil.addClassMethods({
	initResponseFrame: function(){
		if (null == document.getElementById("download")) {
			var body = document.getElementsByTagName("body")[0];
			if (isc.Browser.isIE) {
				var sHTML = '<iframe name = "download" id = "download" style = "display:none">Test</iframe>';
				body.insertAdjacentHTML("beforeEnd", sHTML);
			}
			else {
				var ele = document.createElement("iframe");
				ele.setAttribute("name", "download");
				ele.setAttribute("id", "download");
				ele.style.display = "none";
				body.appendChild(ele);
			}				
		}
	},
	getToday:function()
	{
		return new Date();
	},
	createDownloadForm:function(module)
	{
		return isc.DynamicForm.create({
			canSubmit:true,
			method: "POST",
			action: "/business/download",
			width:"*",
			target:"download",
			fields: 
			[
				{
					name: "module",
					value: module,
					type: "hidden"
				},
				{
					name:"id",
					type: "hidden"
				}
			]
		});
	},
	
	
	/**
	 * 用于将服务器端返回的JSON对象转换为HTML兼容的字符串
	 * @param {Object} obj
	 */
	json2String: function(obj)
	{
	    var str = isc.JSON.encode(obj).replace(/"/g, "&quot;");
	    return str;
	}
    ,
	createComboboxDataSource:function(url)
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:url,
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"name"}
		    ]
		});
	}
});

/**
 * I18n文件 
 */
var Page_I18n={
		title_webcome:"欢迎",
		ask_loginout:"确定退出登录吗?",
		//作为基础元素的title
		//格式为 title_modula_child
		title_menu:"菜单",
		title_operation:"操作权限",
		title_user_management:"用户管理",
		title_user_management_list:"用户列表",
		title_user_management_add:"新建用户",
		title_user_management_window_add:"新建用户",
		title_user_management_window_modify:"修改用户",
		title_user_management_list_table_username:"用户名",
		title_user_management_list_table_fullname:"姓名",
		user_management_list_delete:"确实要删除此记录吗?用户名:",
		
		title_role_management:"角色管理",
		title_role_management_window_add:"新建角色",
		title_role_management_window_modify:"修改角色",
		title_role_management_add:"新建角色",
		title_role_management_list_table_rolename:"角色名称",
		role_management_list_delete:"确实要删除此记录吗?角色名:",

		title_common_old_password:"旧密码",
		title_common_password:"密码",
		title_common_password2:"重复密码",
		title_common_view:"查看",
		title_common_add:"新增",
		title_common_modify:"修改",
		title_common_edit:"编辑",
		title_common_save:"保存",
		title_common_operator:"操作",
		title_common_save_as_new:"另存为新记录",
		title_common_download:"下载",
		title_common_upload:"上传",
		title_common_totalrow:"总记录数:",
		
		title_common_total_sum:"总量",
		
		//ui公共信息
		ui_button_search:"查询",
		ui_button_reset:"重置",
		ui_condition_keyword:"名称",
		ui_condition_date:"日期",
		ui_condition_month:"月份",
		ui_condition_sta_datetype:"统计方式",
		
		//提示信息
		tip_common_view_empty:"选择一条记录后显示详细信息",
		
		//错误信息
		error_common_password_not_match:"两次输入密码不一致",
			
		//sdk公司
		title_manufacturer:"SDK管理",
		title_manufacturer_name:"SDK公司名称",
		title_manufacturer_sdk_list:"SDK列表",
		title_manufacturer_desc:"描述",
		title_manufacturer_window_add:"SDK公司新增",
		title_manufacturer_window_modify:"SDK公司修改",
		ask_manufacturer_add:"确定保存吗?",
		ask_manufacturer_delete:"删除SDK公司会将其上传的sdk也将删除，确定删除该SDK公司吗?名称:",
		
		//sdk
		title_sdk:"SDK管理",
		title_sdk_name:"SDK名称",
		title_sdk_upload:"上传SDK包",
		title_sdk_desc:"描述",
		title_sdk_version:"版本号",
		title_sdk_id:"SDK ID",
		title_price_unit:"价格单位",
		title_price_unit_map:
		{
			"f":"分",
			"j":"角",
			"y":"元"
		},
		title_response_code:"成功码",
		
		title_sdk_rate:"分成比例",
		title_sdk_upload_yes:"已上传",
		title_sdk_upload_no:"未上传",
		title_sdk_window_upload:"SDK包上传",
		title_sdk_window_add:"SDK新增",
		title_sdk_window_modify:"SDK修改",
		ask_sdk_add:"确定保存吗?",
		ask_sdk_upload:"确定上传SDK包吗?一个版本对应一个SDK包，新上传的SDK会覆盖已上传的。",
		ask_sdk_delete:"确定删除该SDK吗?名称:",
		
		//渠道
		title_channel:"渠道列表",
		title_channel_name:"渠道名称",
		title_channel_desc:"描述",
		title_channel_username:"渠道用户",
		title_channel_window_add:"渠道新增",
		title_channel_window_modify:"渠道修改",
		ask_channel_add:"确定保存吗?",
		ask_channel_delete:"可以删除未关联产品的渠道，确定删除该渠道吗?名称:",
		
		//产品公司
		title_corporation:"产品公司",
		title_corporation_name:"产品公司名称",
		title_corporation_desc:"描述",
		title_corporation_window_add:"产品公司新增",
		title_corporation_window_modify:"产品公司修改",
		ask_corporation_add:"确定保存吗?",
		ask_corporation_delete:"删除产品公司会将其上传的产品包也删除，确定删除该公司吗?名称:",
		
		//产品
		title_product_name:"产品名称",
		title_product_version:"版本",
		title_product_appkey:"App Key",
		title_product_appchannel:"App Channel",
		title_product_desc:"描述",
		title_product_window_add:"产品新增",
		title_product_window_modify:"产品修改",
		title_product_upload:"产品包上传",
		title_product_upload_no:"产品包未上传",
		title_product_upload_yes:"产品包已上传",
		title_product_window_upload:"产品包上传",
		ask_product_add:"确定保存吗?",
		ask_product_delete:"可以删除未关联渠道的产品，是否删除该产品吗?名称:",
		
		//产品关联
		title_relative:"产品ID分配",
		title_relative_name:"产品ID",
		title_relative_desc:"描述",
		title_relative_window_modify:"产品关联修改",
		title_relative_upload_no:"",
		title_relative_upload_yes:"",
		title_ralative_price:"单价(元)",
		title_relative_rate:"比例",
		title_relative_extraction_category:"合作模式",
		title_relative_extraction_num:"比例(%)/单价(元)",
		title_ralative_extraction_category_map:
		{
			"0":"分成",
			"1":"激活量"
		},
		//配置
		title_fee_node_name:"节点名称",
		title_fee_node_price:"价格(元)",
		title_fee_node_desc:"描述",
		title_fee_node_window_add:"计费节点新增",
		title_fee_node_window_modify:"计费节点修改",
		
		title_fee_node_strategy_name:"策略名称",
		title_fee_node_strategy_desc:"策略名称描述",
		title_fee_node_strategy_modify:"策略修改",
		title_fee_node_strategy_delete:"删除策略会将所有模板以及关联的数据删除，确定吗?",
		title_fee_node_strategy_window_add:"策略新增",
		title_fee_node_strategy_window_modify:"策略修改",
		
		title_fee_node_template_window_add:"策略配置新增",
		title_fee_node_template_window_add:"策略配置修改",
		
		title_fee_node_relative_window_modify:"策略关联修改",
		title_fee_node_relative_window_add:"策略关联新增",
		title_fee_node_list:"FeeNode列表",
		

		title_product_config_name:"配置名称",
		title_product_config_price:"价格",
		title_product_config_value:"配置值",
		title_product_config_desc:"描述信息",
		title_product_config_window_add:"产品配置新增",
		title_product_config_window_modify:"产品配置修改",
		title_http_method:"Http Method",
		title_http_method_map:{
			"GET":"GET",
			"POST":"POST"
		},
		title_sdk_config_window_add:"SDK同步参数配置新增",
		title_sdk_config_window_modify:"SDK同步参数配置修改",
		title_sync_url:"同步地址",
		
		ask_config_add:"确定保存?",
		ask_config_delete:"确定删除该记录?",
		
		title_relative_window_add:"产品ID分配",
		ask_relative_add:"确定保存?",
		title_arpu:"ARPU值",
		
		ask_channel_detail_mock_add:"确定保存?",
		ask_channel_detail_mock_delete:"确定删除此记录?",
		title_channel_detail_mock_window_add:"渠道报表数据新增",
		title_channel_detail_mock_window_modify:"渠道报表数据修改",
		
		title_channel_report_active_fee:"信息费(元)",
		
		title_total_customer_count:"总激活用户数",
		title_customer_info:"激活明细查询",
		title_customer_login:"用户在线时间明细查询",
		title_sdk_fee_detail:"SDK计费明细查询",
		title_local_fee_detail:"本地计费明细查询",
		title_channel_detail:"渠道明细查询",
		title_imei:"IMEI",
		title_model:"设备型号",
		title_login_ip:"登录地址",
		title_customer_id:"手机用户",
		title_product:"产品ID",
		title_app_name:"产品名称",
		title_app_version:"产品版本",
		title_android_version:"安卓OS版本",
		title_active_time:"激活时间",
		title_login_time:"登录时间",
		title_logout_time:"退出时间",
		title_online_time:"在线时长",
		
		title_order_id:"订单号",
		title_price:"资费价格(元)",
		title_fee_status:"计费状态",
		title_fee_status_map:
		{
			"-1":"失败",
			"200":"成功"
		},
		title_operator:"运营商",
		title_operator_map:
		{
			"1":"移动",	
			"2":"联通",	
			"3":"电信"
		},
		title_signer:"MD5校验",	
		title_app_key:"App Key",	
		title_sdk_param:"sdk自定参数",	
		title_sync_time:"同步时间",

		title_fee_node:"计费节点",
		title_fee_node_map:{
			"0":"0",
			"1":"1"
		},
		title_fee_time:"计费时间",
		
		title_active_date:"激活日期",
		title_active_count:"激活量",
		title_active_fee:"信息费(元)",
		title_active_fee_add:"信息费(元)",

        title_total_fee:"总金额(元)",
        title_success_fee:"成功金额(元)",
        title_failed_fee:"失败金额(元)",
        title_total_count:"计费次数",
        title_success_count:"成功次数",
        title_failed_count:"失败次数",
        title_sta_date:"统计日期",
        title_sta_date_end:"到",
        title_new_count:"新增用户数",
        title_online_count:"在线用户数",

        title_local_success_fee:"本地计费成功金额(元)",
        title_sdk_success_fee:"SDK计费成功金额(元)",
        title_sdk_transfer_rate:"SDK转化率"
}/**
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
});/**
 * 登录窗口
 */
ClassFactory.defineClass("login_window", isc.Window);

/**
 */
isc.login_window.addProperties({
	width: "100%",
    height:"100%",
    showStatusBar:false,
    showHeaderIcon:false,
    showCloseButton :false,
    showMinimizeButton :false,
    defaultLayoutAlign :"center",
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    title: " ",
    canDragReposition: false,
    animateMinimize: false,
    formItem :null
});

/**
 */
isc.login_window.addMethods({
	/**
	 * 
	 * @returns
	 */
	initWidget: function(){
		this.Super("initWidget", arguments);
		this.addItem(this._createDesc());
		this.addItem(this._createMiddle());
		this.addItem(this._createBottom());
	},
	_createDesc:function()
	{
		return isc.VLayout.create({
			height:50,
			layoutLeftMargin :50,
			members:[
				isc.Label.create({ 
					contents:"<div><i><h1>渠道管理系统</h1></i></div>"
						})
			]
			});
	},	
	_createMiddle:function()
	{
		return isc.Label.create({contents:"",height:"*"});
	},
	_createBottom:function()
	{
        this.formItem = this._createItem();
        var loginButton = this._createLoginButton();
		return isc.HLayout.create({
			members:[
			         isc.Label.create({contents:"",width:"*"}),
			         isc.VLayout.create({
			 			members:[this.formItem,loginButton]
			 			})
			         ]
		})
	},
	_createLoginButton:function()
	{
		var that =this;
		return isc.IButton.create({
		    title:"登录", 
//		    left:120,
		    click: function () 
		    {
				var postParam = that.formItem.getValues();
		    	jQuery.post(
						"login",
						isc.JSON.encode(postParam),
						function(msg)
						{
							if( msg.response.result == web_const.result_success )
							{
								location.href="res/page/index.html";
							}
							else
							{
								isc.say(msg.response.desc);
							}
						},
						"json"
						);
		    }
		})
	},	
	_createItem:function()
	{
		return isc.DynamicForm.create({
//		    canSubmit :true,
//		    action:"/login",
//		    ID: "loginForm",
		    width: 250,
		    margin:20,
		    numCols:4,
		    fields: [
		        {name: "userName",
		         title: "用户",
		         type: "text",
		         required: true,
		         colSpan :2,
		         defaultValue: "admin"
		        },
		        {name: "password",
		         title: "密码",
		         required: true,
		         type: "password",
		         colSpan :2,
		         defaultValue: "123"
		        },
		        {
		        	name:"validatorCode",
		        	title:"验证码",
		        	required:true,
		        	width:65,
		        	type:"text"
		        },
		        {
		        	name:"validatorImage",
		        	showTitle:false,
		        	type:"validator_code_item"
		        }
		    	]
				});
	}
});

ClassFactory.defineClass("validator_code_item", "CanvasItem");

isc.validator_code_item.addProperties({

	prompt:"点击更换",
	createCanvas : function()
	{
		return isc.Img.create({
			src:"/validator",
			width:80,height:26,
			click:function()
			{
				this.setSrc("/validator?"+Math.random());
			}
		});
	},
	getValue:function()
	{
		return "";
	}

});/**
 * 主界面
 */
ClassFactory.defineClass("main_frame_work", isc.VLayout);

/**
 */
isc.main_frame_work.addProperties({
    width:"100%",
	height:"100%",
	margin:0,
    topFrame:null,
    centerFrame:null,
    footFrame:null,
    ID:"mainFrame",
    userInfo:{}
});

/**
 */
isc.main_frame_work.addMethods({
	/**
	 * 
	 * @returns
	 */
	initWidget: function(){
		this.Super("initWidget", arguments);

		//初始化判断是否已经登录，如果已经登录，那么不打开此框
		if( false )
		{
			isc.login_window.create({});
		}
		this.topFrame = this._createTopFrame();
		this.centerFrame = this._createCenterFrame();
		this.footFrame = this._createFootFrame();
		this.addMember(this.topFrame);
		this.addMember(this.centerFrame);
		this.addMember(this.footFrame);
		this._queryUserInfo();
	},
	
	_createTopFrame:function()
	{
		return isc.HLayout.create({
//			backgroundColor :"#B9D5FC",
			height:50,
			backgroundImage:"/res/images/top.gif",
			backgroundRepeat :"repeat-x",
			members:[
				isc.Label.create({ width:30,contents:" "}),
				isc.Label.create({ width:200,contents:"<h1 style='font-family:verdana;color:#000'></h1>"}),
//				isc.HLayout.create({
//					members:[
//						
//					]
//				}),
				isc.Label.create({ width:"*",contents:""}),
				isc.Label.create({ID:"userDisplay",width:80,contents:"你好："}),
				isc.Label.create({width:80,contents:"<a href = 'javascript:void'  handleNativeEvents = 'false' onClick = 'javascript: mainFrame._openChangePwd()'><font color='white'>修改密码</font></a>"}),
				isc.Label.create({width:80,contents:"<a href = 'javascript:void'  handleNativeEvents = 'false' onClick = 'javascript: mainFrame._loginOut()'><font color='white'>退出登录</font></a>"})
			]
			});
	},
	_createCenterFrame:function()
	{
		return isc.center_frame_work.create({});
	},
	_createFootFrame:function()
	{
		return isc.HLayout.create({
			width:"100%",
			align:"center",
			members:[
				isc.Label.create({height:23,align:"center",width:"100%",contents:"Copyright © 2004-2030 www.zovto.com"})
			]
			});
	}
	,
	_openChangePwd:function()
	{
		var window = isc.changpwd_window.create();
		window.show();
	}
	,
	_loginOut:function()
	{
		isc.ask(
		    	Page_I18n.ask_loginout,
		    	function(value)
		    	{
		    		if(value)
		    		{
		    			location.href="/loginout";
	    			}
		    	});
	},
	_queryUserInfo:function()
	{
		jQuery.get("/business/system/userInfo",function(data){
			eval("response="+data);
			mainFrame.userInfo = response;
			userDisplay.setContents("<font color='white'>您好："+response.fullName+"</font>");
		});
	}
	
});/**
Handle Error!
*/
isc.RPCManager.addClassProperties({
	handleError:function(num,status,code,text)
	{
		isc.warn("会话失效，请重新登陆!",function(){
			location.href="/loginPage.html";
		});
	}
});

//ClassFactory.defineClass("ListGrid", isc.ListGrid);

isc.ListGrid.addProperties({
	canDragSelectText :true	
});



/**
 * 
 */
ClassFactory.defineClass("MyWindow", isc.Window);

isc.MyWindow.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
//    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);}
});



/**
 *  delivery date
 */
ClassFactory.defineClass("date_condition_pane", "CanvasItem");

isc.date_condition_pane.addProperties({
	commonTimeForm:null,
	date1:null,
	date2:null,
	
	createCanvas : function()
	{
		this.commonTimeForm = isc.DynamicForm.create({
		    numCols:4,
		    width:280,
		    fields:[
		        {
			    	  name:"date_start",
		        	  width: 100,
			          showTitle :false,
		        	  title: Page_I18n.ui_condition_date,
		        	  type: "date",
		        	  useTextField:true,
		        	  value:this.date1
				},
		        {
			    	  name:"date_end",
		        	  width: 100,
			          showTitle :true,
		        	  title: Page_I18n.title_sta_date_end,
		        	  type: "date",
		        	  useTextField:true,
		        	  value:this.date2
				}
		    ]
		});
		return this.commonTimeForm;
	},
	validators:
	[
	 {
		 type:"custom",
			validateOnChange :true,
			errorMessage:"起始日期不能大于结束日期",
			condition:function(item, validator, value, record)
			{

				var start = item.commonTimeForm.getValue("date_start");
				var end = item.commonTimeForm.getValue("date_end");
				if( !start && !end && start > end )
				{
					return false
				}
				
			}
	 }
	]
	,
	getValue:function()
	{
		var start = this.commonTimeForm.getValue("date_start");
		var end = this.commonTimeForm.getValue("date_end");
			
		start = !start == false ? start.toSerializeableDate().substr(0,10):"";
		end = !end == false ? end.toSerializeableDate().substr(0,10):"";
			
		return  start+";"+end;
	}

});


/**
 *  delivery date
 */
ClassFactory.defineClass("month_condition_pane", "CanvasItem");

isc.month_condition_pane.addProperties({
	commonTimeForm:null,
	
	createCanvas : function()
	{
		this.commonTimeForm = isc.DynamicForm.create({
		    numCols:8,
		    width:350,
		    fields:[
		        {
		        	type:"select",
		            name:"sta_type",
		            showTitle:false,
		            width:80,
		            defaultValue:"0",
		            valueMap:
		            {
		             "0":Page_I18n.ui_condition_date,
			         "1":Page_I18n.ui_condition_month
		            },
		            changed:function(form,item,value)
		            {
		            	if( value == "0")
		            	{
		            		form.getItem("date_start").show();
		            		form.getItem("date_end").show();
		            		form.getItem("year").hide();
		            		form.getItem("month").hide();
		            	}
		            	else
		            	{
		            		form.getItem("date_start").hide();
		            		form.getItem("date_end").hide();
		            		form.getItem("year").show();
		            		form.getItem("month").show();
		            	}
		            }
		        },
		        {
			    	  name:"date_start",
		        	  width: 100,
			          showTitle :false,
		        	  title: Page_I18n.ui_condition_date,
		        	  type: "date",
		        	  useTextField:true
				},
		        {
			    	  name:"date_end",
		        	  width: 100,
			          showTitle :true,
		        	  title: Page_I18n.title_sta_date_end,
		        	  type: "date",
		        	  useTextField:true
				},
		        {
		        	type:"select",
		            name:"year",
		            width:60,
		            visible:false,
		            showTitle :false,
		            valueMap:
		            {
		             "2015":"2015",
			         "2016":"2016",
			         "2017":"2017",
			         "2018":"2018"	
		            },
		            title:"月份"
		        },
		        {
		        	type:"select",
		        	useTextField:"true",
		            name:"month",
		            visible:false,
		            showTitle :false,
		            width:50,
		            valueMap:
		            {
		            "01":"01",
			        "02":"02",
			        "03":"03",
			        "04":"04",
			        "05":"05",
			        "06":"06",
			        "07":"07",
			        "08":"08",
			        "09":"09",
			        "10":"10",
			        "11":"11",
			        "12":"12"
		            },
		            title:""
		        }
		    ]
		});
		return this.commonTimeForm;
	},
	validators:
	[
	 {
		 type:"custom",
			validateOnChange :true,
			errorMessage:"起始日期不能大于结束日期",
			condition:function(item, validator, value, record)
			{

				var start = item.commonTimeForm.getValue("date_start");
				var end = item.commonTimeForm.getValue("date_end");
				if( !start && !end && start > end )
				{
					return false
				}
				
			}
	 }
	]
	,
	getValue:function()
	{
		if( this.commonTimeForm.getValue("sta_type") == 0 )
		{
			var start = this.commonTimeForm.getValue("date_start");
			var end = this.commonTimeForm.getValue("date_end");
			
			start = !start == false ? start.toSerializeableDate().substr(0,10):"";
			end = !end == false ? end.toSerializeableDate().substr(0,10):"";
			
			return  start+";"+end;
		}
		else
		{
			var year = this.commonTimeForm.getValue("year");
			var month = this.commonTimeForm.getValue("month");
			return year+"-"+month;	
		}
	}
});
/**
 * 自定义导航栏组件
 * 
 * @class isc.UpItemWigit
 * @extends isc.VLayout
 * 
 */
ClassFactory.defineClass("right_tabset_frame", isc.TabSet);

isc.right_tabset_frame.addClassProperties({
	
});

isc.right_tabset_frame.addProperties({
	width: "100%",
	height: "100%",
	initTab: null
});

isc.right_tabset_frame.addMethods({

	/**
	 * 初始化ups界面
	 */
	initWidget: function() {
		this.Super("initWidget", arguments);
	},

	closeClick: function( tab ){
		if(tab.pane.release){
			tab.pane.release();
		}
		this.Super("closeClick", tab);		
	},
	
	getTabPane: function(tab){
		return this.Super("getTabPane", arguments);
	},
	
	tabSelected: function(tabNum, tabPane, ID, tab){
		if(tabPane && tabPane.refresh){
			tabPane.refresh();			
		}
	},
	
	/**
	 * 覆盖默认的addTab方法
	 */
	
	addTab: function(tab, position){
		if (1 == arguments.length) 
		{
			isc.right_tabset_frame.openTabInTabSet(tab.ID, tab.title, tab.pane);
		}
		else if(2 == arguments.length)
		{
			isc.right_tabset_frame.openTabInTabSet(tab.ID, tab.title, tab.pane, position);
		}		
	}
});


/**
 * 自定义类方法和重载实例方法
 */
isc.right_tabset_frame.addClassMethods({
			/**
			 * 获取唯一实例对象
			 * 
			 * @returns
			 */
			getInstance : function() {
				if (right_tabset_frame.instance == null) {
					right_tabset_frame.instance = right_tabset_frame
							.create({
								width : "100%",
								height : "100%"
							});
				}
				return right_tabset_frame.instance;
			},
			
			/**
			 * 对长标题进行截断处理
			 * @param {Object} title
			 */
			getShortTitle: function(title)
			{
				if (typeof(title) == "undefined")
				{
					return "";
				}
				else
				{
					return  title.length > this.MAX_TITLE_LENGTH ? 
					title.substr(0, this.MAX_TITLE_LENGTH - 3) + "..." : title;
				}				
			},		
			
			/**
			 * 判断tab标签的数量是否超过了指定数量，如果超过，计算超过的数量并提示用户
			 */
			isTabNumLimitExceeded: function()
			{	
			 	var numOfAddedTabs = 0 == arguments.length ? 1 : arguments[0];				
				var tabsShouldBeClosed = this.getInstance().tabs.length + numOfAddedTabs - this.MAX_TAB_NUMBER;
				if (tabsShouldBeClosed > 0)
				{
					isc.warn("Too many tabs have been opened, please close at least " + tabsShouldBeClosed + " of them.");	
				}
				
				return tabsShouldBeClosed > 0;			
			},
			/**
			 * 不需要做替换的panel
			 * 比如，在ruleManagement界面打开Monitoring：不同Rule可以打开不同的Monitoring,但同一个Rule只能打开同一个Monitoring
			 * 
			 */
			openTabInTabSet: function(tabId, title, pane){
				//获取Tabset单例对象
				var tabset = this.getInstance();
				//获取截断的title
				var shortTitle = this.getShortTitle(title);
				//如果已经打开，那么选择
				if(tabset.getTab(tabId)){
					tabset.selectTab(tabId);
				}else{
					//
				    if (this.isTabNumLimitExceeded())
                    {				        
				        return;
                    }
				    
					var tab = {
						ID: tabId,
						prompt: title,
						title : shortTitle,			            
			            canClose: true,
			            pane: pane
			        };	
					
					// 调用“父类”的对应方法，否则会引循环调用			
					if (arguments.length < 4)
					{
						tabset.Super("addTab", tab);
					}
					// else if主要是针对覆盖了addTabs的情况，现在暂时无用（有bug）
					//else if(4 == arguments.length)
					//{
					//	tabset.Super("addTab", tab, arguments[3]);
					//}
									
				}
			},
			/**
			 * 如果已经打开了某个界面（已ID作为唯一标识），那么使用替换的方式
			 * 比如Rule、Template只能打开一个Tab，如果从其他地方跳过来，那么需要替换之前的Tab(因为条件不一样，所以需要替换)
			 */
			openSeparateTabInTabSet: function(tabId, title, pane){
				//获取Tabset单例对象
				var tabset = this.getInstance();
				//获取截断的title
				var shortTitle = this.getShortTitle(title);
				//是否已存在
				if( tabset.getTab(tabId) )
				{
					//替换之前的
					tabset.setTabPane(tabId, pane);
					tabset.setTabTitle(tabId, shortTitle);
					tabset.selectTab(tabId);
					
				}else{//需要新创建tab
					//如果超过一定数量
				    if (this.isTabNumLimitExceeded())
                    {                        
                        return;
                    }
                    
				    //创建tab
					var tab = {
						ID: tabId,
						prompt : title,
			            title: shortTitle,
			            canClose: true,
			            pane: pane
			        };
					
					// 调用“父类”的对应方法，否则会引循环调用
					if (arguments.length < 4)
					{
						tabset.Super("addTab", tab);
					}
					// else if主要是针对覆盖了addTabs的情况，现在暂时无用（有bug）
					//else if(4 == arguments.length)
					//{
					//	tabset.Super("addTab", tab, arguments[3]);
					//}
					
					tabset.selectTab(tab);
				}
			}
		});
﻿/**
 * 
 */

ClassFactory.defineClass("WaitImage", "CanvasItem");

isc.WaitImage.addProperties({
    height : 16, 
    width : 16,
    createCanvas : function () {
        return isc.Img.create({
            name : "wait",
            width : this.width, 
            height : this.height,
            imageType : "center", 
//            src : "../images/fms/wait.gif"
            src : null
        });
    }
});

// 

ClassFactory.defineClass("NotifyLabel", "CanvasItem");

isc.NotifyLabel.addProperties({
    height: "100%",
    width: "100%",
    createCanvas: function(){
        return isc.Label.create({
            name: "notifyLabel",
            height: this.height,
            width: this.width,
            align: "right",
            //backgroundColor: "lightblue",
            contents: ""
        })
    }
})

// 
ClassFactory.defineClass("MyUploadForm", isc.DynamicForm);

isc.MyUploadForm.addClassProperties({
    _$isc_iframe_upload_999 : "isc_iframe_upload_999",
    _iframe : null,
    responseCallback:null //

});

// 
isc.MyUploadForm.addProperties({
    
    encoding : "multipart",
    /**
     * 
     * @property {read write String} ? 
     */     
    action : null,//
    target : isc.MyUploadForm._$isc_iframe_upload_999,//
    selectTitle : isc.i18nMessages.uploadForm_selectTitle,
    submitTitle : isc.i18nMessages.uploadForm_submitTitle,
    cellPadding:2,//
    shouldPrompt : true,
    completePrompt : isc.i18nMessages.uploadForm_completePrompt,
    failedPrompt : isc.i18nMessages.uploadForm_failedPrompt,
    /**
     * 
     * @property {read write boolean} ? 
     */ 
    showTitle: false,
    wrapItemTitles : false,// 
    response:null,
    firstColWidth: 80, //
    button:null,
    idValue:null,
    nameValue:null
});



isc.MyUploadForm.addMethods({
	/**
	 * 
	 * @function {void} ?
	 */	
	initWidget : function() {

		//
		ret = this.Super("initWidget", arguments);
		
		var body = document.getElementsByTagName("body")[0];
		if (isc.MyUploadForm.iframe == null) {
			var ele = null;
			if (isc.Browser.isIE) {
				var sHTML = '<iframe name="' + isc.MyUploadForm._$isc_iframe_upload_999 + '" id="' + isc.MyUploadForm._$isc_iframe_upload_999 + '" style="display: none"' + '><' + '/iframe>';
				body.insertAdjacentHTML("afterBegin", sHTML);
				ele=document.getElementById(isc.MyUploadForm._$isc_iframe_upload_999);
			}
			else {
				ele = document.createElement("iframe");
				ele.setAttribute("name", isc.MyUploadForm._$isc_iframe_upload_999);
				ele.style.display = "none";
				body.appendChild(ele);
			}
			
			isc.MyUploadForm.iframe = ele;
		}
				
	
		var upLoadWidth=null;
		if(!this.showTitle){
			upLoadWidth=150;
			this.numCols=4;
			this.colWidths= ["*", 300, 70, 16]
		}
		else{
			upLoadWidth=150;
			this.numCols=5;
			this.colWidths= [this.firstColWidth, "*", 300, 70, 16]
		}		
                
		
		var that = this;
		this.button = 
		{

				title : "上传附件",
				name:"uploadButton",
				type : "button",
				width : 70,
				startRow : false,
				endRow : false,
				click : function() {
					var form1 = this.form;
					if (isc.Browser.isIE) {
						if(isc.MyUploadForm.responseCallback!=null){
							isc.MyUploadForm.iframe.detachEvent("onload",isc.MyUploadForm.responseCallback);
						}
						isc.MyUploadForm.responseCallback=(function(){
							return function(){
								form1.onFinished()
							};
						})()
						isc.MyUploadForm.iframe.attachEvent("onload",isc.MyUploadForm.responseCallback );
					}
					else{
						isc.MyUploadForm.iframe.onload = (function(){
							return function(){
								form1.onFinished()
							};
						})();							
					}
					

//					that.waitImg=isc.Dialog.create({
//						showModalMask  :true,
//						isModal: true,
//						showStatusBar :false,
//						showTitle :false,
//						showResizer :false,
//						showMinimizeButton :false,
//						showHeaderIcon :false,
//						showHeader :false,
//						showFooter :false,
//						showCloseButton :false,
//						items:[isc.Img.create({imageWidth:8,imageHeight:8,src:"../images/fms/wait.gif"})]
//					});
//					that.waitImg.show();
					
					if(that.getValue("upload"))
					{
					    that.getField("notify").canvas.setContents("");
					    that.getField("image").canvas.setBackgroundImage("res/images/wait.gif");
//					    that.getFiled("image").show();
					    
					}
					else
					{
					    that.getField("notify").canvas.setContents("<em>"
							+ "上传中"
							+ "</em>");
					    return;
					}
					
					this.form.submitForm();					
				}
			};
		
		this.setFields([
				{
					name : "upload",
					showTitle : this.showTitle,
					title : this.selectTitle,
					width : upLoadWidth,
					type : "upload",
					colSpan : 1,
					endRow : false
				},
				{
                    title : "上传中",
                    name : "notify",
                    align: "right",
                    width : 150,
                    editorType :"NotifyLabel",
                    showTitle : false,
                    startRow : false,
                    endRow : false,
                    visible: true
                },
				this.button,
				{
				    title : "waitImage",
				    name : "image",
				    width : 16,
			        editorType :"WaitImage",
			        showTitle : false,
			        startRow : false
//			        visible : false
				},
				{
					type:"hidden",
					defaultValue:this.idValue,
					name:"id"
				},
				{
					type:"hidden",
					defaultValue:this.nameValue,
					name:"name"
				}
				
				]);
		return ret;
	},
	
	disable: function(){
        this.getItem("upload").disable();
        this.getItem("uploadButton").disable();
        
    },
    
    
    enable: function(){
        this.getItem("upload").enable();
        this.getItem("uploadButton").enable();
    },
    
    /**
     * 
     * @function {void} ?
     */
	onFinished: function(){
	   	try {
//	   		this.waitImg.hide();
//	   	    this.getField("image").hide();
	   	    
	   	    //
	   	    this.getField("image").canvas.setBackgroundImage("null");
	   		var fileName=this.getValue("upload");
			if(!isc.MyUploadForm.iframe||!this.getValue("upload"))
			{
				return;
			}

			//
			var sJson = isc.MyUploadForm.iframe.contentWindow.document.body.innerText;
			if( sJson == undefined ){
				sJson = isc.MyUploadForm.iframe.contentWindow.document.body.textContent;
			}
			
			eval("this.response=" + sJson);
			if( this.response.response.result == web_const.result_success )
			{
				this.onSuccess( this.response.response );
	   	    }
			else
			{
				this.onFailed( this.response.response );
			}
	   	}
	   	catch (e) {
	   		this.onFailed(this.getValue("upload"),"上传失败");
	   	}
   },
    
    /**
     * 
     * @function {void}
     * @param {String} fileName - 
     */
    onSuccess: function(fileName){
        isc.say(this.completePrompt+"<br>"+fileName);
        
    },

    /**
     * 
     * @function {void} ?
     * @param {String} fileName - 
     */
    onFailed: function(fileName){
        if(this.response)
            isc.say(this.failedPrompt+"<br>"+fileName+this.response.response.data);
        else
            isc.say(this.failedPrompt+"<br>"+fileName);
    }
		
});ClassFactory.defineClass("web_const", Class);


/*常量**/
isc.web_const.addClassProperties({
	result_success:0,
	result_failed:1,
	icon_path:"/res/isomorphic/system/reference/exampleImages/",
	skins_path:"/res/isomorphic/skins/Enterprise/images/",
	window_add:0,
	window_modify:1,
	window_delete:2,
	
	//常量,渠道用户值，与spring里面一样
	ChannelRoleId:"2,4,5"
});ClassFactory.defineClass("welcome_pane", isc.HTMLPane);


/*常量**/
isc.welcome_pane.addProperties({
	showEdges:false,
//    contentsURL:"http://www.baidu.com/",
    contentsType:"page"
});

isc.welcome_pane.addMethods({
	/**
	 * 
	 * @returns
	 */
	initWidget: function(){
		this.Super("initWidget", arguments);
	}

})