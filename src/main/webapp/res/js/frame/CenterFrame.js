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
	
});