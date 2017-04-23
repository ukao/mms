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
