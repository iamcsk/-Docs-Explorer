/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx) {
	var zdfiles	=	null;	
    var flister =   null;
	var Populate	=	{
                    init        :   function(){
                    },
					ZDFilesList	: 	function(zdfiles){
								console.log("main ZDFilesList call");

									   zdocs.currFiles = zdfiles;
									flister =    document.querySelector("#listfiles"); //No I18N
									for(var i=0; i< zdfiles.length; i++){
										var flrow   =   zdocs.ui.req.filerow.cloneNode();
										var cimg  =    zdocs.ui.req.icon.cloneNode();
										cimg.className 			=   "listimg "+Populate.getFileType(zdfiles[i].FILETYPE)+" cimgprop";
										var url 				= 	"images/icons/"+zdocs.ui.type+"/"+Populate.getFileType(zdfiles[i].FILETYPE)+".png";
										// console.log(Populate.getContentType(zdfiles[i].FILETYPE)," file Type");
										flrow.appendChild(cimg)
                                        flrow.className=   "fitem row"; //No I18N
										for(var j=0; j<zdocs.ul.reqcol.length; j++){
											if(!zdfiles[i]) return false;
										    var clable  =   zdocs.ui.req.fileicellItem.cloneNode();
										    zdfiles[i].CTYPE  =  Populate.getContentType(zdfiles[i].FILETYPE);
										    zdfiles[i].DPATH  =  Populate.getDownloadURL(zdfiles[i].DOCID);
										    zdfiles[i].LPATH  =  (typeof zdfiles[i].LPATH == "undefined") ? Populate.getViewerURL(zdfiles[i].FILETYPE,zdfiles[i].DOCID) : zdfiles[i].LPATH;
										    zdfiles[i].HPATH  =  Populate.getHTMLViewerURL(zdfiles[i].FILETYPE,zdfiles[i].DOCID);
										    clable.innerHTML    =   (zdfiles[i][zdocs.ul.reqcol[j]] == zdocs.credentials.uname) ? "me" : zdfiles[i][zdocs.ul.reqcol[j]];
										    clable.className    =   "filedetail"+j; //No I18N
										    flrow.id 			=	i;
										    flrow.style.right 	=   -i+"px"; //No I18N
										    flrow.addEventListener("click",clickPublisher); //No I18N
										    flrow.appendChild(clable)
										}
										flister.appendChild(flrow);

										webkitRequestAnimationFrame(function(fl,fr){
											fr.style.right = "0px";                                   //No I18N
										}.bind(this,flister,flrow))	
									}
                                    Populate.scrollBinder();
					},
					getHTMLPath         : function(type){
											return (type == "zohosheet" || type == "spreadsheet") ? "sheet" :  (type == "writer" || type == "zwriter") ? "writer" : (type == "zohoshow" || type == "zshow") ? "application/vnd.ms-powerpoint" : (type == "image" || type == "picture" || type == "audio" || "video") ? type : "file";//No I18N
					},
					getFileType         : function(type){
											return (type == "zohosheet" || type == "spreadsheet") ? "sheet" :  (type == "writer" || type == "zwriter") ? "writer" : (type == "zohoshow" || type == "zshow") ? "application/vnd.ms-powerpoint" : (type == "image" || type == "picture" || type == "audio" || "video") ? type : "file";//No I18N
					},
					getContentType		: function(type){
						//application/vnd.ms-excel "application/zip" 
											return (type == "zohosheet" || type == "spreadsheet") ? "application/vnd.ms-excel" :  (type == "writer" || type == "zwriter") ? "application/msword" : (type == "zohoshow" || type == "zshow") ? "show" : (type == "image" || type == "picture" || type == "audio" || "video") ? type : "application/octet-stream";//No I18N
					}
					,
					getViewerURL 		: function(type,id){
										   var otype = (type == "zohosheet" || type == "spreadsheet") ? "sheet/ropen.do?rid=" : (type == "video" || type == "audio" || type == "image") ? "file/" : (type == "writer" || type == "zwriter") ? "writer/ropen.do?rid=" : (type == "zohoshow" || type == "zshow") ? "show/ropen.do?rid=" : "file/"; //No I18N
											var url = zdocs.credentials.URL+otype+id; //No I18N
											return url;
					},
					getHTMLViewerURL 		: function(type,id){
										   var otype = (type == "zohosheet" || type == "spreadsheet") ? "sheet/riphone.do?rid=" : (type == "video" || type == "audio" || type == "image") ? "file/" : (type == "writer" || type == "zwriter") ? "writer/documentView.do?DOCUMENT_ID=" : (type == "zohoshow" || type == "zshow") ? "show/documentoperation.do?rid=" : "file/"; //No I18N
											var url = zdocs.credentials.URL+otype+id; //No I18N
											return url;
					},	
					getDownloadURL		: function(id){
										   return zdocs.credentials.DURL+id+"?authtoken="+zdocs.credentials.token+"&scope="+zdocs.credentials.zdscope; //No I18N
					},
                    scrollBinder        :  function(){
                        flister.addEventListener("scroll", Populate.scrollPublisher); //No I18N
                    },
                    scrollPublisher     : function(){
                        ctx.EUtil.topic.publish(ctx.EUtil.Listeners, "eplMainScroll" , {"top":this.scrollTop,"left":this.scrollLeft}); //No I18N
                    }
	}

	function clickPublisher (e) {
			  ctx.EUtil.topic.publish(ctx.EUtil.Listeners, "fileItemClick" , {"e":e,"ui":this,"id":this.id}); //No I18N
	}

	function online () {
		console.log("You are online"); //No I18N
	}
	function offline () {
			console.log("You are offline"); //No I18N
	}

	// ctx.Util.topic.register(ctx.Util.Listeners, "onauthsuccess","token");	 //No I18N
	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "online", online); //No I18N
	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "offline", offline); //No I18N
	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "getZDLocalfiles" , Populate.ZDFilesList ,"zdocs"); //No I18N
    ctx.EUtil.topic.register(ctx.EUtil.Listeners, "uiload", Populate.init); //No I18N

})(this);