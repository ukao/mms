/**
 * 
 */

ClassFactory.defineClass("fee_node_edit_window", isc.Window);

isc.fee_node_edit_window.addProperties({
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

isc.fee_node_edit_window.addMethods({
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
			        	  name: "product",
			        	  width: 300,
			        	  title: Page_I18n.title_product,
			        	  type: "text",		
			        	  editorType:"comboBox",
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          autoFetchData :false,
				          criteriaField:"product",
				          textMatchStyle :"substring",
				          required: true,
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     },
			         {
			        	 name: "name",
			        	 width: 300,
						 length:100,
			        	 title: Page_I18n.title_fee_node_name,
			        	 type: "text",		required: true
			          },
				      {
				       	 name: "price",
				       	 width: 300,
						 length:16,
				         title: Page_I18n.title_fee_node_price,
				         type: "text",		
				         required: true
				      },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:200}
									],
			              name: "desc",		title: Page_I18n.title_product_config_desc,
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

		this.title=Page_I18n.title_fee_node_window_add;
		//判断是否修改
		if( this.data )
		{
			this.title = Page_I18n.title_fee_node_window_modify;
			editForm.editRecord({
				id:this.data.id,
				name:this.data.name,
				product:this.data.product,
				price:this.data.price,
				desc:this.data.desc,
				editorType:web_const.window_modify
				});
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

	    var url = "/business/fee_node/edit";
		
		//保存按钮
		return isc.IButton.create({
			   title:Page_I18n.title_common_save,
			   icon: "/res/images/icon_save.png",
		       iconWidth:16,
		       snapTo:"BR",
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


