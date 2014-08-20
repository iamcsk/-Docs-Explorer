/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx) {


	function loadinfo() {
			notifyNetState();
	}

	function netNotify (state,msg) {
	    var onlinenotify = webkitNotifications.createNotification("net_state_notify",state,msg,setTimeout(function(){onlinenotify.show();setTimeout(function(){
        if(onlinenotify !== undefined)
              {
                  if(onlinenotify.close == undefined){
                      onlinenotify.cancel()
                  }else{
                      onlinenotify.close();
                  }
                  
                  
              }
        },5000)},1000)); //No I18N
	}

	function onlineNotify () {
			 webview.reload();
			 netNotify("Online","Now , You are connected to Internet");	//No I18N
	}

	function offlineNotify () {
			 netNotify("Offline","Network disconnected. You are now offline thought you can view files"); //No I18N
	}

	function notifyNetState () {
	         if (navigator.onLine) {
	            onlineNotify();
	         }else{
	            offlineNotify ();
	         }   
	}

	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "load", loadinfo);//No I18N
	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "online", onlineNotify);//No I18N
	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "offline", offlineNotify);	//No I18N

})(this);

