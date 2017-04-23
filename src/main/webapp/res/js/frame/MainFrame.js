/**
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
	
});