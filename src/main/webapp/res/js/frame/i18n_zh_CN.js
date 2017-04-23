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
}