/**
 * 
 */

ClassFactory.defineClass("sdk_config_edit_window", isc.Window);

isc.sdk_config_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 500,
    height: 200,
    title:"",
    data:null,
    pane:null
});

isc.sdk_config_edit_window.addMethods({
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
			        	  width:300,
			              name: "m_id",		title: Page_I18n.title_manufacturer_name,
			              type: "text",
			              editorType:"comboBox",
			              pickListProperties :{showAllRecords:false},
			              pickListHeight:150,
			              valueField:"id",
			              displayField :"name",
			              autoFetchData :false,
			              textMatchStyle :"substring",
			              required: false,
			              addUnknownValues :false,
			              optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/manufacturer/queryList")
			          },
			         {
				    	  name: "sdk_id",
			        	  title: Page_I18n.title_sync_url,
			        	  width:300,
						  length:64,
					      type: "text",
					      required: false,
					      visible:false
				      },
				      {name:"order_id", title:Page_I18n.title_order_id,
				    	  	 width:300,
							 length:25,
					         type: "text",
					         required: false},
				      {name:"price", title:Page_I18n.title_product_config_price,
					         width: 300,
							 length:25,
						     type: "text",
						     required: false
					},
				     {name:"price_unit", title:Page_I18n.title_price_unit,
						      width: 300,
							 startRow:false,
						     type: "radioGroup",
						     vertical :false,
						     valueMap:Page_I18n.title_price_unit_map,
						    required: false
					 },	     
				      {name:"status", title:Page_I18n.title_fee_status,
				        	 width: 300,
							 length:25,
				        	 type: "text",
				        	 required: false},
				        {name:"operator",align: "left", title:Page_I18n.title_operator,
					        width: 300,
							length:25,
					        type: "text",
					        required: false},
				        {name:"signer", title:Page_I18n.title_signer,
						    width: 300,
							length:25,
						    type: "text",
						    required: false},
				        {name:"app_key", title:Page_I18n.title_app_key,
							width: 300,
							length:25,
							type: "text"
//							required: false
						},
						{name:"product", title:Page_I18n.title_product,
					    	  	 width:300,
								 length:25,
						         type: "text"
//						         required: false
						},
				        {name:"sdk_param", title:Page_I18n.title_sdk_param,
							width: 300,
							length:25,
//							required: false,
							type: "text"
						},
						{name:"response_code", title:Page_I18n.title_response_code,
								width: 300,
								length:10,
								type: "text"
//								required: false
						},
						{name:"http_method", title:Page_I18n.title_http_method,
							width: 300,
						     type: "radioGroup",
						     vertical :false,
						     valueMap:Page_I18n.title_http_method_map,
						    required: false},
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

		this.title=Page_I18n.title_sdk_config_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_sdk_config_window_modify;
			editForm.editRecord({
				id:this.data.id,
				sdk_id:this.data.sdk_id,
				product:this.data.product,
				order_id:this.data.order_id,
				price:this.data.price,
				status:this.data.status,
				operator:this.data.operator,
				signer:this.data.signer,
				app_key:this.data.app_key,
				sdk_param:this.data.sdk_param,
				response_code:this.data.response_code,
				m_id:this.data.m_id,
				http_method:this.data.http_method,
				price_unit:this.data.price_unit,
				editorType:web_const.window_modify
				});
			//editForm.getField("sdk_id").setVisible(true);
			//editForm.getField("sdk_id").setRequied(true);
		}
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

	    var url = "/business/sdk_config/edit";
		
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
					    	Page_I18n.ask_config_add,
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


