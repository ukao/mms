/**
 * 登录窗口
 */
ClassFactory.defineClass("login_window", isc.Window);

/**
 */
isc.login_window.addProperties({
	width: "100%",
    height:"100%",
    showStatusBar:false,
    showHeaderIcon:false,
    showCloseButton :false,
    showMinimizeButton :false,
    defaultLayoutAlign :"center",
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    title: " ",
    canDragReposition: false,
    animateMinimize: false,
    formItem :null
});

/**
 */
isc.login_window.addMethods({
	/**
	 * 
	 * @returns
	 */
	initWidget: function(){
		this.Super("initWidget", arguments);
		this.addItem(this._createDesc());
		this.addItem(this._createMiddle());
		this.addItem(this._createBottom());
	},
	_createDesc:function()
	{
		return isc.VLayout.create({
			height:50,
			layoutLeftMargin :50,
			members:[
				isc.Label.create({ 
					contents:"<div><i><h1>渠道管理系统</h1></i></div>"
						})
			]
			});
	},	
	_createMiddle:function()
	{
		return isc.Label.create({contents:"",height:"*"});
	},
	_createBottom:function()
	{
        this.formItem = this._createItem();
        var loginButton = this._createLoginButton();
		return isc.HLayout.create({
			members:[
			         isc.Label.create({contents:"",width:"*"}),
			         isc.VLayout.create({
			 			members:[this.formItem,loginButton]
			 			})
			         ]
		})
	},
	_createLoginButton:function()
	{
		var that =this;
		return isc.IButton.create({
		    title:"登录", 
//		    left:120,
		    click: function () 
		    {
				var postParam = that.formItem.getValues();
		    	jQuery.post(
						"login",
						isc.JSON.encode(postParam),
						function(msg)
						{
							if( msg.response.result == web_const.result_success )
							{
								location.href="res/page/index.html";
							}
							else
							{
								isc.say(msg.response.desc);
							}
						},
						"json"
						);
		    }
		})
	},	
	_createItem:function()
	{
		return isc.DynamicForm.create({
//		    canSubmit :true,
//		    action:"/login",
//		    ID: "loginForm",
		    width: 250,
		    margin:20,
		    numCols:4,
		    fields: [
		        {name: "userName",
		         title: "用户",
		         type: "text",
		         required: true,
		         colSpan :2,
		         defaultValue: "admin"
		        },
		        {name: "password",
		         title: "密码",
		         required: true,
		         type: "password",
		         colSpan :2,
		         defaultValue: "123"
		        },
		        {
		        	name:"validatorCode",
		        	title:"验证码",
		        	required:true,
		        	width:65,
		        	type:"text"
		        },
		        {
		        	name:"validatorImage",
		        	showTitle:false,
		        	type:"validator_code_item"
		        }
		    	]
				});
	}
});

ClassFactory.defineClass("validator_code_item", "CanvasItem");

isc.validator_code_item.addProperties({

	prompt:"点击更换",
	createCanvas : function()
	{
		return isc.Img.create({
			src:"/validator",
			width:80,height:26,
			click:function()
			{
				this.setSrc("/validator?"+Math.random());
			}
		});
	},
	getValue:function()
	{
		return "";
	}

});