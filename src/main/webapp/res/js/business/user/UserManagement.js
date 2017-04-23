/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("user_management", isc.VLayout);

/**
 */
isc.user_management.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    //列表
    listGrid:null,
    //查看
    viewTab:null,
    //编辑
    editTab:null
});

/**
 */
isc.user_management.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.listGrid = this._createUserListGrid();
		var filter = this._createUserFilter();

		this.addMember(filter);
		this.addMember(this.listGrid);
//		this.addMember(this._createOperatorItem());
	},
	/**
	 * 列表查询条件
	 */
	_createUserFilter:function()
	{
		var that = this;
		var form = isc.DynamicForm.create({
        	numCols: 4,
        	width:300,
			cellPadding : 5,
        	fields: [
        	         {name: "keyword",
        	        	startRow:"true",
        	        	title: Page_I18n.ui_condition_keyword,
        	        	type: "text",
        	        	defaultValue: ""
        	         }]
        });
		return isc.HLayout.create({
			width: "100%",		
			height : 20,
			membersMargin : 10,
			defaultLayoutAlign : "center",
		    members: [
		        form,
		        isc.IButton.create(
		        { name: "search",
		         title: Page_I18n.ui_button_search,
		         icon: isc.web_const.icon_path+"demoApp/icon_find.png",
		         iconWidth:24,
		         type: "button",
		         click: function()
		         {
			    	that.listGrid.invalidateCache();
			    	that.listGrid.fetchData({keyword: form.getValue("keyword")});
		         }
		        }),
		        isc.Label.create({contents:"",width:"100%"}),
		        isc.IButton.create({
			        title: Page_I18n.title_user_management_add,
			        type: "button",
			        iconWidth:16,
			        icon: isc.web_const.icon_path+"demoApp/icon_add.png",
		        	click:function(){
		        		that._createEditWindow();
		        	}
		        })
		    ]
		});
	},
	/**
	 * 创建数据列表
	 */
	_createUserListGrid:function()
	{
		var dataSource = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/system/getUserList",
		    fields:[
		        {name:"userName", title:Page_I18n.title_user_management_list_table_username},
		        {name:"fullName", title:Page_I18n.title_user_management_list_table_fullname},
		        {name:"roleName", title:Page_I18n.title_role_management_list_table_rolename},
		        {name:"operator",width:100,align: "center", title:Page_I18n.title_common_operator}
		    ]
		});

		var that = this;
		return isc.ListGrid.create({
		    width:"100%", 
		    heigth:400,
		    canRemoveRecords :true,
		    removeData :function( data )
		    {
		    	isc.ask(
		    		Page_I18n.user_management_list_delete+data.userName,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.get("/business/system/userDelete",
		    					{userName:data.userName},
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
		    				)
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
		                prompt: "Edit Comments",
		                valign: "center",
		                height: 16,
		                width: 16,
		                grid: this,
		                click : function () {
		                    that._createEditWindow(record);  
		                }
		            });

		            return editImg;  
		        }else
		        {
		        	return null;
		        }
		    },
		    alternateRecordStyles:true,
		    showAllRecords:true,
		    dataSource: dataSource,
		    autoFetchData: true
		});
	},
	searchList:function()
	{
		this.listGrid.invalidateCache();
    	this.listGrid.fetchData();
	}
	,
	_createEditWindow:function(data)
	{
		var that = this;
		var roleListDS = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/system/getRoleList?_startRow=0&_endRow=10000",
		    fields:[
		        {name:"roleName"},
		        {name:"roleId"}
		    ],
		    cacheAllData :true
		});
		
		//form
		var editForm = isc.DynamicForm.create({
			numCols: 4,
			cellPadding : 5,
			fields: [
			         {
			        	 name: "userName",		title: Page_I18n.title_user_management_list_table_username,
			        	 type: "text",			required: true
			          },
			          {
			        	  name: "fullName",		title: Page_I18n.title_user_management_list_table_fullname,
			        	  required: true,		type: "text"
			          },
			          {
			        	  name: "password",		title: Page_I18n.title_common_password,
			        	  required: true,		type: "password",
			        	  validators: [
			        	               {
			        	            	   type: "matchesField",
			        	            	   otherField: "password2",
			        	            	   errorMessage: Page_I18n.error_common_password_not_match
			        	               }
			        	               ]
			          },
			          {
			        	  name: "password2",	title: Page_I18n.title_common_password2,
			        	  required: true,		type: "password"
			          },
			          {
			              name: "roleId", 		title: Page_I18n.title_role_management_list_table_rolename,
			              required:true,		type: "select",
			              optionDataSource: roleListDS,
			              valueField:"roleId",
			              displayField:"roleName"
			          }
			      ]
		});
		
		var url="/business/system/userAdd";
		if( data )
		{
			editForm.getField("userName").setCanEdit(false);
			editForm.setValue("userName",data.userName);
			editForm.setValue("fullName",data.fullName);
			editForm.getField("password").setRequired(false);
			editForm.getField("password2").setRequired(false);;
			editForm.setValue("roleId",data.roleId);
			url="/business/system/userModify";
		}
		//保存按钮
		var saveButton = isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( editForm.validate() )
				   {
					   var postParam = editForm.getValues();
					   isc.ask(
					    	Page_I18n.ask_sdk_add,
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
												that.editWindow.closeClick();
												that.searchList();
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
		//如果是修改
	    var windowTitle = Page_I18n.title_user_management_window_add;		
		if( data  )
		{
			windowTitle = Page_I18n.title_user_management_window_modify;
		}
		
		//window
		this.editWindow = isc.Window.create({
			width: 500,
		    height: 200,
		    autoCenter: true,
		    showMinimizeButton: false,
		    isModal: true,
		    title: windowTitle,
		    showCloseButton: true,
		    canDragReposition: true,
		    keepInParentRect: true,
		    canDragResize: true,
		    showModalMask: true,
			items:[
			       isc.VLayout.create({
			    	   width:"100%",
			    	   height:"100%",
			    	   layoutMargin: 10,
			    	   membersMargin: 10,
			    	   members:[
						editForm,
						saveButton
						]
			       })  
			]
		});
		return this.editWindow;
	}
});

isc.user_management.addClassMethods({
	/**
	 * 获取唯一实例对象
	 * 
	 * @returns
	 */
	getInstance : function() {
		if (user_management.instance == null) {
			user_management.instance = user_management
					.create({
						width : "100%",
						height : "100%"
					});
		}		
		return user_management.instance;
	}
});