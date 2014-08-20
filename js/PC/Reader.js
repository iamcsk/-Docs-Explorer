/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */

var zdlocal   =  {
            "FILES"  : []  //No I18N
}

var gGalleryIndex = 0;     // gallery currently being iterated
var gGalleryReader = null; // the filesytem reader for the current gallery
var gDirectories = [];     // used to process subdirectories
var gGalleryArray = [];    // holds information about all top-level Galleries found - list of DomFileSystem
var gGalleryData = [];     // hold computed information about each Gallery
var gCurOptGrp = null;


function errorPrintFactory(custom) {
   return function(e) {
      var msg = '';

      switch (e.code) {
         case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR'; //No I18N
            break;
         case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';  //No I18N
            break;
         case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR'; //No I18N
            break;
         case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';//No I18N
            break;
         case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';  //No I18N
            break;
         default:
            msg = 'Unknown Error';  //No I18N
            break;
      };

      console.log(custom + ': ' + msg);
   };
}

function GalleryData(id) {
   this._id = id;
   this.path = ""; //No I18N
   this.sizeBytes = 0;
   this.numFiles = 0;
   this.numDirs = 0;
}


function addGallery(name, id) {
   var optGrp = document.createElement("optgroup"); //No I18N
   optGrp.setAttribute("label",name);//No I18N
   optGrp.setAttribute("id", id); //No I18N
   document.getElementById("listfiles").appendChild(optGrp);//No I18N
   return optGrp;
}

function addItem(itemEntry) {
   var opt = document.createElement("option");//No I18N
   if (itemEntry.isFile) {
      opt.setAttribute("data-fullpath", itemEntry.fullPath); //No I18N

      var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(itemEntry.filesystem);
      opt.setAttribute("data-fsid", mData.galleryId);//No I18N
   }
   opt.appendChild(document.createTextNode(itemEntry.name));
   gCurOptGrp.appendChild(opt);
}

function listDirectory () {
         var dir_entry = gDirectories.shift();
         if(typeof dir_entry != "undefined"){//No I18N
            good = dir_entry;
//            console.log("This is dir_entry ",dir_entry);
            gGalleryReader = dir_entry.createReader();
            gGalleryReader.readEntries(scanGallery, errorPrintFactory('readEntries')); //No I18N
         }
         
}

function readSubDirectory () {
         if (gGalleryIndex < gGalleryArray.length) {
            scanGalleries(gGalleryArray[gGalleryIndex]);
         }
}

function pushSubDirectory (entries,i) {
         gDirectories.push(entries[i]);
}

function pushFilesList (fobj,i) {
         var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(fobj.filesystem);
         // var hasFiles = zdlocal.FILES.filter(function(i){if(i.FSID == 8) return true})
         // var already = false;
         // console.log(" already ",already);
         // console.log(hasFiles.length," length");
         // if(hasAlready){
         //   return; 
         // } 

        zdlocal.FILES.push({
               "DOCNAME":fobj.name,    //No I18N
               "LAST_MODIFIEDTIME":"",  //No I18N
               "SIZE":"",   //No I18N
               "AUTHOR":"",  //No I18N
               "LPATH":fobj.fullPath, //No I18N
               "FSID":mData.galleryId   //No I18N
         });
//        console.log("csk ",gGalleryData[gGalleryIndex].numFiles);
         gGalleryData[gGalleryIndex].numFiles++;
         (function(galData,j) {
            fobj.getMetadata(function(metadata){
               // zdlocal.FILES[j].LAST_MODIFIEDBY   = metadata.modificationTime;
//               console.log(j,zdlocal.FILES[j],"good ",metadata.modificationTime);
               if(typeof zdlocal.FILES[j] != "undefined"){  //No I18N
                  zdlocal.FILES[j].LAST_MODIFIEDTIME   = metadata.modificationTime+""; //No I18N
                  zdlocal.FILES[j].SIZE   = metadata.size;   
               }
               
            });
         }(gGalleryData[gGalleryIndex],i,fobj,mData));
         // if(hasFiles.length > 0) already = true;
}

function  processeContents(entries) {
            if (gDirectories.length > 0) {
               listDirectory(); 
            }
            else {
               gGalleryIndex++;
               readSubDirectory();
            }
}


function scanGallery(entries) {
//   console.log(" entries ",entries);
   zdlocal.FILES = [];
   if (entries.length == 0) {
      processeContents(entries);
      return;
   }
   for (var i = 0; i < entries.length; i++) {
      (entries[i].isFile) ? pushFilesList(entries[i],i) : (entries[i].isDirectory) ? pushSubDirectory(entries[i],i) : "";
   }
    EUtil.topic.publish(EUtil.Listeners, "getZDLocalfiles" , {"zdocs":zdlocal.FILES}); //No I18N
   gGalleryReader.readEntries(scanGallery, errorPrintFactory('readMoreEntries'));//No I18N
}

function scanGalleries(fs) {
   var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(fs);

//   console.log('Reading gallery: ' + mData.name);
   gCurOptGrp = addGallery(mData.name, mData.galleryId);
   gGalleryData[gGalleryIndex] = new GalleryData(mData.galleryId);
   gGalleryReader = fs.root.createReader();
   gGalleryReader.readEntries(scanGallery, errorPrintFactory('readEntries')); //No I18N
}

function getGalleriesInfo(results) {
   if (results.length) {
      var str = 'Gallery count: ' + results.length + ' ( '; //No I18N
      results.forEach(function(item, indx, arr) {
         var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(item);

         if (mData) {
            str += mData.name;
            if (indx < arr.length-1)
               str += ",";//No I18N
            str += " ";  //No I18N
         }
      });
      str += ')';
      document.getElementById("filename").innerText = str; //No I18N
      gGalleryArray = results; // store the list of gallery directories
      gGalleryIndex = 0;

      document.getElementById("scan-button").disabled = ""; //No I18N
   }
   else {
      document.getElementById("filename").innerText = 'No galleries found';//No I18N
      document.getElementById("scan-button").disabled = "disabled";//No I18N
   }
}

function getFileStore(e,ui){
      var fileStore = null;
       for (var i=0; i < gGalleryArray.length; i++) {
            var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(gGalleryArray[i]);
            if (mData.galleryId == zdocs.files[i].FSID) {
               fileStore = gGalleryArray[i];
               break;
            }
      }
    EUtil.topic.publish(EUtil.Listeners, "loadFileContent" , {"e":e,"ui":ui,"fileStore":fileStore}); //No I18N
}

 
function loadFile (e,ui,fs) {
//   console.log(e.target.className.indexOf("filedetail0") < 0," :: " ,e.srcElement);
     if(e.target.className.indexOf("filedetail0") < 0) return;  //No I18N
      var path = (typeof  zdocs.currFiles[ui.id].LPATH != "undefined") ? zdocs.currFiles[ui.id].LPATH : "";//No I18N
    console.log("path URL ",path);
  
    // previewWeb.src = path;

      return;  // temprory stop
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
         
         created_window.contentWindow.onload = function () {
//         console.log(path,"win ",created_window.contentWindow , created_window.contentWindow.document.querySelector("webview")); //No I18N
            var viewer = created_window.contentWindow.document.querySelector("webview");//No I18N

            viewer.src = path;
//          console.log("URL is ",path);
            }
          } );
      console.log(ui," :: ", path);

      // fs.root.getFile(path, {create: false}, function(fileEntry) {
      //    var url = fileEntry.toURL();

      //    // if (newElem) {
      //       // (function() {
      //       //    fileEntry.file(function(fff) {
      //       //       var reader = new FileReader();
      //       //       reader.onerror = errorPrintFactory('FileReader');
      //       //       reader.onloadend = function(e) {
      //       //          console.log("this.result ",this.result);
      //       //          // image_element.src = this.result;
      //       //       };
      //       //       reader.readAsDataURL(fff);
      //       //    }, errorPrintFactory('PlayBack'));
      //       // }());
      //    // }
      // });
}



EUtil.topic.register(EUtil.Listeners, "fileItemClick" , getFileStore  ,"e","ui"); //No I18N

EUtil.topic.register(EUtil.Listeners, "loadFileContent" , loadFile  ,"e","ui","fileStore"); //No I18N

window.addEventListener("load", function() {//No I18N
   if (window.__MGA__bRestart) {
      chrome.mediaGalleries.getMediaFileSystems({
         interactive : 'if_needed'    //No I18N
      }, getGalleriesInfo);
   }

   // document.getElementById('gallery-button').addEventListener("click", function() {
   //    chrome.mediaGalleries.getMediaFileSystems({
   //       interactive : 'if_needed'
   //    }, getGalleriesInfo);
   // });
   // document.getElementById('configure-button').addEventListener("click", function() {
   //    chrome.mediaGalleries.getMediaFileSystems({
   //       interactive : 'yes'
   //    }, getGalleriesInfo);
   // });
   // document.getElementById('scan-button').addEventListener("click", function () {
   //    if (gGalleryArray.length > 0) {
   //       scanGalleries(gGalleryArray[0]);
   //    }
   // });
  
});

