/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx) {

var tabs = document.querySelector(".tabs");
var tab = document.querySelector(".tab");
var main = document.querySelector("#main");
var actTab = document.querySelector(".active");
var prvTab = prevTab = undefined;
var listtab = document.querySelectorAll(".active");
function shrinkView(e,ui,id){
		 
}

function createnewtab (id,name,url,data) {

		 var path = (navigator.onLine) ?  url : data;
		 console.log(data," path ",path,"  ",url);
		 var id = Math.random().toString();
		 id = id.replace(".","");
		 var tclose 					= 	tab.querySelector(".tabclose");
		 console.log(tclose," tclose ");
/* 		 tclose.style.display			=	"inline-block"; */
		 tclose.addEventListener("click",closeTab);
		 tab.addEventListener("click",showTab);
		 var newTab 					=   tab.cloneNode(true);
		 var close						=   newTab.querySelector(".tabclose");
		 close.style.display			=	"inline-block";
		 actTab.className				=	"tab";	
		 newTab.children[1].innerHTML	=	name;
		 newTab.id  					=   "bt"+id;
		 prvTab							= 	newTab;
		 newTab.addEventListener("click",showTab);
		 tabs.appendChild(newTab);

		previewWeb 		     			= webview.cloneNode();
		previewWeb.addEventListener('permissionrequest', function(e) {
		  if (e.permission === 'download') {
		    e.request.allow();
		  }
		});
		
		previewWeb.id  		 			= "bt"+id+"previewWeb";
		previewWeb.setAttribute("style","");
		previewWeb.className 			= "previewWebView transAll";
		previewWeb.setAttribute("src", path);
		previewWeb.addEventListener("loadstart", changeTitle); 
		// previewWeb.addEventListener("loadstop", changeTitle); 
		console.log(previewWeb," view ",path);
		main.appendChild(previewWeb);
}

function  showTab(e) {
			console.log(e , " :: ",e.target);
			if(e.target.className == "tabclose"){
				closeTab(e,this);
			}
			var currWeb = document.querySelector("#"+this.id+"previewWeb");
			var webId   = (currWeb === null) ? "" : currWeb.id;
			var mWeb =  (prevTab) ? document.querySelector("#"+prevTab.id+"previewWeb") : previewWeb;
			var views = document.querySelectorAll("webview");
			if(currWeb != null){
				console.log(this.id," c55 urrWeb ",currWeb);
				for (var i = views.length - 1; i >= 1; i--) {
					console.log(views[i].id , " CSK :: ",currWeb.id);
					if(views[i].id == currWeb.id){
						changeView(currWeb,"99.9%","99.9%");
					}else{
						changeView(views[i],"0.1%","0.1%");	
					}
				};
			}else{
				// console.log(currWeb,"currWeb ",views[i]);
				for (var i = views.length - 1; i >= 1; i--) {
					changeView(views[i],"0.1%","0.1%");
				};
				var web = document.querySelector(".docsonline")
				if(navigator.onLine){
					changeView(web,"99.9%","99.9%");
				}
			}
				
			if(prevTab !== undefined){
				if(prevTab.className.indexOf("active") >= 0){
					prevTab.className    = "tab";	
				}
			}

			prevTab 				=  this;
			prvTab.className		= "tab";	
			if(prvTab.className.indexOf("active") >= 0){
				prvTab.className    = "tab";	
			}
	 		this.className  		= this.className+" active";
	 	
}

function closeTab (e) {
			var ctab = e.target.parentElement;
			var cweb = document.querySelector("#"+ctab.id+"previewWeb");
			setTimeout(function(){
				cweb.remove();
				ctab.remove();
				var gg= document.querySelector(".tabs");
				gg.children[gg.children.length-1].click();
			},50)

}

function changeView (el,w,h) {
	 	 el.style.width= w;
		 el.style.height= h;
}

function changeTitle (e) {
		setTimeout(function(){
			 webview.executeScript({ code: "document.title=document.title.toString();" },function(e,gg){  //No I18N
            var e = e[0];
           	console.log("topic here is ",e," GG ",gg);
            });  
		},2000)
		
}
ctx.EUtil.topic.register(ctx.EUtil.Listeners, "fileItemClick" , shrinkView  ,"e","ui","id"); //No I18N
ctx.EUtil.topic.register(ctx.EUtil.Listeners, "createnewtab" ,  createnewtab,"id","name","url","data"); //No I18N

})(this);

