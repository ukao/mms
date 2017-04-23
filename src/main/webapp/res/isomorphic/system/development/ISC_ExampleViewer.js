
/*

  SmartClient Ajax RIA system
  Version v8.2p_2012-04-25/LGPL Development Only (2012-04-25)

  Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF
     ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file
     without an accompanying Isomorphic Software license file, please
     contact licensing@isomorphic.com for details. Unauthorized copying and
     use of this software is a violation of international copyright law.

  DEVELOPMENT ONLY - DO NOT DEPLOY
     This software is provided for evaluation, training, and development
     purposes only. It may include supplementary components that are not
     licensed for deployment. The separate DEPLOY package for this release
     contains SmartClient components that are licensed for deployment.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. You are expressly prohibited
     from attempting to reverse engineer this software or modify this
     software for human readability.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

if(window.isc&&window.isc.module_Core&&!window.isc.module_ExampleViewer){isc.module_ExampleViewer=1;isc._moduleStart=isc._ExampleViewer_start=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc._moduleEnd&&(!isc.Log||(isc.Log && isc.Log.logIsDebugEnabled('loadTime')))){isc._pTM={ message:'ExampleViewer load/parse time: ' + (isc._moduleStart-isc._moduleEnd) + 'ms', category:'loadTime'};
if(isc.Log && isc.Log.logDebug)isc.Log.logDebug(isc._pTM.message,'loadTime')
else if(isc._preLog)isc._preLog[isc._preLog.length]=isc._pTM
else isc._preLog=[isc._pTM]}isc.definingFramework=true;isc.defineClass("ExampleViewer","TabSet");isc.A=isc.ExampleViewer;isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.B.push(isc.A.getRefDocsURL=function isc_c_ExampleViewer_getRefDocsURL(){return window.exampleTree.nodeVisibility=="sdk"?"SmartClient_Reference.html":"/docs/8.1/a/b/c/go.html"}
);isc.B._maxIndex=isc.C+1;isc.A=isc.ExampleViewer.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.suppressSkinSwitch=true;isc.A.rpcURL=isc.Page.getURL("[ISOMORPHIC]/FeatureExplorerRPC");isc.A.layoutMargin=10;isc.A.membersMargin=10;isc.A.creatorName="exampleViewer";isc.A.exampleViewPaneDefaults={_constructor:"ExampleViewPane"};isc.A.exampleSourcePaneDefaults={_constructor:"ExampleSourcePane",scrollbarSize:16};isc.A.reloadButtonConstructor="ImgButton";isc.A.reloadButtonDefaults={_constructor:"ImgButton",title:"Reload",showFocused:false,src:"[ISO_DOCS_SKIN]/images/refresh.png",canHover:true,prompt:"<nobr>Reload this example.</nobr>",hoverHeight:20,width:20,height:20,margin:2,layoutAlign:"top",$jo:false,isMouseTransparent:true,click:"this.exampleViewer.reloadExample()"};isc.A.fullScreenCloseMessage="&nbsp;&nbsp;&nbsp;<span style='font-style:italic;color:yellow;'>[Close this window to return to example tree]</span>";isc.B.push(isc.A.initWidget=function isc_ExampleViewer_initWidget(){this.Super("initWidget",arguments);this.haveSCServer=isc.hasOptionalModule("SCServer");this.standardViewPane=this.viewPane=this.createAutoChild("exampleViewPane");this.viewtab=this.getTab(this.addTab({title:"View",iconSize:16,icon:"[ISO_DOCS_SKIN]/images/icon_view.png",pane:this.viewPane}));this.reloadButton=this.createAutoChild("reloadButton");this.tabBarControls=["tabScroller","tabPicker","skinSwitcher",this.reloadButton];if(this.url)this.loadExample(this.url)}
,isc.A.reloadExample=function isc_ExampleViewer_reloadExample(){this.loadExample(this.exampleConfig)}
,isc.A.getControl=function isc_ExampleViewer_getControl(_1){if(_1=="skinSwitcher"){if(!this.skinSwitcher){this.skinSwitcher=isc.DynamicForm.create({autoDraw:false,viewer:this,colWidths:[40,110],padding:0,border:"0px none",width:150,cellPadding:0,titleSuffix:":&nbsp",items:[{name:"skin",editorType:"select",width:"*",defaultValue:this.currentSkin,valueMap:{Enterprise:"Enterprise",EnterpriseBlue:"Enterprise Blue",Graphite:"Graphite",Simplicity:"Simplicity",fleet:"Fleet",TreeFrog:"TreeFrog",SilverWave:"SilverWave",BlackOps:"Black Ops",standard:"Basic"},title:"Skin",change:"form.viewer.setSkin(value)"}]})}
return this.skinSwitcher}
return this.Super("getControl",arguments)}
,isc.A.shouldShowControl=function isc_ExampleViewer_shouldShowControl(_1){if(_1=="skinSwitcher")return(!this.suppressSkinSwitch&&this.showSkinSwitch);return this.Super("shouldShowControl",arguments)}
,isc.A.setSkin=function isc_ExampleViewer_setSkin(_1){var _2=document.location.href,_3=_2.indexOf("#"),_4=_2.indexOf("?");var _5;if(_3!=-1){_5=_2.substring(_3);_2=_2.substring(0,_3)}
if(_4==-1)_2+="?skin="+_1;else{var _6=_2.indexOf("skin=");if(_6>0){var _7=_2.indexOf("&",_6);if(_7==-1)_2=_2.substring(0,_6);else _2=_2.substring(0,_6)+_2.substring(_7+1)}
if(_4==_2.length-1)_2+="skin="+_1;else _2+="&skin="+_1}
if(_5!=null)_2+=_5;document.location.replace(_2)}
,isc.A.loadExample=function isc_ExampleViewer_loadExample(_1){this.exampleConfig=_1;if(isc.isA.String(_1))_1={url:_1};this.showSkinSwitch=_1.showSkinSwitcher;var _2=[];if(_1.jsURL){_2.add({url:_1.jsURL,isSource:true,showSource:_1.showSource,exampleSource:true,fullScreen:_1.fullScreen,canEdit:_1.canEdit!="false"})}
if(_1.xmlURL){_2.add({url:_1.xmlURL,isSource:true,showSource:_1.showSource,fullScreen:_1.fullScreen,exampleSource:!_1.jsURL,canEdit:_1.canEdit!="false"})}
if(_1.css||_1.cssURL){_2.add(this.loadCSS({url:_1.css?_1.css:_1.cssURL,canEdit:_1.canEdit!="false",isCSS:true}))}
if(_2.length==0&&_1.url){var c={url:_1.url,isSource:true,showSource:_1.showSource,exampleSource:true,external:_1.external,iframe:_1.iframe,fullScreen:_1.fullScreen,externalWindowConfig:_1.externalWindowConfig,canEdit:_1.canEdit!="false"&&!_1.external&&!_1.iframe};if(_1.iframe)c.doEval=false;_2.add(c)}
if(_1.dataSource){var _4=_1.canEdit;if(_4!=null)_4=_4=="true";else _4=_1.dataSource.contains(".")?true:false
_2.add({dataSource:_1.dataSource,showSource:_1.showDataSource,canEdit:_4})}
if(_1.tabs){for(var i=0;i<_1.tabs.length;i++){var _6=isc.addProperties({},_1.tabs[i]);_6.canEdit=_6.canEdit!="false"&&!_1.external&&!_1.iframe;if(_6.url&&_6.url.match(/\.css$/i)&&!_1.external&&!_1.iframe){_6.isCSS=true;_6=this.loadCSS(_6)}
_2.add(_6)}}
if(this.waitOnAnimation)this.$49i=true;if(_1.requiresModules&&!isc.FileLoader.moduleIsLoaded(_1.requiresModules))
{this.loadingModules=true;isc.FileLoader.loadModules(_1.requiresModules,this.getID()+".modulesLoaded()")}
if(!isc.hasOptionalModule("SCServer")){isc.RPCManager.sendRequest({actionURL:this.rpcURL,clientContext:{exampleFiles:_2},useSimpleHttp:true,params:{noSCServer:true,data:isc.Comm.xmlSerialize("data",{method:"loadFiles",exampleFiles:_2})},showPrompt:true,promptStyle:"cursor",serverOutputAsString:true,callback:this.getID()+".loadExampleFilesCallback(rpcRequest, rpcResponse, isc.eval(data));"})}else{isc.RPCManager.sendRequest({actionURL:this.rpcURL,clientContext:{exampleFiles:_2},data:{method:"loadFiles",exampleFiles:_2},showPrompt:true,promptStyle:"cursor",callback:this.getID()+".loadExampleFilesCallback(rpcRequest, rpcResponse, data);"})}
if(this.exampleGlobals){isc.Class.destroyGlobals(this.exampleGlobals);delete this.exampleGlobals}
if(this.isDrawn()||this.autoShow)this.show()}
,isc.A.modulesLoaded=function isc_ExampleViewer_modulesLoaded(){this.loadingModules=null;isc.loadSkin();this.loadExampleFilesCallback()}
,isc.A.loadCSS=function isc_ExampleViewer_loadCSS(_1){if(this.remainingCSSFiles==null)this.remainingCSSFiles=0;this.remainingCSSFiles++;if(_1.doEval!="false"){var _2=_1.url.startsWith("/")?_1.url:isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_1.url;isc.FileLoader.loadFile(_2,this.getID()+".cssFileLoaded()")}else{_1.canEdit=false}
return _1}
,isc.A.animationComplete=function isc_ExampleViewer_animationComplete(){this.$49i=false;this.loadExampleFilesCallback()}
,isc.A.cssFileLoaded=function isc_ExampleViewer_cssFileLoaded(){this.remainingCSSFiles--;if(this.remainingCSSFiles==0)this.loadExampleFilesCallback()}
,isc.A.loadExampleFilesCallback=function isc_ExampleViewer_loadExampleFilesCallback(_1,_2,_3){if(_1){this.rpcRequest=_1;this.rpcResponse=_2;this.exampleFiles=_3}
if(this.$49i||this.remainingCSSFiles||this.loadingModules){return}
if(_1==null&&this.rpcRequest==null)return;_1=this.rpcRequest;_2=this.rpcResponse;_3=this.exampleFiles;this.rpcRequest=this.rpcResponse=this.exampleFiles=null;for(var i=0;i<_3.length;i++){var _5=_3[i];isc.addProperties(_5,_1.clientContext.exampleFile);if(!this.haveSCServer&&_5.isDataSource)_5.forceJS=true}
if(!this.showExample(_3))return;this.currentExampleFiles=_3;var _6;while((_6=this.getTab(1))!=null)this.removeTab(_6);var _7=[];for(var i=0;i<_3.length;i++){var _5=_3[i];if(_5.showSource==false||_5.showSource=="false")continue;var _8=_5.title;if(_5.isSource&&!_5.external&&!_5.iframe)
_8=_5.isXML?this.xmlSourceTitle:this.jsSourceTitle;if(_8==null){_8=_5.url||_5.dataSource;_8=_8.replace(/.*\/(.*)/,"$1")}
if(_5.exampleSource)this.currentExampleSourceFile=_5;_7.add({title:_8,iconSize:16,icon:"[ISO_DOCS_SKIN]/images/icon_code.png",exampleFile:_5})}
this.addTabs(_7)}
,isc.A.tabSelected=function isc_ExampleViewer_tabSelected(_1,_2,_3,_4){if(_4.pane)return;if(!isc.SyntaxHiliter){isc.showPrompt("Hang on - loading code preview modules");isc.FileLoader.loadModules("SyntaxHiliter,RichTextEditor",this.getID()+".sourcePaneModulesLoaded("+_1+")");return}
this.sourcePaneModulesLoaded(_1)}
,isc.A.sourcePaneModulesLoaded=function isc_ExampleViewer_sourcePaneModulesLoaded(_1){var _2=this.getTabObject(_1);var _3=_2.exampleFile;isc.clearPrompt();var _4=isc.StringBuffer.create();_4.append(_3.forceJS?this.getJSSource(_3):_3.fileContents);var _5=this.createAutoChild("exampleSourcePane",{rpcURL:this.rpcURL,canEdit:_3.canEdit,source:_4.toString(),exampleFile:_3});this.updateTab(_1,_5)}
,isc.A.showExample=function isc_ExampleViewer_showExample(_1){if(this.fullScreenBlurb!=null){this.fullScreenBlurb.destroy();this.fullScreenBlurb=null}
this.viewPane=this.standardViewPane;if(!this.viewPane.isDrawn())this.viewPane.draw();if(!_1)_1=this.currentExampleFiles;var _2=isc.StringBuffer.create();var _3,_4,_5,_6;var _7;for(var i=0;i<_1.length;i++){var _9=_1[i];if(_9.external){_7=_9;break}
if(_9.iframe){_4=_9;break}
if(_9.fullScreen){_5=true}
if(_9.error){isc.clearPrompt();isc.warn(_9.error);return false}
if(_3==null&&_9.exampleSource)
_3=this.getJSSource(_9);if(_9.isSource)continue;if(_9.loadAtEnd){var _10=this.getJSSource(_9);if(_6)_6=_10;else _6+=_10;continue}
if(_9.doEval!==false&&_9.doEval!=="false"&&!_9.isCSS){_2.append(this.getJSSource(_9),"\r\n")}}
if(_7){isc.Class.destroyGlobals(this.exampleGlobals);var _11=this.createLaunchExampleBlurb(_7);this.exampleGlobals=[_11.getID()];this.addCanviiToView(this.exampleGlobals);_11.draw();this.selectTab(0);isc.clearPrompt();return true}else if(_4){isc.Class.destroyGlobals(this.exampleGlobals);var _12=this.createIFRAME(_4);this.exampleGlobals=[_12.getID()];this.addCanviiToView(this.exampleGlobals);_12.draw();this.selectTab(0);isc.clearPrompt();return true}else{_2=_2.append(_3,_6).toString()}
if(_5){this.fullScreenEvalBuf=_2;isc.Class.destroyGlobals(this.exampleGlobals);this.fullScreenBlurb=this.createLaunchFullScreenBlurb();this.viewPane.addChild(this.fullScreenBlurb);this.selectTab(0);isc.clearPrompt();return true}
this.evalExample(_2);this.selectTab(0);this.show();return true}
,isc.A.getJSSource=function isc_ExampleViewer_getJSSource(_1){return _1.isXML?_1.xmlToJS:_1.fileContents}
,isc.A.evalExample=function isc_ExampleViewer_evalExample(_1){if(this.exampleGlobals)isc.Class.destroyGlobals(this.exampleGlobals);isc.clearPrompt();var _2=[];var _3;try{this.evalAndCaptureGlobals(_1,_2)}catch(e){if(_2)isc.Class.destroyGlobals(_2);isc.globalsSnapshot=[];_3=e;if(this.lastEvalBuf){this.exampleGlobals=this.evalAndCaptureGlobals(this.lastEvalBuf);this.addCanviiToView(this.exampleGlobals)}
this.logWarn("Error from this code:\n\n"+_1);isc.warn("Error evaluating your changes:<br><br>"+"ErrorType: "+e.name+"<br>"+"ErrorMessage: "+e.message);return false}
this.exampleGlobals=_2;this.addCanviiToView(this.exampleGlobals);this.lastEvalBuf=_1;return true}
,isc.A.evalAndCaptureGlobals=function isc_ExampleViewer_evalAndCaptureGlobals(_1,_2){isc.noAutoDraw=true;var _3=isc.globalsSnapshot=_2||[];isc.eval(_1);delete isc.noAutoDraw;isc.globalsSnapshot=null;return _3}
,isc.A.addCanviiToView=function isc_ExampleViewer_addCanviiToView(_1){if(!this.isDrawn())this.draw();for(var i=0;i<_1.length;i++){var _3=window[_1[i]];if(_3&&isc.isA.Canvas(_3)&&_3.parentElement==null&&_3.masterElement==null&&!isc.isA.ScrollingMenu(_3)&&!isc.isA.Menu(_3)&&!_3.isModal)
{if(_3.canDragResize||_3.canDragReposition)_3.keepInParentRect=true;this.viewPane.viewContainer.addChild(_3,null,_3.autoDraw!==false)}}}
,isc.A.createLaunchExampleBlurb=function isc_ExampleViewer_createLaunchExampleBlurb(_1){var _2=isc.VLayout.create({autoDraw:false,width:"100%",height:"100%",membersMargin:5,example:_1,members:[isc.Label.create({height:1,overflow:"visible",autoDraw:false,contents:"This example opens in a new window - click the button below to"+" launch the example.<P><B>NOTE:</B> you may need to bypass your"+" pop-up blocker by holding down CTRL as you click <i>Launch Example</i>"}),isc.IButton.create({autoDraw:false,overflow:"visible",icon:"[ISO_DOCS_SKIN]/images/icon_popup.png",title:"Launch Example",viewer:this,exampleFile:_1,click:function(){this.viewer.launchExternalExample(this.exampleFile)}})]});var _3=this.exampleConfig;if(_3.screenshot){var _4={showShadow:true,showEdges:true,edgeImage:"[ISO_DOCS_SKIN]/images/edges/rounded/frame/FFFFFF/5.png",edgeSize:5,shadowOffset:10,shadowSoftness:5,src:isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_3.screenshot,viewer:this,exampleFile:_1,click:function(){this.viewer.launchExternalExample(this.exampleFile)}}
if(_3.screenshotHeight&&_3.screenshotWidth){_4.width=_3.screenshotWidth;_4.height=_3.screenshotHeight}else{_4.height="*"}
_2.addMember(isc.Img.create(_4))}
return _2}
,isc.A.createLaunchFullScreenBlurb=function isc_ExampleViewer_createLaunchFullScreenBlurb(){var _1=isc.VLayout.create({autoDraw:false,width:"100%",height:"100%",membersMargin:5,members:[isc.Label.create({height:1,overflow:"visible",autoDraw:false,contents:'This is a full-screen example - click the "Show Example" button '+'to show fullscreen.'}),isc.IButton.create({autoDraw:false,overflow:"visible",icon:"[ISO_DOCS_SKIN]/images/features.png",title:"Show Example",viewer:this,click:function(){this.viewer.showFullScreenExample()}})]});this.fullScreenLaunchButton=_1.members[1];var _2=this.exampleConfig;if(_2.screenshot){var _3={autoDraw:false,showShadow:true,showEdges:true,edgeImage:"[ISO_DOCS_SKIN]/images/edges/rounded/frame/FFFFFF/5.png",edgeSize:5,shadowOffset:10,shadowSoftness:5,src:isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_2.screenshot,viewer:this,click:function(){this.viewer.showFullScreenExample()}}
if(_2.screenshotHeight&&_2.screenshotWidth){_3.width=_2.screenshotWidth;_3.height=_2.screenshotHeight}else{_3.height="*"}
_1.addMember(isc.Img.create(_3))}
return _1}
,isc.A.createIFRAME=function isc_ExampleViewer_createIFRAME(_1){var _2=_1.url;if(!_2.startsWith("/"))_2=isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_1.url;var _3=isc.Canvas.create({autoDraw:false,width:"100%",height:"100%",contentsURL:_2,contentsType:"page",destroy:function(){if(isc.Browser.isIE){var _4=this.getHandle().firstChild.contentWindow;_4.document.open();_4.document.write("");_4.document.close()}
this.Super("destroy",arguments)}});return _3}
,isc.A.launchExternalExample=function isc_ExampleViewer_launchExternalExample(_1){var _2=isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_1.url,_3=_1.externalWindowConfig;window.open(_2,"_blank",_3)}
,isc.A.showFullScreenExample=function isc_ExampleViewer_showFullScreenExample(){this.showClickMask();var _1=this.fullScreenLaunchButton.getPageRect();if(!this.animationOutline){this.animationOutline=isc.Canvas.create({autoDraw:false,border:"2px solid black",top:_1[1],left:_1[0],width:_1[2],height:_1[3]})}else{this.animationOutline.setRect(_1)}
this.animationOutline.show();this.animationOutline.animateRect(0,0,isc.Page.getWidth(),isc.Page.getHeight(),{target:this,methodName:"completeFullScreenShow"},500);if(!this.fullScreenExmapleWindow)
this.fullScreenExampleWindow=isc.FullScreenExampleWindow.create({viewer:this,exampleConfig:this.exampleConfig});this.fullScreenExampleWindow.setTitle(this.exampleConfig.title+this.fullScreenCloseMessage)}
,isc.A.completeFullScreenShow=function isc_ExampleViewer_completeFullScreenShow(){this.hideClickMask();this.fullScreenExampleWindow.show();if(this.viewPane!=this.fullScreenExampleWindow.viewPane){this.viewPane=this.fullScreenExampleWindow.viewPane;this.delayCall("evalExample",[this.fullScreenEvalBuf],0)}}
,isc.A.hideFullScreenExample=function isc_ExampleViewer_hideFullScreenExample(){this.showClickMask();this.animationOutline.setRect(0,0,isc.Page.getWidth(),isc.Page.getHeight());this.animationOutline.show();this.fullScreenExampleWindow.clear();var _1=this.fullScreenLaunchButton.getPageRect();this.animationOutline.animateRect(_1[0],_1[1],_1[2],_1[3],{target:this,methodName:"completeFullScreenHide"},500)}
,isc.A.completeFullScreenHide=function isc_ExampleViewer_completeFullScreenHide(){this.animationOutline.hide();this.hideClickMask()}
);isc.B._maxIndex=isc.C+26;isc.defineClass("FullScreenExampleWindow","Window");isc.A=isc.FullScreenExampleWindow.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.autoDraw=false;isc.A.width="100%";isc.A.height="100%";isc.A.showMinimizeButton=false;isc.A.showCloseButton=true;isc.A.canDragReposition=false;isc.A.canDragResize=false;isc.A.showShadow=false;isc.B.push(isc.A.closeClick=function isc_FullScreenExampleWindow_closeClick(){this.viewer.hideFullScreenExample()}
,isc.A.initWidget=function isc_FullScreenExampleWindow_initWidget(){this.Super("initWidget",arguments);var _1={};if(this.exampleConfig.backgroundColor)_1.backgroundColor=this.exampleConfig.backgroundColor;this.viewPane=isc.ExampleViewPane.create(_1);this.items=[this.viewPane]}
);isc.B._maxIndex=isc.C+2;isc.defineClass("ExampleSourcePane","Canvas");isc.A=isc.ExampleSourcePane.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.overflow="hidden";isc.A.margin=10;isc.A.sourceViewerDefaults={_constructor:"SourceViewer",width:"100%",height:"100%"};isc.A.sourceEditorDefaults={_constructor:"SourceEditor",width:"100%",height:"100%",useRichEditor:!(isc.Browser.isSafari||isc.Browser.isOpera)};isc.B.push(isc.A.initWidget=function isc_ExampleSourcePane_initWidget(){this.Super("initWidget",arguments);if(this.canEdit){this.view=this.sourceEditor=this.createAutoChild("sourceEditor")}else{this.view=this.sourceViewer=this.createAutoChild("sourceViewer")}
this.addChild(this.view);if(this.source)this.setSource(this.source)}
,isc.A.setSource=function isc_ExampleSourcePane_setSource(_1){this.source=_1;var _2="js";if(!this.exampleFile.forceJS&&(this.exampleFile.isXML||this.exampleFile.external||this.exampleFile.url.match(/\.wsdl|xml$/i)))_2="xml";if(this.exampleFile.url&&this.exampleFile.url.match(/\.css$/i))_2="css";this.view.setSource(_1,_2)}
,isc.A.revertEdit=function isc_ExampleSourcePane_revertEdit(){this.sourceEditor.setSource(this.source)}
,isc.A.tryEditedCode=function isc_ExampleSourcePane_tryEditedCode(){var _1=this.sourceEditor.getSource();this.exampleFile.fileContents=_1;if(this.exampleFile.isXML){if(!isc.hasOptionalModule("SCServer")){isc.RPCManager.sendRequest({actionURL:this.rpcURL,useSimpleHttp:true,serverOutputAsString:true,params:{noSCServer:true,data:isc.Comm.xmlSerialize("data",{method:"xmlToJS",exampleFiles:[this.exampleFile]})},callback:this.getID()+".xmlToJSCallback(rpcRequest, rpcResponse, isc.eval(data))"})}else{isc.RPCManager.sendRequest({actionURL:this.rpcURL,data:{method:"xmlToJS",exampleFiles:[this.exampleFile]},callback:this.getID()+".xmlToJSCallback(rpcRequest, rpcResponse, data)"})}}else if(this.exampleFile.isCSS){if(!isc.hasOptionalModule("SCServer")){isc.RPCManager.sendRequest({actionURL:this.rpcURL,useSimpleHttp:true,serverOutputAsString:true,params:{noSCServer:true,data:isc.Comm.xmlSerialize("data",{method:"bounceCSS",exampleFile:this.exampleFile})},callback:this.getID()+".loadCSS(isc.eval(data))"})}else{isc.RPCManager.sendRequest({actionURL:this.rpcURL,data:{method:"bounceCSS",exampleFile:this.exampleFile},callback:this.getID()+".loadCSS(data)"})}}else{this.setCurrentExampleSource(this.exampleFile);this.exampleViewer.showExample()}}
,isc.A.loadCSS=function isc_ExampleSourcePane_loadCSS(_1){isc.FileLoader.loadFile(isc.RPC.addParamsToURL(_1,{ts:new Date().getTime()}),this.getID()+".loadCSSCallback()")}
,isc.A.loadCSSCallback=function isc_ExampleSourcePane_loadCSSCallback(){isc.Canvas.clearCSSCaches();this.exampleViewer.showExample()}
,isc.A.xmlToJSCallback=function isc_ExampleSourcePane_xmlToJSCallback(_1,_2,_3){var _4=_3[0];if(_4.error){isc.warn(_4.error);return}
this.exampleFile.xmlToJS=_4.xmlToJS;this.setCurrentExampleSource(this.exampleFile);this.exampleViewer.showExample()}
,isc.A.setCurrentExampleSource=function isc_ExampleSourcePane_setCurrentExampleSource(_1){if(_1.isSource&&!_1.exampleSource){_1.exampleSource=true;this.exampleViewer.currentExampleSourceFile.exampleSource=false;this.exampleViewer.currentExampleSourceFile=this.exampleFile}}
);isc.B._maxIndex=isc.C+8;isc.defineClass("SourceViewer","VLayout");isc.A=isc.SourceViewer.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.sourceContainerDefaults={_constructor:"Canvas",overflow:"auto",canSelectText:true,height:"*"};isc.B.push(isc.A.initWidget=function isc_SourceViewer_initWidget(){this.Super("initWidget",arguments);this.sourceContainer=this.createAutoChild("sourceContainer");this.addMember(this.sourceContainer)}
,isc.A.setSource=function isc_SourceViewer_setSource(_1,_2){if(!_1)_1=isc.emptyString;if(_2){if(!this.syntaxHiliter){if(_2=="xml")this.syntaxHiliter=isc.XMLSyntaxHiliter.create();else if(_2=="js")this.syntaxHiliter=isc.JSSyntaxHiliter.create();else if(_2=="css")this.syntaxHiliter=isc.CSSSyntaxHiliter.create();else this.logDebug("Can't find hiliter for type: "+_2)}}
if(this.syntaxHiliter){this.sourceContainer.setContents(this.syntaxHiliter.hilite(_1))}else{this.sourceContainer.setContents(_1.asHTML())}}
);isc.B._maxIndex=isc.C+2;isc.defineClass("SourceEditor","VLayout");isc.A=isc.SourceEditor.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.membersMargin=5;isc.A.richSourceEditorDefaults={getBrowserSpellCheck:function(){return false},_constructor:"RichTextCanvas",cursor:isc.Canvas.TEXT,countLines:true,changed:function(){this.creator.sourceChanged()}};isc.A.sourceEditorFormDefaults={browserSpellCheck:false,_constructor:"DynamicForm",overflow:"hidden",autoFocus:false,height:"*",numCols:1,itemChange:function(){this.creator.sourceChanged()},fields:[{formItemType:"textArea",name:"source",showTitle:false,height:"*",width:"*"}]};isc.A.sourceEditorToolbarDefaults={_constructor:"HLayout",overflow:"visible",height:1,membersMargin:10,tryItButtonDefaults:{_constructor:"IButton",title:"Try it",icon:"[ISO_DOCS_SKIN]/images/icon_run.png",click:"this.parentElement.creator.tryClicked()"},revertButtonDefaults:{_constructor:"IButton",title:"Revert",disabled:true,showDisabledIcon:false,icon:"[ISO_DOCS_SKIN]/images/icon_revert.png",click:"this.parentElement.creator.revertClicked()"},initWidget:function(){this.Super("initWidget",arguments);this.refDocsURL=isc.ExampleViewer.getRefDocsURL();this.tryItButton=this.createAutoChild("tryItButton");this.revertButton=this.createAutoChild("revertButton");this.addMembers([this.tryItButton,this.revertButton,isc.LayoutSpacer.create({width:"*"})]);this.docSearch=isc.DynamicForm.create({ID:this.getID()+"$50n",autoDraw:false,refDocsURL:this.refDocsURL,numCols:2,colWidths:["*",100],width:320,cellPadding:0,doSearch:function(){var _1=this.getValue('searchString');window.open(this.refDocsURL+(_1?"?search="+encodeURIComponent(_1):""),"refDocWindow")},fields:[{name:"searchString",width:"*",title:"Search <a target='refDocWindow' href='"+this.refDocsURL+"' onclick='"+this.getID()+"$50n.doSearch();return false;'>SmartClient Documentation</a>",keyPress:function(_2,_3,_4){if(_4=="Enter")_3.doSearch()}}]});this.addMembers([this.docSearch])}};isc.B.push(isc.A.initWidget=function isc_SourceEditor_initWidget(){this.Super("initWidget",arguments);this.useRichEditor=this.useRichEditor&&isc.SyntaxHiliter&&isc.RichTextCanvas;this.sourceEditor=this.createAutoChild(this.useRichEditor?"richSourceEditor":"sourceEditorForm");this.sourceEditorToolbar=this.createAutoChild("sourceEditorToolbar");this.addMembers([this.sourceEditor,this.sourceEditorToolbar])}
,isc.A.setSource=function isc_SourceEditor_setSource(_1,_2){if(this.useRichEditor){if(_2){if(_2=="xml")this.syntaxHiliter=isc.XMLSyntaxHiliter.create();else if(_2=="js")this.syntaxHiliter=isc.JSSyntaxHiliter.create();else if(_2=="css")this.syntaxHiliter=isc.CSSSyntaxHiliter.create();else{this.logDebug("Can't find hiliter for type: "+_2);delete this.syntaxHiliter}}}
if(this.useRichEditor){this.sourceEditor.setSyntaxHiliter(this.syntaxHiliter);this.sourceEditor.setContents(_1)}else{this.sourceEditor.setValue("source",_1)}}
,isc.A.getSource=function isc_SourceEditor_getSource(){return this.useRichEditor?this.sourceEditor.getContents():this.sourceEditor.getValue("source")}
,isc.A.sourceChanged=function isc_SourceEditor_sourceChanged(){this.sourceEditorToolbar.revertButton.enable()}
,isc.A.tryClicked=function isc_SourceEditor_tryClicked(_1){this.creator.tryEditedCode()}
,isc.A.revertClicked=function isc_SourceEditor_revertClicked(_1){this.creator.revertEdit();this.sourceEditorToolbar.revertButton.disable()}
);isc.B._maxIndex=isc.C+6;isc.defineClass("ExampleViewPane","Canvas");isc.A=isc.ExampleViewPane.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.autoDraw=false;isc.A.children=[{autoChildName:"viewContainer",width:"100%",height:"100%"},{autoChildName:"sizer",zIndex:100,overflow:"hidden"}];isc.A.overflow="auto";isc.B.push(isc.A.childResized=function isc_ExampleViewPane_childResized(_1){this.Super("childResized",arguments);var _2=this.children;if(_2.length<2)return;_2[1].setRect(0,0,_2[0].getVisibleWidth(),_2[0].getVisibleHeight())}
);isc.B._maxIndex=isc.C+1;if(!isc.GrippySplitbar){isc.defineClass("GrippySplitbar","ImgSplitbar");isc.A=isc.GrippySplitbar.getPrototype();isc.A.imageWidth=7;isc.A.imageHeight=16;isc.A.vSrc="[ISO_DOCS_SKIN]/images/grips/vgrip.png";isc.A.hSrc="[ISO_DOCS_SKIN]/images/grips/hgrip.png"}
isc.defineClass("FeatureExplorer","HLayout");isc.A=isc.FeatureExplorer.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.creatorName="featureExplorer";isc.A.backgroundColor=isc.params.skin=="BlackOps"?"#000000":null;isc.A.layoutMargin=10;isc.A.leftPaneDefaults={_constructor:"VLayout",showResizeBar:true,width:246};isc.A.gridSearchDefaults={_constructor:"GridSearch",searchProperty:"title",hint:"Search examples...",autoParent:"leftPane"};isc.A.exampleTreeDefaults={_constructor:"TreeGrid",autoParent:"leftPane",showConnectors:true,cellPadding:0,showHeader:false,leaveScrollbarGap:false,selectionType:"single",animateFolders:!isc.Browser.isMobile,animateRowsMaxTime:200,recordClick:function(_1,_2){var _3=isc.addProperties({},_2);if(_3.showSkinSwitcher==null){var _4=_1.data.getParents(_2);for(var i=0;i<_4.length;i++){if(_4[i].showSkinSwitcher!=null){_3.showSkinSwitcher=_4[i].showSkinSwitcher;break}}}
_1.featureExplorer.showExample(_3)},bodyProperties:{scrollbarConstructor:"Scrollbar",scrollbarSize:16},scrollbarSize:16,nodeIcon:"[ISO_DOCS_SKIN]/images/explorerTree/gears.png",folderIcon:"[ISO_DOCS_SKIN]/images/explorerTree/folder.png"};isc.A.exampleDescriptionDefaults={_constructor:"Label",margin:5,height:92,overflow:"auto",canSelectText:true,valign:"top",styleName:"darkDescription"};isc.A.exampleSpacerDefaults={_constructor:"LayoutSpacer",height:6};isc.A.exampleViewerDefaults={_constructor:"ExampleViewer",autoShow:true};isc.A.rightPaneDefaults={_constructor:"Canvas"};isc.A.titlePageDefaults={_constructor:"VLayout",width:"100%",height:"100%",visibility:"hidden",overflow:"auto",titlePagePaneDefaults:{_constructor:"VStack",border:"2px solid rgb(129,141,185)",layoutMargin:5,layoutAlign:"center",width:"80%",titlePageHeaderDefaults:{_constructor:"Label",styleName:"explorerTitlePageTitle",backgroundImage:"[ISO_DOCS_SKIN]/images/titleGradient.gif",height:30,wrap:false},titlePageDescriptionDefaults:{_constructor:"Label",height:1,margin:2,valign:"top",overflow:"visible",styleName:"darkDescription",dynamicContents:true,canSelectText:true},folderListDefaults:{_constructor:"Label",styleName:"explorerFolderList",valign:"top",overflow:"visible",height:50,canSelectText:true},screenshotDefaults:{_constructor:"Img",layoutAlign:"center"},autoChildren:["titlePageHeader","titlePageDescription","folderList","screenshot"]},autoChildren:[{autoChildName:"topSpacer",_constructor:"LayoutSpacer",height:"35%"},"titlePagePane",{autoChildName:"bottomSpacer",_constructor:"LayoutSpacer",height:"65%"}]};isc.A.examplePageDefaults={_constructor:"SectionStack",visibility:"hidden",visibilityMode:"multiple",width:"100%",height:"100%"};isc.A.autoChildParentMap={titlePage:"rightPane",examplePage:"rightPane"};isc.A.autoChildren=["leftPane","gridSearch","exampleTree","rightPane","titlePage","examplePage"];isc.A.exampleChecks=[{flag:"needServer",message:"This example requires the ISC integration server.",test:function(){return window.location.href.startsWith("http")}},{flag:"needXHR",message:"This example requires the XMLHttpRequest object."+"  You'll need to enable ActiveX or, if you're running IE7"+" making sure the native XMLHttpRequest support is enabled is sufficient.",test:function(){return isc.RPCManager.xmlHttpRequestAvailable()}},{flag:"needXML",message:function(){if(isc.Browser.isSafari){return"This example requires a native XML parser, which is not supported in Safari."}
return"XML Processing in IE requires ActiveX.  Please enable ActiveX to see"+" this example"},test:function(){return isc.XMLTools.nativeXMLAvailable()}}];isc.A.initialExample="Welcome";isc.B.push(isc.A.initWidget=function isc_FeatureExplorer_initWidget(){this.Super("initWidget",arguments);this.addAutoChildren(this.autoChildren);this.exampleDescription=this.createAutoChild("exampleDescription",{height:92});this.exampleViewer=this.createAutoChild("exampleViewer");this.examplePage.addSection({ID:"section_exampleDescription",canCollapse:false,expanded:true,title:"&nbsp;",items:[this.exampleDescription]});this.examplePage.addSection({ID:"section_exampleViewer",canCollapse:false,expanded:true,showHeader:false,items:[this.exampleViewer]});this.gridSearch.setGrid(this.exampleTree);if(this.treeData)this.exampleTree.setData(this.treeData);isc.History.registerCallback({method:this.historyCallback,target:this});isc.Page.setEvent(isc.Page.isLoaded()?"idle":"load",this.getID()+".autoJumpToExample()",isc.Page.FIRE_ONCE)}
,isc.A.historyCallback=function isc_FeatureExplorer_historyCallback(_1,_2){this.jumpToExample(_1,true);this.noAutoJumpToExample=true}
,isc.A.autoJumpToExample=function isc_FeatureExplorer_autoJumpToExample(){if(!this.noAutoJumpToExample){this.jumpToExample(isc.History.getCurrentHistoryId()||this.initialExample,true)}}
,isc.A.jumpToExample=function isc_FeatureExplorer_jumpToExample(_1,_2){if(this.exampleViewer&&this.exampleViewer.fullScreenExampleWindow!=null&&this.exampleViewer.fullScreenExampleWindow.isDrawn()){this.exampleViewer.hideFullScreenExample()}
if(_1==null)_1=this.initialExample;_1=_1.replace(/\./g," ");_1=_1.replace(/\|/g,"_");var _3=this.exampleTree.data;var _4=_1.startsWith(_3.pathDelim)?_3.find(_1):_3.findById(_1);if(_4==null){this.logWarn("Can't find example for id: "+_1+" - defaulting to the welcome page");_4=_3.findById(this.initialExample);if(_4==null){_4=_3.find(this.initialExample)}}
var _5=isc.addProperties({},_4);if(_5.showSkinSwitcher==null){var _6=_3.getParents(_4);for(var i=0;i<_6.length;i++){if(_6[i].showSkinSwitcher!=null){_5.showSkinSwitcher=_6[i].showSkinSwitcher;break}}}
this.showExample(_5,_2);_3.openFolders(_3.getParents(_4));var _8=_3.indexOf(_4);var _9=this;isc.Timer.setTimeout(function(){_9.exampleTree.selection.deselectAll();_9.exampleTree.selectRecord(_8);_9.exampleTree.scrollRecordIntoView(_8)},0)}
,isc.A.formatFolderList=function isc_FeatureExplorer_formatFolderList(_1){var _2=this.exampleTree;var _3=_2.data;var _4=_3.getChildren(_1);if(!_4||_4.length==0)return isc.emptyString;var _5=isc.StringBuffer.create();_5.append("<table class='explorerFolderList' align='center' cellSpacing='5'>");var _6=[];var _7=Math.round(_4.length/ 2);var _8=0;var _9=_7;for(var i=0;i<_7;i++){var _11=_4[_8++];var _12=_4[_9++];this.$49j(_11,_5);_5.append("<td width=10>&nbsp;</td>");this.$49j(_12,_5);_5.append("</tr>")}
_5.append("</table>");return _5.toString()}
,isc.A.$49j=function isc_FeatureExplorer__htmlForCell(_1,_2){var _3=this.exampleTree;var _4=_3.data;if(!_1){_2.append("<td>&nbsp;</td>");return}
var _5=_4.isFolder(_1)?"[ISO_DOCS_SKIN]/images/explorerTree/folder_closed.png":"[ISO_DOCS_SKIN]/images/explorerTree/gears.png";_5=isc.Page.getURL(_5);_2.append("<td>",isc.Canvas.imgHTML(_5,16,16),"&nbsp;<a href='' onclick='",this.getID(),".jumpToExample(\"",this.genExampleId(_1),"\");return false;'>",_4.getTitle(_1),"</a></td>")}
,isc.A.genExampleId=function isc_FeatureExplorer_genExampleId(_1){var _2=this.exampleTree.data.getPath(_1),_3=_1.id!=null?_1.id:_1.ref!=null?_1.ref:_2;return _3.replace(/ /g,".")}
,isc.A.hideRightPane=function isc_FeatureExplorer_hideRightPane(){this.exampleTree.showResizeBar=false;this.rightPane.hide()}
,isc.A.clearState=function isc_FeatureExplorer_clearState(){delete this.currentExampleConfig}
,isc.A.showExample=function isc_FeatureExplorer_showExample(_1,_2){if(this.exampleTree.data.isFolder(_1))_1.titlePage="true";if(!_2)isc.History.addHistoryEntry(this.genExampleId(_1));this.currentExampleConfig=_1;if(_1.ref){var _3=this.exampleTree.data.findById(_1.ref);if(_3!=null){var _4=_1.description,_5=_1.title,_6=_1.requiresModules,_7=_1.ref;_3=this.exampleTree.data.getCleanNodeData(_3);isc.addProperties(_1,_3);if(_4)_1.description=_4;if(_5)_1.title=_5;if(_7)_1.ref=_7;if(_6)_1.requiresModules=_6}else{this.logWarn("Couldn't find example by id for ref: "+_1.ref)}
_1.ref=null}
if(_1.bestSkin!=null&&isc.currentSkin!=_1.bestSkin&&(_1.badSkins==null||_1.badSkins.contains(isc.currentSkin)))
{isc.warn("This example is best viewed in the "+_1.bestSkin+" skin.",this.getID()+".exampleViewer.setSkin('"+_1.bestSkin+"');");return}
if(_1.titlePage=="true"){this.examplePage.hide();var _8=this.titlePage.titlePagePane;_8.titlePageHeader.setContents(_1.title||_1.name);_8.titlePageDescription.setContents(_1.description);_8.folderList.setContents(this.formatFolderList(_1));if(_1.screenshot){_8.screenshot.setSrc(_1.screenshot);_8.screenshot.resizeTo(_1.screenshotWidth,_1.screenshotHeight);_8.screenshot.show()}else{_8.screenshot.hide()}
this.titlePage.show()}else{this.titlePage.hide();this.examplePage.show();this.examplePage.setSectionTitle("section_exampleDescription",_1.title||_1.name);if(this.descriptionHeight)this.exampleDescription.setHeight(this.descriptionHeight);var _9=[];for(var i=0;i<this.exampleChecks.length;i++){var _11=this.exampleChecks[i];var _12=_1[_11.flag];if(_12!=null&&!_11.test(_1)){var _13=_12;if(_13=="true")_13=_11.message;_13=isc.isA.Function(_13)?_13(_1):_13;_9.add(_13)}}
var _6=_1.requiresModules,_14=_6?_6.indexOf("SCServer")>=0:false,_15="",_16=isc.hasOptionalModules("SCServer"),_17=isc.licenseType=="Eval";var _18="",_19="",_20="";if(_6){var _21=_6.split(","),_22=/^\s+/,_23=/\s+$/;for(i=0;i<_21.length;i++){var _24=_21[i].replace(_22,"").replace(_23,""),_25=isc.getOptionalModule(_24),_26=isc.hasOptionalModule(_24);if(_25.isPro)continue;if(_24=="Calendar"||_24=="Drawing"){if(_26)continue}
if(_25.isFeature){if(_18.length>0)_18+=", ";_18+=_25.name}else{if(_19.length>0)_19+=", ";_19+=_25.name;if(!_26){if(_20.length>0)_20+=", ";_20+=_25.name}}}
var _27=_19.lastIndexOf(", ");if(_27>=0)_19=_19.substr(0,_27)+" and "+_19.substring(_27+2);_27=_18.lastIndexOf(", ");if(_27>=0)_18=_18.substr(0,_27)+" and "+_18.substring(_27+2);_27=_20.lastIndexOf(", ");if(_27>=0)_20=_20.substr(0,_27)+" and "+_20.substring(_27+2)}
var _28=((_14&&!_16)||(!_17&&_18.length>0));if(_28){_13="This example is disabled in this SDK because it requires ";if(_14&&!_16){_13+="<a href='"+isc.licensingPage+"' target=_blank>SmartClient Pro Edition</a>"}
if(!_17&&_18.length>0){if(_14&&!_16)_13+=" and ";_13+="the following features from SmartClient Power Edition: <a href='"+isc.licensingPage+"' target=_blank>"+_18+"</a>"}
_9.add(_13)}
if(_20.length>0){if(_28){_13="This example also "}else{_13="This example is disabled in this SDK because it "}
_9.add(_13+"requires the "+" following optional SmartClient components: <a href='"+isc.licensingPage+"' target=_blank>"+_20+"</a>")}
if(_9.length>0){_9.add("<p>Click <a target=_blank href='http://www.smartclient.com/#"+isc.History.getCurrentHistoryId()+"'>here</a> to see this example on smartclient.com.")}
var _29=isc.StringBuffer.create();if(_9.length>0){this.exampleViewer.hide();_29.append("<div class='explorerCheckErrorMessage'>");for(var i=0;i<_9.length;i++){_29.append(_9[i],"<BR><BR>")}
_29.append("</div>");_29.append(_1.description);this.exampleDescription.setContents(_29.toString());this.exampleDescription.setHeight("*");return}
_29.append(_1.description);this.exampleDescription.setContents(_29.toString());if(_1.url||_1.jsURL||_1.xmlURL){this.exampleViewer.loadExample(_1);this.exampleDescription.setHeight(_1.descriptionHeight||92);this.exampleDescription.setVAlign("center")}else{this.exampleViewer.hide();this.exampleDescription.setHeight("*")}}}
);isc.B._maxIndex=isc.C+10;isc.defineClass("ExampleTree","Tree");isc.A=isc.ExampleTree.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.nameProperty="title";isc.A.pathDelim="_";isc.B.push(isc.A.init=function isc_ExampleTree_init(){this.Super("init",arguments);var _1=this.getDescendants(this.root);var _2={};for(var i=0;i<_1.length;i++){var _4=_1[i];if(_4.requiresModules){if(!isc.hasOptionalModules(_4.requiresModules));_4.missingModules=isc.getMissingModules(_4.requiresModules).getProperty("name").join(", ")}
if(_4.title.contains(".")||_4.title.contains("_")){this.logWarn("Node title: "+_4.title+" contains invalid char '.' or '_'")}
if(_4.id&&(_4.id.contains(".")||_4.id.contains("_"))){this.logWarn("Node id: "+_4.id+" (titled: "+_4.title+") contains invalid char '.' or '_'")}
if(_4.id&&_2[_4.id]){this.logWarn("Duplicate id detected on node titled: "+_4.title+" id: "+_4.id+" conflicts with previously encountered node titled: "+_2[_4.id])}else if(_4.id){_2[_4.id]=_4.title}
if(_4.visibility&&_4.visibility!=this.nodeVisibility){this.remove(_4,true);continue}
if(!_4.ref)continue;var _5=this.findById(_4.ref);if(!_5){this.logWarn("The node titled '"+this.getTitle(_4)+"' references a non-existant id: "+_4.ref)}
if(!this.isFolder(_5))continue;var _6=this.getChildren(_5);if(!_6||!_6.length)continue;var _7=this.getCleanNodeData(_6,true,true);if(!this.isFolder(_4))this.convertToFolder(_4);this.addList(_7,_4);delete _4.ref;if(!_4.description)_4.description=_5.description}}
);isc.B._maxIndex=isc.C+1;isc.defineClass("ExplorerShell","VLayout");isc.A=isc.ExplorerShell.getPrototype();isc.A.layoutTopMargin=5;isc.A.layoutLeftMargin=10;isc.A.layoutRightMargin=10;isc.A.layoutBottomMargin=5;isc.A.membersMargin=5;isc.A.headerDefaults={_constructor:"Canvas",height:45,contents:isc.Canvas.imgHTML("[ISO_DOCS_SKIN]/images/featureExplorer_title.gif")};isc.A.footerDefaults={_constructor:"Label",height:15,overflow:"hidden",align:"right",contents:"<span style='color:#E0E0E0'>&copy;2000-2005 Isomorphic Software, Inc.</span>"};isc.A.featureExplorerDefaults={_constructor:"FeatureExplorer"};isc.A.autoChildren=["header","featureExplorer","footer"];isc.Page.setAppImgDir(isc.Page.getIsomorphicDocsDir()+"exampleImages/");isc.defineClass("GridSearch","DynamicForm");isc.A=isc.GridSearch.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.browserSpellCheck=false;isc.A.height=20;isc.A.numCols=2;isc.A.colWidths=[46,"*"];isc.A.titleSuffix=":&nbsp;";isc.A.cellPadding=0;isc.A.showSearchTitle=false;isc.A.wrapItemTitles=false;isc.A.selectOnFocus=true;isc.A.hint="Find...";isc.A.searchTitle="<span style='color:#FFFFFF'>Search</span>";isc.B.push(isc.A.initWidget=function isc_GridSearch_initWidget(){this.items=[isc.addProperties({name:"search",width:"*",colSpan:"*",showTitle:this.showSearchTitle,selectOnFocus:true,title:this.searchTitle,showHintInField:true,hint:this.hint,changed:"form.findNode()",keyPress:function(_1,_2,_3){if(_3=="Enter")_2.findNode();if(_3=="Escape"){_2.revertState();return false}}},this.searchItemProperties)];this.Super("initWidget",arguments);if(this.grid)this.setGrid(this.grid)}
,isc.A.setGrid=function isc_GridSearch_setGrid(_1){this.grid=_1;this.defaultSearchProperty();if(isc.isA.TreeGrid(_1)){if(_1.$84w)_1.getNodeTitle=_1.$84w;_1.$84w=_1.getNodeTitle;_1.getNodeTitle=function(_5,_6,_7){var _2=_1.$84w(_5,_6,_7);if(_5.$826){var _3,_4;if(_2.match(/<.*>/)){_4=new RegExp("(^|>)([^<]*?)("+_5.$826+")","ig");_3=_2.replace(_4,"$1$2<span style='background-color:#00B2FA;'>$3</span>")}else{_4=new RegExp("("+_5.$826+")","ig");_3=_2.replace(_4,"<span style='background-color:#00B2FA;'>$1</span>")}
_2=_3}
return _2}}else{if(_1.$84x)_1.formatCellValue=_1.$84x;_1.formatCellValue=function(_2,_5,_6,_7){if(_1.$84x){_2=_1.$84x(_2,_5,_6,_7)}
if(_2!=null&&_5.$826){var _3,_4;if(_2.match(/<.*>/)){_4=new RegExp("(^|>)([^<]*?)("+_5.$826+")","ig");_3=_2.replace(_4,"$1$2<span style='background-color:#FF0000;'>$3</span>")}else{_4=new RegExp("("+_5.$826+")","ig");_3=_2.replace(_4,"<span style='background-color:#FF0000;'>$1</span>")}
_2=_3}
return _2}}}
,isc.A.defaultSearchProperty=function isc_GridSearch_defaultSearchProperty(){if(!this.searchProperty&&this.grid){if(isc.isA.TreeGrid(this.grid)){this.searchProperty=this.grid.getTitleField()}else{this.searchProperty=this.grid.getFieldName(0)}}}
,isc.A.revertState=function isc_GridSearch_revertState(){var _1=this.grid;if(this.$49d){delete this.$49d.$826;_1.refreshRow(_1.getRecordIndex(this.$49d))}
this.$49c=this.$49d=null;if(this.$827){for(var i=0;i<this.$827.length;i++)_1.data.closeFolder(this.$827[i])}
this.$827=null;this.clearValue("search")}
,isc.A.findNode=function isc_GridSearch_findNode(){if(!this.grid||!this.grid.getData())return;var _1=this.getValue("search");if(_1==null){this.revertState();return}
_1=_1.toLowerCase();var _2=this.$49c==_1&&this.$49d;this.$49c=_1;var _3=this.grid;var _4=isc.isA.TreeGrid(_3)?_3.data.getAllNodes():_3.getData();var _5=this.$49d?_4.indexOf(this.$49d):0;if(_2)_5++;if(this.$49d){delete this.$49d.$826;_3.refreshRow(_3.getRecordIndex(this.$49d));this.$49d=null}
var _6=this.findNext(_4,_5,_1);if(!_6)_6=this.findNext(_4,0,_1);if(_6){this.$49d=_6;_6.$826=_1;if(this.$827){for(var i=0;i<this.$827.length;i++)_3.data.closeFolder(this.$827[i])}
this.$827=null;if(isc.isA.TreeGrid(_3)){var _8=_3.data.getParents(_6);this.$827=[];for(var i=0;i<_8.length;i++){var _9=_8[i];if(!_3.data.isOpen(_9)){this.$827.add(_9);_3.data.openFolder(_9)}}
if(_3.data.isFolder(_6)&&!_3.data.isOpen(_6)){_3.data.openFolder(_6);this.$827.add(_6)}}
var _10=_3.getRecordIndex(_6);_3.refreshRow(_10)
_3.scrollRecordIntoView(_10)}}
,isc.A.findNext=function isc_GridSearch_findNext(_1,_2,_3){for(var i=_2;i<_1.getLength();i++){var _5=_1.get(i);if(_5[this.searchProperty]&&_5[this.searchProperty].toLowerCase().contains(_3)){return _5}}}
);isc.B._maxIndex=isc.C+6;isc._moduleEnd=isc._ExampleViewer_end=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc.Log&&isc.Log.logIsInfoEnabled('loadTime'))isc.Log.logInfo('ExampleViewer module init time: ' + (isc._moduleEnd-isc._moduleStart) + 'ms','loadTime');delete isc.definingFramework;}else{if(window.isc && isc.Log && isc.Log.logWarn)isc.Log.logWarn("Duplicate load of module 'ExampleViewer'.");}

/*

  SmartClient Ajax RIA system
  Version v8.2p_2012-04-25/LGPL Development Only (2012-04-25)

  Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF
     ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file
     without an accompanying Isomorphic Software license file, please
     contact licensing@isomorphic.com for details. Unauthorized copying and
     use of this software is a violation of international copyright law.

  DEVELOPMENT ONLY - DO NOT DEPLOY
     This software is provided for evaluation, training, and development
     purposes only. It may include supplementary components that are not
     licensed for deployment. The separate DEPLOY package for this release
     contains SmartClient components that are licensed for deployment.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. You are expressly prohibited
     from attempting to reverse engineer this software or modify this
     software for human readability.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

