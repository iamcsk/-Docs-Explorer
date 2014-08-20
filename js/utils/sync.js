/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx) {
	var burl;
	function getFilesList (zdfiles,pid) {
//			console.log("getting FILES list ",pid)
			if(pid == 0){
	        	if(navigator.onLine) getOnlineFiles(zdocs.credentials.token,pid);              
	        	else getZDLocalfiles();
	        }
	}

	function getZDLocalfiles () {
			chrome.storage.local.get("zdocs" , function(zdfiles){
				zdocs.files  = JSON.parse(zdfiles.zdocs).FILES;
				ctx.EUtil.topic.publish(ctx.EUtil.Listeners, "getZDLocalfiles" , {"zdocs":zdocs.files}); //No I18N
			});	
  		
	}

	function getOnlineFiles(token,pid) {

				zdocs.credentials.logged = true;
				requestData("GET",zdocs.credentials.URL+"files/v1/files?SCOPE="+zdocs.credentials.zdscope+"&authtoken="+token,0);//No I18N
	}


	function storelocal (zdfiles,pid) {
//		  console.log("in court ",pid);
			if(pid == 0){
				zdocs[burl] = zdfiles;
				 chrome.storage.local.set({"zdocs": zdocs[burl]}, function() {   //No I18N
				 	getZDLocalfiles();
	  			 });	
			}
	}

	function synUpdateFiles () {
			chrome.storage.local.set({zdocs: zdocs.files}, function() {   //No I18N
				getZDLocalfiles();
  			 });
	}

	function setBaseURL(){

			 burl =  zdocs.credentials.uname+"zdocs";//No I18N
	}

	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "onauthsuccess",setBaseURL,"token","pid");	 //No I18N
	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "onauthsuccess",getFilesList,"token","pid");	 //No I18N
	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "zdrequest",storelocal,"response","pid");	 //No I18N

})(this);