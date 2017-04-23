/**
 * 右边一个tabset的
 */
ClassFactory.defineClass("role_management", isc.VLayout);

/**
 */
isc.role_management.addProperties({
	visibilityMode: "multiple",
	animateSections:true,
    width: "100%", 
    height: "100%",
    margin:5,
    //列表
    roleListGrid:null,
    //编辑框
    editForm:null,
    //权限树
    rightTree:null
});

/**
 */
isc.role_management.addMethods({
	initWidget: function(){
		this.Super("initWidget", arguments);
		this.roleListGrid = this._createRoleListGrid();
		this.addMember(this._createRoleFilter());
		this.addMember(this.roleListGrid);
	},
	/**
	 * 列表查询条件
	 */
	_createRoleFilter:function()
	{
		var that = this;
		var form = isc.DynamicForm.create({
        	numCols: 4,
        	width:250,
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
			height : 24,
			membersMargin : 10,
			defaultLayoutAlign : "center",
		    members: [
		        form,
		        isc.IButton.create(
		        { name: "search",
		         title: Page_I18n.ui_button_search,
		         type: "button",
		         icon: isc.web_const.icon_path+"demoApp/icon_find.png",
		         iconWidth:24,
		         click: function()
		         {
			    	that.roleListGrid.invalidateCache();
			    	that.roleListGrid.fetchData({keyword: form.getValue("keyword")});
		         }
		        }),
		        isc.Label.create({contents:"",width:"100%"}),
		        isc.IButton.create({
			        title: Page_I18n.title_role_management_add,
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
	_createRoleListGrid:function()
	{
		var dataSource = isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/system/getRoleList",
		    fields:[
		        {name:"roleName", title:Page_I18n.title_role_management_list_table_rolename},
		        {name:"operator",align: "center", title:Page_I18n.title_common_operator},
		        {name:"roleId",hidden :true, title:Page_I18n.title_role_management_list_table_fullname}
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
		    		Page_I18n.role_management_list_delete+data.roleName,
		    		function(value)
		    		{
		    			if( value )
		    			{
		    				jQuery.get("/business/system/roleDelete",
		    					{roleId:data.roleId},
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
	/**
	 * 创建编辑界面窗口
	 */
	_createEditWindow:function(data)
	{
		var that = this;
		this.editForm = this._crateEditForm(data);
		this.rightTree = this._createRightTree(data);
		var save = this._createSaveButton(data);
		
		
		//如果是修改
	    var windowTitle = Page_I18n.title_role_management_window_add;		
		if( data  )
		{
			windowTitle = Page_I18n.title_role_management_window_modify;
		}
		
		//window
		this.editWindow = isc.Window.create({
			width: 450,
		    height: 500,
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
						that.editForm,
						that.rightTree,
						save
						]
			       })  
			]
		});
		return this.editWindow;
	},
	/**
	 * 创建Form
	 */
	_crateEditForm:function(data)
	{
		//form
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "roleName",		title: Page_I18n.title_role_management_list_table_rolename,
			        	 type: "text",			required: true
			          },
			          {
			              name: "roleId",
			              type: "hidden"
			          }
			      ]
		});

		if(  data )
		{
			editForm.editRecord(data);
			editForm.getField("roleName").setCanEdit(false);
		}
		return editForm;
	},
	/**
	 * 创建菜单树
	 */
	_createRightTree:function(data)
	{
		//权限树获取所有树结构
		var ds = isc.RestDataSource.create({
			dataFormat: "json",
			titleField:"Menu",
		    fields:[
		        {name:"name", title:"Menu"},
		        {name:"actionNo", title:"No"},
		        {name:"parentId", foreignKey:"opId"},
		        {name:"opId", primaryKey:true}
		    ],
		    fetchDataURL:"/business/system/getRoleRight"
		});

		jQuery.ajax({
			url:"/business/system/getRoleRight",
			type:"GET",
			success:function(msg)
			{
				rightTree
			}
		})
		
		//TreeGrid是继承于Listgrid(表头只有一列，所以需要field)
		var rightTree = isc.TreeGrid.create({
			fields:
			[
			 { 
				 name:"name",width:300,
			     title: Page_I18n.title_operation,
			     type: "text"
			 }
			 ,
			 {
				 
			 }
			 ],
			 dataProperties:{
				loadDataOnDemand:false,
				//parentNode是根，需要getChildren才能取到自己的parent
			    dataArrived:function (parentNode)
			    {
			    	var that = this;
			    	this.openAll();
			    	var allNode = this.getAllNodes();  
			    	
			    	//修改状态时
			    	if(data){
			    		jQuery.ajax({
							url:"/business/system/getRoleRight?roleId="+data.roleId,
							type: "GET",
							success:function(msg)
							{
								//根据当前用户的角色勾选
								var listRole = isc.JSON.decode(msg).response.data;
								$.each(allNode,function(i,node){
									$.each(listRole,function(j,role){
										if( role.opId == node.opId && role.actionNo != "-1" )
										{
											rightTree.selectRecords(i);
										}
									})
								});
								
								//先close，再打开否则以上的勾选没有效果
								that.closeAll();
						    	that.openFolder( that.getChildren(parentNode)[0] );
							}
						});
			    	}
			    }
			 },
			 autoFetchData: true,
			 tabset:null,
			 width: "100%",
			 height:"100%",
			 showEdges:false,
			 showHeader:false,
			 border:"0px",
			 dataSource:ds, 
			 showOpenIcons:true,
			 showDropIcons:true,
			 selectionAppearance:"checkbox",
			 showSelectedStyle:false,
			 showPartialSelection:true,
			 cascadeSelection:true
		});
		
		

		
		return rightTree;
	},
	/**
	 * 创建保存按钮
	 */
	_createSaveButton:function(data)
	{
		var that = this;

		//如果是修改
	    var url = "/business/system/roleAdd";
		if( data  )
		{
		    url = "/business/system/roleModify";
		}
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
			   click:function()
			   {
				   if( that.editForm.validate() )
				   {
					   var formValue = that.editForm.getValues()
					   var postParam = {
						   roleName:formValue.roleName,
						   roleId:formValue.roleId
					   };
					   
					   var opList = "";
					   //半选的提交到服务端
					   var selectedRecord = that.rightTree.getSelection();
					   $.each(selectedRecord , function(i,data){
						   opList += ","+data.opId;
					   });
					   postParam.opList = opList.replace(/^,/g,"");
					   
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
			   }
		});
	},
	searchList:function()
	{
		this.roleListGrid.invalidateCache();
    	this.roleListGrid.fetchData();
	}
});

isc.role_management.addClassMethods({
	/**
	 * 获取唯一实例对象
	 * 
	 * @returns
	 */
	getInstance : function() {
		if (role_management.instance == null) {
			role_management.instance = role_management
					.create({
						width : "100%",
						height : "100%"
					});
		}		
		return role_management.instance;
	}
});