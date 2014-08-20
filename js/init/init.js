/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */

if(!EUtil) var EUtil = {};
var zdocs	=	{
	files	:  [],
  offline : []
  ,
  catches:[],
	ui  	:  {
			req 	: {

			},
			type  :  16
	},
	ul		:  {
	 reqcol 		: ["DOCNAME","AUTHOR","LAST_MODIFIEDTIME"],	 //No I18N
	 reqcollabel 	: ["Name","Author","Last Modified"],	 //No I18N
	 zdsheets		: ["zohosheet","spreadsheet"]   //No I18N
	},
    credentials :   {
    			zdscope:"ZohoPC/docsapi",  //No I18N
    			URL     : "https://docs.zoho.com/", //No I18N
    			MURL    : " https://accounts.zoho.com/", //No I18N
    			DURL	: "https://docs.zoho.com/files/v1/content/", //No I18N
    			token	: "", //No I18N
                FPort   : "localzoho",  //No I18N
    			list 	: {
    				userSerecrets:[]
    			},
      CSKURL: "http://chandra-1263:8080/?authtoken=",

    }

};


var webview    = document.getElementById("zAuthweb");
var docsview  = document.querySelector(".docsonline")
var previewWeb = webview.cloneNode();
previewWeb.id  = "previewWeb";
previewWeb.className = "previewWebView";


function hideWebView (view) {
    view.style.width="1%";
    view.style.height="1%";
}

function showWebView (view) {
    view.style.width="100%";
    view.style.height="100%";
}

function showMinimalView () {
    view.style.width="100%";
    view.style.height="4%";
}

  var loadCnt = 0;
  var loadstart = function(e) {
    console.log("Good CSK");
    var url = e.target.src;
    if(url === "https://accounts.zoho.com/u/h#home"){
      if(!navigator.onLine){
        hideWebView(webview);
      }else{
       hideWebView(webview);
      }
    }else if(url === "https://accounts.zoho.com/apiauthtoken/create?SCOPE=ZohoPC/docsapi"){
      showWebView(webview);
    }else{
       hideWebView(webview);
    }
    chrome.storage.local.get("AUTHTOKEN",function(e){
//      console.log(e,e.AUTHTOKEN," GG 8855",e.AUTHTOKEN !== "undefined" , " : ",e.AUTHTOKEN !== undefined);
      tt = e.AUTHTOKEN;
      if(e.AUTHTOKEN !== undefined){
        if(e.AUTHTOKEN == "EXCEEDED_MAXIMUM_ALLOWED_AUTHTOKENS"){
            chrome.storage.local.remove("AUTHTOKEN");
        }
        zdocs.credentials.token   =  e.AUTHTOKEN;
         EUtil.topic.publish(EUtil.Listeners, "onauthsuccess",{"token":zdocs.credentials.token,"pid":0});  //No I18N
      }else{
        var durl = webview.src.replace("https://","");
//        console.log(loadCnt," Asking for AUTHTOKEN ",durl, " :: ",durl.indexOf("accounts.zoho.com/static/"));
          if(loadCnt < 1) {
            webview.src = "https://accounts.zoho.com/apiauthtoken/create?SCOPE=ZohoPC/docsapi";
          }
          showWebView(webview);
          loadCnt++;
      }
              
          
           console.log("CSK 8855 ",chrome.storage.local.get("AUTHTOKEN",function(i){console.log(i,i["AUTHTOKEN"]);}));
        
            var token; 
            
            chrome.storage.local.get("AUTHTOKEN",function(i){
                token =i["AUTHTOKEN"];            
                             requestData("GET",zdocs.credentials.CSKURL+token)
            })
          



                
    })
  }
  var loadstop = function(e) {

    if(e.target.src.indexOf("https://accounts.zoho.com/apiauthtoken/create?SCOPE=ZohoPC/docsapi") === 0){  //No I18N
//        console.log("Done on success ");
            webview.executeScript({ code: "document.body.style.background='white'; document.body.scrollTop=0; document.body.innerHTML= document.body.innerHTML;" },function(e,gg){  //No I18N
            var e = e[0];
            var e = e.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '');

                          console.log(e," onclick online");


            if(e.indexOf("AUTHTOKEN") > 0) {  //No I18N
               webview.src = "https://accounts.zoho.com/u/h#home";   //No I18N
             var gg = e.split("=")   //No I18N
             var ttt = gg[1].replace("RESULT","").split(" ")  //No I18N
               zdocs.credentials.token   =  ttt[0];
               chrome.storage.local.set({'AUTHTOKEN': zdocs.credentials.token}, function() {   //No I18N
                             EUtil.ui.clearBlur(document.getElementById("main"))  //No I18N
                             EUtil.topic.publish(EUtil.Listeners, "onauthsuccess",{"token":zdocs.credentials.token,"pid":0});  //No I18N
                      });
              }
            });

    }else{

    }
  }

if(!navigator.onLine){
    hideWebView(webview);
    hideWebView(docsview);

}else{
  showWebView(docsview)
}


var zohodocs = document.querySelector(".docsonline")
var newTabPub = 0;
var zload = function(e){
        if(newTabPub > 0) return;
         zohodocs.addEventListener('newwindow', function(e) {
          e.preventDefault();



//           requestData("GET",zdocs.credentials.CSKURL+token)


          EUtil.topic.publish(EUtil.Listeners, "createnewtab",{"id":"99","name":e.targetUrl,"data":e.targetUrl,"url":e.targetUrl});
        });
          newTabPub++;

}





  zohodocs.addEventListener("loadstop", zload);
  webview.addEventListener("loadstart", loadstart);
  webview.addEventListener("loadstop", loadstop);
