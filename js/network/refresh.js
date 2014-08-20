/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx) {

	
	function onlineNotify () {
			 webview.reload();
	}

	function offlineNotify () {
			 hideWebView();
	}

	
	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "online", onlineNotify);//No I18N
	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "offline", offlineNotify);	//No I18N

})(this);

