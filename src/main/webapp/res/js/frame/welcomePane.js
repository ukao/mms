ClassFactory.defineClass("welcome_pane", isc.HTMLPane);


/*常量**/
isc.welcome_pane.addProperties({
	showEdges:false,
//    contentsURL:"http://www.baidu.com/",
    contentsType:"page"
});

isc.welcome_pane.addMethods({
	/**
	 * 
	 * @returns
	 */
	initWidget: function(){
		this.Super("initWidget", arguments);
	}

})