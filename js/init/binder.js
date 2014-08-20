/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx, undefined){

	window.addEventListener("load", function() {
        EUtil.topic.publish(EUtil.Listeners, "load");	 //No I18N
	})

	function online () {
        EUtil.topic.publish(EUtil.Listeners, "online");	 //No I18N
	}
	function offline () {
        EUtil.topic.publish(EUtil.Listeners, "offline");	 //No I18N
	}

	function uiload () {
			console.log(EUtil,"HERE ,",EUtil.topic);
        EUtil.topic.publish(EUtil.Listeners, "uiload");	 //No I18N
	}

    EUtil.addEv  = function(selector,mtype , method) {
					selector.addEventListener(mtype,method);
	}

	function getFiles () {
		console.log("calling ");
		requestData("GET",zdocs.credentials.URL+"files/v1/files?SCOPE="+zdocs.credentials.zdscope+"&authtoken="+zdocs.credentials.token,1); //No I18N
	}
	function loadBinder () {
			console.log("kk ",document.querySelector("#all")); //No I18N
			var ffilter = document.querySelectorAll(".zhlist > div"); //No I18N
			var reload = document.querySelector("#reload"); //No I18N
			binds(ffilter,filertFiles);
            binds(ffilter,highlightCap);
			binds([reload],getFiles);
			titleBinder();
	}

	function binds (ffilter,jukeMethod) {
			for (var i = ffilter.length - 1; i >= 0; i--) {
                EUtil.addEv(ffilter[i],"click",jukeMethod.bind(this,ffilter[i]));
			};
	}

    function highlightCap(ui){
             var catCap               = document.querySelector(".selectedCat");
             catCap.className         = "tabCap unselectCat";
             if(ui.className.indexOf("selectedCat") === -1){
                 ui.className = "tabCap selectedCat";
             }
    }

	function filertFiles (ui) {
				var files = EUtil.getFiles(ui.id);
				var  explorer = document.querySelector("#listfiles"); //No I18N
				explorer.innerHTML="";
				ctx.EUtil.topic.publish(ctx.EUtil.Listeners, "getZDLocalfiles" , {"zdocs":files}); //No I18N
	}	

	function	closewin(){
				console.log("going to close window");
			 	chrome.app.window.current().close()
	}

	function titleBinder () {
			 document.querySelector(".wclose").addEventListener("click",function(){chrome.app.window.current().close()}); //No I18N
			 document.querySelector(".wmin").addEventListener("click",function(){chrome.app.window.current().minimize()}); //No I18N
			 document.querySelector(".wmax").addEventListener("click",function(){chrome.app.window.current().maximize()}); //No I18N
			 document.querySelector("#uiuid").addEventListener("click",function(){EUtil.ui.signOut()}); //No I18N
	}



  	/*
        offline  and offline switch 
        Pulling the ethernet cable Chrome and Safari seem to trigger it well
    */

    ctx.addEventListener("online", online, false); //No I18N
    ctx.addEventListener("offline", offline, false); //No I18N

    EUtil.topic.register(EUtil.Listeners, "load",loadBinder);	 //No I18N
    ctx.addEventListener("DOMContentLoaded",uiload , false); //No I18N

})(this);