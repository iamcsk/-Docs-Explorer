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




function download (url,type,fname,ext) {
  
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

    function onError(e) {
      console.log('Error', e);
    }
    // url = "http://localhost:81/sheets/00000000.zip";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
   

    console.log("CSK ",url,type,fname,ext);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {

   var gg =   window.requestFileSystem(PERSISTENT, 1024 * 1024 * 10, function(fs) {
    console.log("fname ",fname);
        fs.root.getFile(fname, {create: true}, function(fileEntry) {
          fileEntry.createWriter(function(writer) {

            writer.onwrite = function(e) {
              i++;
              if(i > 8){
                    chrome.storage.local.set({"offline":zdocs.offline},function(){});
                    console.log("zdocs.currFiles in end",zdocs.catches);
                    return;
              }
              var DPATH = "";
              var CTYPE = ""; 
              var DOCID = ""; 
              var DOCNAME = ""; 
              var FILE_EXTN = ""; 
              for( var j in zdocs.files[i]){ 
                   DPATH = zdocs.files[i]["DPATH"]; 
                   CTYPE = zdocs.files[i]["CTYPE"];
                   DOCID = zdocs.files[i]["DOCID"]
                  DOCNAME = zdocs.files[i]["DOCNAME"]
                  FILE_EXTN = zdocs.files[i]["FILE_EXTN"]
              }   
               // download(zdocs.files[i]["DPATH"],zdocs.files[i]["CTYPE"],zdocs.files[i]["DOCNAME"],zdocs.files[i]["FILE_EXTN"]) 
            };
            writer.onwriteend  =function(e){
              console.log("write end ",e);
            } 
            writer.onerror = function(e) {console.log("Error");};
            // type = (xhr.response.type == "application/x-unknown") ? type : xhr.response.type;
            type = (xhr.response.type == "application/x-unknown") ? "" : type;
            console.log("file type is ",type);
            var blob = new Blob([xhr.response], {type: type});
              var FileURL = URL.createObjectURL(blob);
            console.log(fname.indexOf("xls")," ext ",blob," blob",fname," zdocs.currFiles[i] ",FileURL," zip.HttpReader(URL) ",zip.BlobReader(blob)," fileEntry ",fileEntry);
                      zip.createReader(new zip.BlobReader(blob), function(reader) {
            console.log("reader ",reader);
                          // get all entries from the zip
                          reader.getEntries(function(entries) {
                            if (entries.length) {
                              var wdata = [];
                              // get first entry content as text
                              for (var k = 0; k < entries.length; k++) {
                                     var l=0;;
                                      var content = entries[k].getData(new zip.TextWriter(), function(text,t,y) {
                                       var jsone = x2js.xml_str2json(text);
                                        if(jsone === undefined){
                                            console.log("Going to return ");
                                          return;
                                        }
                                          zdocs.currFiles[i][l] = jsone;
                                          wdata.push(zdocs.currFiles[i][l]);
                                          if(l === entries.length-1){
                                                wdata[wdata.length+1] = ""+i;
                                                zdocs.offline[i] =  wdata;
                                          }
                                       l++;
                                      reader.close(function() {
                                        // onclose callback
                                      });

                                    }, function(current, total) {
                                      // onprogress callback
                                    });
                                  }
                                  zdocs.offline = zdocs.offline.filter(function(i,j,k){
                                   return i; 
                                 })
                                  zdocs.catches.push(zdocs.currFiles[i]);
                                  console.log(zdocs.offline," k ",k,"  entries[k] ",zdocs.currFiles[i]," wdata ",zdocs.catches);

                              };
                       
                          });
                        }, function(error) {
                          // onerror callback
                        });
  
            // }
              chrome.storage.local.set({"catches":zdocs.catches},function(){});
              
            zdocs.currFiles[i].LDPATH = FileURL; 

            writer.write(blob);

          }, onError);
        }, onError);
      }, onError);
    };

    xhr.send();  
}

var x2js;
function downloadAll(){
      i = 0; 
      x2js = new X2JS();
      var DPATH = "";
      var CTYPE = ""; 
      var DOCID = ""; 
      var FILE_EXTN = ""; 
      var DOCNAME = ""; 
      for( var i in zdocs.files[0]){ 
           DPATH = zdocs.files[0]["DPATH"]; 
           CTYPE = zdocs.files[0]["CTYPE"];
           DOCID = zdocs.files[0]["DOCID"]
           DOCNAME = zdocs.files[0]["DOCNAME"]
           FILE_EXTN = zdocs.files[0]["FILE_EXTN"]
      }     
      var FNAME = DOCID;
             download(DPATH,CTYPE,FNAME,FILE_EXTN) 

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

          console.log(zdocs.catches , " zdocs.catches ");
          console.log(zdocs.offline, "  zdocs.offline ");
}
function init (argument) {
      console.log("init down");
      setTimeout(function() {
      console.log("Going to downloadAll");
      downloadAll();
    },4000)
  
}

// init();