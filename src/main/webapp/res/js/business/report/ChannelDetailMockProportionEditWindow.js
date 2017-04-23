/**
 * 
 */

ClassFactory.defineClass("channel_detail_mock_proportion_edit_window", isc.Window);

isc.channel_detail_mock_proportion_edit_window.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);},
	width: 350,
    height: 150,
    title:"",
    data:null,
    pane:null
});

isc.channel_detail_mock_proportion_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{

		var account_title = Page_I18n.title_active_count;
		if( this.pane.category == "1" )
		{
			account_title = Page_I18n.title_active_fee_add;
		}
		var editForm = isc.DynamicForm.create({
			width:"100%",
			fields: [
			         {
			        	 name: "account_num",
			        	 width: 200,
						 length:25,
			        	 title: account_title,
			        	 type: "text",
			        	 required: true
			          },
				      {
				        	 name: "active_count",
				        	 width: 200,
							 length:25,
				        	 title: Page_I18n.title_active_count,
				        	 type: "text",
				        	 required: true
				      },
			          {
			        	  name: "product",
			        	  width: 200,
			        	  title: Page_I18n.title_relative_name,
			        	  type: "text",		
				          warpTitle:false,
			        	  editorType:"comboBox",
				          optionCriteria:{extraction_category:"0"},
				          pickListHeight:150,
				          valueField:"name",
				          displayField :"name",
				          criteriaField:"product",
				          required: true,
				          autoFetchData :false,
				          textMatchStyle :"substring",
				          optionDataSource:isc.CommonUtil.createComboboxDataSource("/business/productRelative/queryList")
				     },
				     {
				    	  name:"sta_date",
			        	  width: 150,
				          showTitle :true,
			        	  title: Page_I18n.title_sta_date,
			        	  type: "date",
			        	  useTextField:true,
				        	 required: true
					  },
			          {
			        	  name:"editorType",
			        	  type:"hidden",
			        	  value:web_const.window_add
			          },
			          {
			        	  name:"category",
			        	  type:"hidden",
			        	  value:this.pane.category
			          },
			          {
			        	  name:"id",
			        	  type:"hidden"
			          }
			      ]
		});

		this.title=Page_I18n.title_channel_detail_mock_window_add;
		//判断是否修改
		if( this.data )
		{
			var account_num = this.data.account_num;

			//分成的话数据库里面存分所以要除以100
			if( this.pane.category == "1" )
			{
				account_num = (account_num/100.0).toFixed(2);
			}
			this.title = Page_I18n.title_channel_detail_mock_window_modify;
			editForm.editRecord({
				id:this.data.id,
				account_num:account_num,
				product:this.data.product,
				sta_date:this.data.sta_date,
				active_count:this.data.active_count,
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

	    var url = "/business/channel_detail_proportion_mock/edit";
		
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
					   //分成的话数据库里面存分所以要乘以100
					   if( that.pane.category == "1" )
						{
						   postParam.account_num = postParam.account_num*100;
						}
					   
					   isc.ask(
					    	Page_I18n.ask_channel_detail_mock_add,
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


