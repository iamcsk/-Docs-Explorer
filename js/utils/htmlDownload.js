var i = 0;
var flister =    document.querySelector("#listfiles"); //No I18N
var obj = window;


  var requestFileSystem = obj.webkitRequestFileSystem || obj.mozRequestFileSystem || obj.requestFileSystem;

  function onerror(message) {
    alert(message);
  }

  function createTempFile(callback) {
    var tmpFilename = "tmp.dat";
    requestFileSystem(TEMPORARY, 4 * 1024 * 1024 * 1024, function(filesystem) {
      function create() {
        filesystem.root.getFile(tmpFilename, {
          create : true
        }, function(zipFile) {
          callback(zipFile);
        });
      }

      filesystem.root.getFile(tmpFilename, null, function(entry) {
        entry.remove(create, create);
      }, create);
    });
  }

  var model = (function() {
    var URL = obj.webkitURL || obj.mozURL || obj.URL;

    return {
      getEntries : function(file, onend) {
        zip.createReader(new zip.BlobReader(file), function(zipReader) {

          zipReader.getEntries(onend);
        }, onerror);
      },
      getEntryFile : function(entry, creationMethod, onend, onprogress) {
        var writer, zipFileEntry;
        function getData() {
          entry.getData(writer, function(blob) {
            var blobURL = creationMethod == "Blob" ? URL.createObjectURL(blob) : zipFileEntry.toURL();
            onend(blobURL);
          }, onprogress);
        }

        if (creationMethod == "Blob") {
          writer = new zip.BlobWriter();
          getData();
        } else {
          createTempFile(function(fileEntry) {
            zipFileEntry = fileEntry;
            writer = new zip.FileWriter(zipFileEntry);
            getData();
          });
        }
      }
    };
  })();




var offlineslist = []

function downloadHTML (url,type,fname,ext) {
  
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

    function onError(e) {
      console.log('Error', e);
    }
    // url = "http://localhost:81/sheets/00000000.zip";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function(e) {

  i++;
              if(i > 2){
                    
                    offlineshtml = offlineslist;
                    setTimeout(function(){
                      chrome.storage.local.set({cachedFiles:offlineshtml},function(i){
                        console.log("Success 84 ");
                      });
                    },2000);
                      
                    console.log("offlineslist ",offlineshtml);
                    return;
              }
              var DPATH = "";
              var CTYPE = ""; 
              var DOCID = ""; 
              var DOCNAME = ""; 
              var FILE_EXTN = ""; 
              for( var j in zdocs.files[i]){ 
                   DPATH = zdocs.files[i]["HPATH"]; 
                   CTYPE = zdocs.files[i]["CTYPE"];
                   DOCID = zdocs.files[i]["DOCID"]
                  DOCNAME = zdocs.files[i]["DOCNAME"]
                  FILE_EXTN = zdocs.files[i]["FILE_EXTN"]
              
              }
                  var id = "offline"+DOCID;

                   var doc = DOCID+":"+xhr.response;
                   offlineslist[i] = doc;
                   
                  
                  
                  // console.log(i," CSK ",DPATH,CTYPE,fname,FILE_EXTN,"xhr.response ",xhr.response);
               downloadHTML(zdocs.files[i]["HPATH"],zdocs.files[i]["CTYPE"],zdocs.files[i]["DOCNAME"],zdocs.files[i]["FILE_EXTN"]) 

    };

    xhr.send();  
}

var x2js;
function downloadHTMLAll(){
      i = 0; 
      x2js = new X2JS();
      var DPATH = "";
      var CTYPE = ""; 
      var DOCID = ""; 
      var FILE_EXTN = ""; 
      var DOCNAME = ""; 
      for( var i in zdocs.files[0]){ 
           DPATH = zdocs.files[0]["HPATH"]; 
           CTYPE = zdocs.files[0]["CTYPE"];
           DOCID = zdocs.files[0]["DOCID"]
           DOCNAME = zdocs.files[0]["DOCNAME"]
           FILE_EXTN = zdocs.files[0]["FILE_EXTN"]
      }     
       // FILE_EXTN =  (CTYPE == "zohosheet" || CTYPE == "spreadsheet" || "zsheet") ? "xls" :  (CTYPE == "zohowriter" || CTYPE == "writer" || CTYPE == "zwriter") ? "doc" : (CTYPE == "zohoshow" || CTYPE == "zshow") ? "ppt" : (CTYPE == "image" || CTYPE == "picture" || CTYPE == "audio" || "video") ? FILE_EXTN : FILE_EXTN;//No I18N
      var FNAME = DOCID+DOCNAME;
   // console.log(DPATH," before download", CTYPE);
             downloadHTML(DPATH,CTYPE,FNAME,FILE_EXTN) 

             var r = flister.children[1].querySelector(".filedetail0");
}  

function retriveOffline () {
          chrome.storage.local.get("catches",function(i){
            console.log("i ");
            zdocs.catches = i.catches;
          }) 
          chrome.storage.local.get("offline",function(i){
           console.log(i.offline);
            zdocs.offline = i.offline;
          }) 
          console.log("zdocs.offline ",zdocs.offline);
          zdocs.catches = zdocs.catches.filter(function(i,j,k){return i;  })
          // zdocs.offline = zdocs.offline.filter(function(i,j,k){return i;  })

}

function init (argument) {
      console.log("init down");
      setTimeout(function() {
      console.log("Going to downloadAll");
      downloadAll();
    },4000)
  
}

  chrome.storage.local.get("cachedFiles",function(i){
    offlineslist=i.cachedFiles
  })