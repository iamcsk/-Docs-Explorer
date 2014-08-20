/*$Id$*/
/**
* User: chandra-1263
* Date: 29/09/13
* Time: 2:20 PM
*/
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
var filer = new Filer();
filer.init({persistent: true,size: (1024 * 1024) * 10}, onInit.bind(filer), onError);

function onInit(fs) {
    filer.ls('/', function(entries) {
    }, onError);
}

function onError(e) {
    console.log("error has been ",e);

}

(function(ctx) {
	  var doc = {
	  		name:"",
	  		id:"",
	  		data:"",
        lid:"",   // local element ID
        lpath : ""  
	  }
	 var docname , docid;
	 function handleFiles (e,ui,type) {
        doc.selectType = ui.className;
        doc.lid  =  ui.id;
    	 	var path = (typeof  zdocs.currFiles[ui.id].DPATH != "undefined") ? zdocs.currFiles[ui.id].DPATH : "";//No I18N
        if(e.target.className.indexOf("filedetail0") < 0) return;  //No I18N
        doc.lpath = (typeof  zdocs.currFiles[ui.id].LPATH != "undefined") ? zdocs.currFiles[ui.id].LPATH : "";//No I18N
        doc.fpath = zdocs.credentials.URL+zdocs.credentials.uname+"/"+doc.name;
        doc.name = zdocs.currFiles[ui.id].DOCNAME;
        doc.id   = zdocs.currFiles[ui.id].DOCID;
        doc.ext   = zdocs.currFiles[ui.id].FILE_EXTN;
        CTYPE   = zdocs.currFiles[ui.id].CTYPE;
        doc.filepath = doc.name+"."+doc.ext
        doc.dirname =  zdocs.credentials.FPort+zdocs.credentials.uname;

         if(false) {
         // if(navigator.onLine) {
             doc.data = requestData("POST",path,5,"blob");//No I18N
         }
        else{
              var name = doc.id;
              console.log("Files name ",name);
                 filer.open(name,function(i){   var r = new FileReader();r.onload = (function(f) {

                   return function(e) {
                       var contents = e.target.result;
                       console.log(type," CTYPE ",CTYPE);
                       var blob = new Blob([contents], {type: CTYPE});//No I18N
                       var FileURL = URL.createObjectURL(blob);
                         ctx.EUtil.topic.publish(ctx.EUtil.Listeners, "createnewtab",{"id":doc.lid,"name":doc.name,"data":contents,"url":FileURL}); //No I18N
                       zdocs.currFiles[doc.lid]["FileURL"] =   FileURL;                //No I18N
                        console.log("path ", FileURL);
                        
                   };
               })(i);
                   r.readAsDataURL(i);})
            }


            for(var x in offlineslist){
              console.log(x , offlineslist[x].split(":")[0])
              if(doc.id === offlineslist[x].split(":")[0]){
                console.log("Here ",offlineslist[x].split(":")[1]);
              }
            }

            console.log("Document Id ",doc.id);
          chrome.app.window.create("browse.html", { //No I18N
             frame: 'chrome',  bounds: { //No I18N
                                width:screen.width,
                                height:screen.height
                        },  
                        minWidth:900, 
                        maxWidth: screen.width,
                        minHeight:600, 
                        maxHeight: screen.height,
                        id:path,  //No I18N
          },function(created_window) { 
                 created_window.contentWindow.docoffline = offlines[doc.lid];
                // console.log(created_window, "CSK8855 ",created_window.contentWindow.docoffline);
             created_window.contentWindow.onload = function (i,j,k) {

                }
              } );

		}

		function fileStoreReq(resp, pid,ctype){
			if(pid == 5){
                doc.ctype = ctype;
				        doc.data = resp;
                doc.fpath = zdocs.credentials.URL+zdocs.credentials.uname+"/"+doc.name;
                var dname = doc.dirname;
                var hasDir = false;


                // Change current dir path to root directory path
                if(filer.cwd.fullPath.indexOf(dname) > 0 && filer.cwd.fullPath == "/"+dname){
                    hasDir = true;
                }else{
                    hasDir = false;
                    filer.mkdir(dname,false,function(e){console.log("succ",e);},function(e){console.log("Error",e);});
                }
                // file local url
                var furl;
                var fname = doc.id+doc.name;
                if(!hasDir)furl = doc.dirname+"/"+doc.id+doc.name;
                else furl = fname;

                filer.create(furl, true, function(c){console.log("Success ");}, function(e){console.log("While creating",e)});

                // file local url storing on element
                zdocs.currFiles[doc.lid]["LPATH"]   =  furl;
                zdocs.currFiles[doc.lid]["CTYPE"]   =  doc.ctype;

                filer.write(furl, {data:doc.data, type: doc.ctype},
                    function(fileEntry, fileWriter) {
                           filer.ls('.', function(s){console.log("Success callback ",s);}, function(e){console.log("While writing",e)}); // Just re-read this dir.
                    },
                    function(e){console.log("While creating end",e)}
                );


                filer.ls("/"+dname,  function(i){
                    i.filter( function(i,j){console.log(i.name,j);if(i.name == fname){foname = i.name; showFile(i,i.name);} })
                },  function(e){console.log("error",e);});
			}

		}

       function filterToShowFile(dname){
           var fname = zdocs.currFiles[doc.lid].DOCID+zdocs.currFiles[doc.lid].DOCNAME;
           console.log("Fname ",fname);
                   filer.ls("/"+dname,  function(i){
                       i.filter( function(i,j){console.log(i.name,j," :: ",fname);
                         showFile(i,"test0");
                        if(i.name == fname){
                           foname = i.name;
                            // showFile(i,i.name);
                            // showFile(i,"test0");
                       } })
                   },  function(e){console.log("error",e);});
       }

       function showFile(i,name,download){
        console.log("CSK ",i,name,download);
           filer.open(name,function(i){
                   var r = new FileReader();r.onload = (function(f) {

               return function(e) {
                   var contents = e.target.result;
                   var blob = new Blob([contents], {type: "application/vnd.ms-excel"});//No I18N
                   var FileURL = URL.createObjectURL(blob);
                    var path = (navigator.onLine) ?  zdocs.currFiles[doc.lid]["LDPATH"] : doc.lpath;
                    console.log("path ",path);
                     ctx.EUtil.topic.publish(ctx.EUtil.Listeners, "createnewtab",{"id":doc.lid,"name":doc.name,"data":contents,"url":doc.lpath}); //No I18N

                       zdocs.currFiles[doc.lid]["FileURL"] =   FileURL;                //No I18N
               };
           })(i);
               r.readAsDataURL(i);
       })
       }

       function init(fs){
           console.log(fs.root.toURL());
           console.log('<p>Opened: ' + fs.name, + '</p>');//No I18N
       }

	function errorHandler(err){
		 var msg = 'An error occured: ';  //No I18N

		  switch (err.code) {
		    case FileError.NOT_FOUND_ERR:
		      msg += 'File or directory not found'; //No I18N
		      break;

		    case FileError.NOT_READABLE_ERR:
		      msg += 'File or directory not readable'; //No I18N
		      break;

		    case FileError.PATH_EXISTS_ERR:
		      msg += 'File or directory already exists';//No I18N
		      break;

		    case FileError.TYPE_MISMATCH_ERR:
		      msg += 'Invalid filetype'; //No I18N
		      break;

		    default:
		      msg += 'Unknown Error'; //No I18N
		      break;
		  };

		 console.log(msg);
	};


    function getErrorResult(err){
        console.log(err," :: ",err.code);
        if(err.code == 1 || err.code == 2|| err.code == 3|| err.code == 4|| err.code == 5|| err.code == 6|| err.code == 7|| err.code == 8|| err.code == 9|| err.code == 10|| err.code == 11) return false;
        else return true;
    }
    var offlines ;
    chrome.storage.local.get("offline",function(i){
     offlines =  i.offline;
    })

    

    
	  ctx.EUtil.topic.register(ctx.EUtil.Listeners, "fileItemClick" , handleFiles  ,"e","ui"); //No I18N
	  ctx.EUtil.topic.register(ctx.EUtil.Listeners, "zdrequest" , fileStoreReq  ,"response","pid","ctype"); //No I18N

})(this);
