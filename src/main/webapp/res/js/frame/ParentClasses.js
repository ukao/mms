/**
Handle Error!
*/
isc.RPCManager.addClassProperties({
	handleError:function(num,status,code,text)
	{
		isc.warn("会话失效，请重新登陆!",function(){
			location.href="/loginPage.html";
		});
	}
});

//ClassFactory.defineClass("ListGrid", isc.ListGrid);

isc.ListGrid.addProperties({
	canDragSelectText :true	
});



/**
 * 
 */
ClassFactory.defineClass("MyWindow", isc.Window);

isc.MyWindow.addProperties({
	autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    canDragReposition: true,
    keepInParentRect: true,
//    autoDraw: false,
    showMinimizeButton: false,
    closeClick : function (){this.Super("closeClick", arguments);}
});



/**
 *  delivery date
 */
ClassFactory.defineClass("date_condition_pane", "CanvasItem");

isc.date_condition_pane.addProperties({
	commonTimeForm:null,
	date1:null,
	date2:null,
	
	createCanvas : function()
	{
		this.commonTimeForm = isc.DynamicForm.create({
		    numCols:4,
		    width:280,
		    fields:[
		        {
			    	  name:"date_start",
		        	  width: 100,
			          showTitle :false,
		        	  title: Page_I18n.ui_condition_date,
		        	  type: "date",
		        	  useTextField:true,
		        	  value:this.date1
				},
		        {
			    	  name:"date_end",
		        	  width: 100,
			          showTitle :true,
		        	  title: Page_I18n.title_sta_date_end,
		        	  type: "date",
		        	  useTextField:true,
		        	  value:this.date2
				}
		    ]
		});
		return this.commonTimeForm;
	},
	validators:
	[
	 {
		 type:"custom",
			validateOnChange :true,
			errorMessage:"起始日期不能大于结束日期",
			condition:function(item, validator, value, record)
			{

				var start = item.commonTimeForm.getValue("date_start");
				var end = item.commonTimeForm.getValue("date_end");
				if( !start && !end && start > end )
				{
					return false
				}
				
			}
	 }
	]
	,
	getValue:function()
	{
		var start = this.commonTimeForm.getValue("date_start");
		var end = this.commonTimeForm.getValue("date_end");
			
		start = !start == false ? start.toSerializeableDate().substr(0,10):"";
		end = !end == false ? end.toSerializeableDate().substr(0,10):"";
			
		return  start+";"+end;
	}

});


/**
 *  delivery date
 */
ClassFactory.defineClass("month_condition_pane", "CanvasItem");

isc.month_condition_pane.addProperties({
	commonTimeForm:null,
	
	createCanvas : function()
	{
		this.commonTimeForm = isc.DynamicForm.create({
		    numCols:8,
		    width:350,
		    fields:[
		        {
		        	type:"select",
		            name:"sta_type",
		            showTitle:false,
		            width:80,
		            defaultValue:"0",
		            valueMap:
		            {
		             "0":Page_I18n.ui_condition_date,
			         "1":Page_I18n.ui_condition_month
		            },
		            changed:function(form,item,value)
		            {
		            	if( value == "0")
		            	{
		            		form.getItem("date_start").show();
		            		form.getItem("date_end").show();
		            		form.getItem("year").hide();
		            		form.getItem("month").hide();
		            	}
		            	else
		            	{
		            		form.getItem("date_start").hide();
		            		form.getItem("date_end").hide();
		            		form.getItem("year").show();
		            		form.getItem("month").show();
		            	}
		            }
		        },
		        {
			    	  name:"date_start",
		        	  width: 100,
			          showTitle :false,
		        	  title: Page_I18n.ui_condition_date,
		        	  type: "date",
		        	  useTextField:true
				},
		        {
			    	  name:"date_end",
		        	  width: 100,
			          showTitle :true,
		        	  title: Page_I18n.title_sta_date_end,
		        	  type: "date",
		        	  useTextField:true
				},
		        {
		        	type:"select",
		            name:"year",
		            width:60,
		            visible:false,
		            showTitle :false,
		            valueMap:
		            {
		             "2015":"2015",
			         "2016":"2016",
			         "2017":"2017",
			         "2018":"2018"	
		            },
		            title:"月份"
		        },
		        {
		        	type:"select",
		        	useTextField:"true",
		            name:"month",
		            visible:false,
		            showTitle :false,
		            width:50,
		            valueMap:
		            {
		            "01":"01",
			        "02":"02",
			        "03":"03",
			        "04":"04",
			        "05":"05",
			        "06":"06",
			        "07":"07",
			        "08":"08",
			        "09":"09",
			        "10":"10",
			        "11":"11",
			        "12":"12"
		            },
		            title:""
		        }
		    ]
		});
		return this.commonTimeForm;
	},
	validators:
	[
	 {
		 type:"custom",
			validateOnChange :true,
			errorMessage:"起始日期不能大于结束日期",
			condition:function(item, validator, value, record)
			{

				var start = item.commonTimeForm.getValue("date_start");
				var end = item.commonTimeForm.getValue("date_end");
				if( !start && !end && start > end )
				{
					return false
				}
				
			}
	 }
	]
	,
	getValue:function()
	{
		if( this.commonTimeForm.getValue("sta_type") == 0 )
		{
			var start = this.commonTimeForm.getValue("date_start");
			var end = this.commonTimeForm.getValue("date_end");
			
			start = !start == false ? start.toSerializeableDate().substr(0,10):"";
			end = !end == false ? end.toSerializeableDate().substr(0,10):"";
			
			return  start+";"+end;
		}
		else
		{
			var year = this.commonTimeForm.getValue("year");
			var month = this.commonTimeForm.getValue("month");
			return year+"-"+month;	
		}
	}
});
