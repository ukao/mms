/**
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


