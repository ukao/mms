ClassFactory.defineClass("CommonUtil", Class);


isc.CommonUtil.addClassMethods({
	initResponseFrame: function(){
		if (null == document.getElementById("download")) {
			var body = document.getElementsByTagName("body")[0];
			if (isc.Browser.isIE) {
				var sHTML = '<iframe name = "download" id = "download" style = "display:none">Test</iframe>';
				body.insertAdjacentHTML("beforeEnd", sHTML);
			}
			else {
				var ele = document.createElement("iframe");
				ele.setAttribute("name", "download");
				ele.setAttribute("id", "download");
				ele.style.display = "none";
				body.appendChild(ele);
			}				
		}
	},
	getToday:function()
	{
		return new Date();
	},
	createDownloadForm:function(module)
	{
		return isc.DynamicForm.create({
			canSubmit:true,
			method: "POST",
			action: "/business/download",
			width:"*",
			target:"download",
			fields: 
			[
				{
					name: "module",
					value: module,
					type: "hidden"
				},
				{
					name:"id",
					type: "hidden"
				}
			]
		});
	},
	
	
	/**
	 * 用于将服务器端返回的JSON对象转换为HTML兼容的字符串
	 * @param {Object} obj
	 */
	json2String: function(obj)
	{
	    var str = isc.JSON.encode(obj).replace(/"/g, "&quot;");
	    return str;
	}
    ,
	createComboboxDataSource:function(url)
	{
		return isc.RestDataSource.create({
			dataFormat:"json",
			dataURL:url,
			type:"GET",
		    fields:[
		        {name:"id"},
		        {name:"name"}
		    ]
		});
	}
});

