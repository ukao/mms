ClassFactory.defineClass("statistic_pane", isc.VLayout);


/*常量**/
isc.statistic_pane.addProperties({
	width:"100%",
	height:"100%",
	margin:0
});

isc.statistic_pane.addMethods({
	/**
	 * 
	 * @returns
	 */
	initWidget: function(){
		this.Super("initWidget", arguments);
		
		this.addMember(this._createTaskFormLayout(0,"运行所有"));
		this.addMember(this._createTaskFormLayout(1,"运行SDK计费统计"));
		this.addMember(this._createTaskFormLayout(2,"运行本地计费统计"));
		this.addMember(this._createTaskFormLayout(3,"运行渠道数据统计"));
		this.addMember(this._createTaskFormLayout(4,"运行激活量统计"));
		this.addMember(this._createTaskFormLayout(5,"运行SDK转化率统计"));
	},
	_createTaskFormLayout:function(method,buttonTitle)
	{
		var taskForm = isc.DynamicForm.create({
			width:"100%",
			numCols: 6,
			height:50,
			fields: [
			          {
			        	 name: "run",
			        	 width: 150,
						 length:50,
						 startRow:false,
						 endRow :false,
			        	 title: buttonTitle,
			        	 type: "button",
			        	 click:function(form)
			        	 {
			        		 if( form.validate() )
							   {
								   var postParam = form.getValues();
								   isc.ask(
								    	"确定运行任务吗?",
								    	function(value)
								    	{
								    		if(value)
								    		{
								    			jQuery.post(
													"/business/statistic_task",
													isc.JSON.encode(postParam),
													function(msg)
													{
														//失败成功都需要信息
													    isc.say(msg.response.desc);
													},
													"json"
													);
								    			}
								    	});
							   }
			        	 }
			          },
			          {
			        	  name:"param",
			        	  type:"date",
			        	  title:"运行日期",
			        	  required:true,
			        	  useTextField:true
			          },
			          {
			        	  name:"method",
			        	  type:"hidden",
			        	  value:method
			          }
			      ]
		});

		return taskForm;
	}
})