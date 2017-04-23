/**
 * 
 */

ClassFactory.defineClass("relative_edit_window", isc.Window);

isc.relative_edit_window.addProperties({
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

isc.relative_edit_window.addMethods({
	initWidget: function()
	{
		this.Super("initWidget", arguments);
		this.addItem(this._createItem());
	},
	_crateEditForm:function()
	{
		var editForm = isc.DynamicForm.create({
			width:"100%",
			wrapItemTitles :false,
			fields: [
			         {
			        	 name: "name",
			        	 width: 300,
						 length:50,
			        	 title: Page_I18n.title_relative_name,
			        	 type: "text",		required: true
			          },
			          {
			        	  width:300,
			              name: "product_id",		title: Page_I18n.title_product_name,
			              type: "text",
			              editorType:"comboBox",
			              filterFields :["name"],
			              pickListHeight:150,
			              valueField:"id",
			              displayField :"name_version",
			              criteriaField :"keyword",
			              addUnknownValues :false,
			              autoFetchData :false,
			              required: true,		
			              textMatchStyle :"substring",
			              optionDataSource:this._createComboboxDataSource("product")
			          },
			          {
			        	  width:300,
			              name: "channel_id",		title: Page_I18n.title_channel_name,
			              type: "text",
			              editorType:"comboBox",
			              pickListHeight:150,
			              valueField:"id",
			              filterFields :["name"],
			              displayField :"name",
			              required: true,
			              criteriaField :"keyword",
			              addUnknownValues :false,
			              autoFetchData :false,
			              textMatchStyle :"substring",
			              optionDataSource:this._createComboboxDataSource("channel")
			          },
			          {
			        	  width:300,
			              name: "sdk_id",		title: Page_I18n.title_sdk_name,
			              editorType:"comboBox",
			              pickListHeight:150,
			              valueField:"id",
			              filterFields :["name"],
			              displayField :"name_version",
			              autoFetchData :false,
			              required: true,
			              textMatchStyle :"substring",
			              addUnknownValues :false,
						  pickListFields: [
							  { name:"name",title:Page_I18n.title_sdk_name},
							  { name:"version",title:Page_I18n.title_sdk_version }
						],
			              optionDataSource:this._createComboboxDataSource("sdk")
			          },
			          {
			        	  name:"extraction_category",
			        	  type:"radioGroup",
 			        	 width: 300,
			        	  title:Page_I18n.title_relative_extraction_category,
			        	  valueMap:Page_I18n.title_ralative_extraction_category_map,
			        	  defaultValue:"0",
						  required: true,
						  vertical :false,
			        	  changed :function(form,item,value)
			        	  {
			        		  
			        	  } 
			          },
			          {
			        	 name: "extraction_num",
			        	 width: 300,
						 length:20,
						 warpTitle:false,
			        	 title: Page_I18n.title_relative_extraction_num,
//			        	 editorType: "spinner", 
//						 defaultValue: 8.50,
//						 min: 0, 
//						 max: 100, 
//						 step: 0.01,
						 required: true
			          },
			          {
			        	  width:300,
			        	  height:60,
						  validators:[
										{type:"lengthRange", min:0, max:100}
									],
			              name: "desc",		title: Page_I18n.title_sdk_desc,
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

		this.title=Page_I18n.title_relative_window_add;
		//判断是否修改
		if( this.data )
		{
			var extraction_num = this.data.extraction_num;
			if( this.data.extraction_category == "1" )
			{
				extraction_num = (extraction_num/100.0).toFixed(2);
			}
			this.title = Page_I18n.title_relative_window_modify;
			editForm.getField("name").setCanEdit(false);
			editForm.editRecord({
				id:this.data.id,
				rate:this.data.rate,
				name:this.data.name,
				desc:this.data.desc,
				product_id:this.data.product_id,
				channel_id:this.data.channel_id,
				sdk_id:this.data.sdk_id,
				extraction_num:extraction_num,
				extraction_category:this.data.extraction_category,
				editorType:web_const.window_modify
				});
		}
		return editForm;
	},
	_createComboboxDataSource:function(module)
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:"/business/"+module+"/queryList",
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"keyword"},
		        {name:"name"}
		    ]
		});
	}
	,
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

	    var url = "/business/productRelative/edit";
		
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
					   if( postParam.extraction_category=='1')
					   {
						  postParam.extraction_num = postParam.extraction_num*100;
					   }
					   isc.ask(
					    	Page_I18n.ask_relative_add,
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


