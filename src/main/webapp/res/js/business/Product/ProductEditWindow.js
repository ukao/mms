/**
 * 
 */

ClassFactory.defineClass("product_edit_window", isc.Window);

isc.product_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 450,
    height: 250,
    title:"",
    data:null,
    pane:null
});

isc.product_edit_window.addMethods({
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
			        	 name: "name",
			        	 width: 300,
						 length:25,
			        	 title: Page_I18n.title_product_name,
			        	 type: "text",		required: true
			          },
			          {
			        	 name: "version",
				       	 width: 300,
						 length:25,
				         title: Page_I18n.title_product_version,
				         type: "text",		required: true
				      },
			          {
			        	  name: "corporation_id",
			        	  width: 300,
			        	  title: Page_I18n.title_corporation_name,
			        	  type: "text",		
			        	  required: true, 
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"id",
				          displayField :"name",
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          addUnknownValues :false,
				          optionDataSource:this._createComboboxDataSource()
				     },
			         {
			        	 name: "app_key",
			        	 width: 300,
						 length:50,
			        	 title: Page_I18n.title_product_appkey,
			        	 type: "text",		required: true
			          },
			         {
			        	 name: "app_channel",
			        	 width: 300,
						 length:50,
			        	 title: Page_I18n.title_product_appchannel,
			        	 type: "text",		required: true
			          },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:100}
									],
			              name: "desc",		title: Page_I18n.title_product_desc,
			              type: "textArea"
			          },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			      ]
		});

		this.title=Page_I18n.title_product_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_product_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				version:this.data.version,
				app_key:this.data.app_key,
				app_channel:this.data.app_channel,
				corporation_id:this.data.corporation_id,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createComboboxDataSource:function()
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/corporation/queryList",
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"name"}
		    ]
		});
	},
	_createItem:function()
	{
		this.editForm = this._crateEditForm();
//		this.uploadForm = this._createUploadForm();
		this.saveButton = this._createSaveButton();
		return isc.VLayout.create({
		    	   width:"100%",
		    	   height:"100%",
		    	   layoutMargin: 10,
		    	   membersMargin: 20,
		    	   members:[
					this.editForm,
//					this.uploadForm,
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

	    var url = "/business/product/edit";
		
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
					    	Page_I18n.ask_product_add,
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
												that.pane.searchList();
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


