
var zsfile;
var activeDocument;

(function(obj) {
	var files;
	var x2js = new X2JS();

	activeDocument  = {
			rw     : 0,
			ch     : 0,
			sheets : [],
			styleSheet : null
	}


	var requestFileSystem = obj.webkitRequestFileSystem || obj.mozRequestFileSystem || obj.requestFileSystem;

	function onerror(message) {
		alert(message);
	}

	function createTempFile(callback) {
		var g = new Date().toString();
		var tmpFilename = new Date().toString();
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


	(function() {
		var fileInput = document.getElementById("file-input");
		var unzipProgress = document.createElement("progress");
		var fileList = document.getElementById("file-list");
		var creationMethodInput = document.getElementById("creation-method-input");

		function download(entry, li, a) {
			model.getEntryFile(entry, creationMethodInput.value, function(blobURL) {
				// console.log("blobURL ",blobURL);
				var clickEvent = document.createEvent("MouseEvent");
				if (unzipProgress.parentNode)
					unzipProgress.parentNode.removeChild(unzipProgress);
				unzipProgress.value = 0;
				unzipProgress.max = 0;

			}, function(current, total) {
				unzipProgress.value = current;
				unzipProgress.max = total;
				// console.log("completred ",total," yes ",current );
				// li.appendChild(unzipProgress);
			});
		}

		if (typeof requestFileSystem == "undefined")
			creationMethodInput.options.length = 1;
			fileInput.addEventListener('change', function() {

				var documentName = 	(fileInput.files[0] !== undefined) ? fileInput.files[0].name : "Spreadsheet Document";
				// console.log(documentName," f ileInput.files[0].name ",fileInput.files[0].name);
				OSheet.topic.publish(OSheet.Listeners,OSheet.Events.Gears.DocumentName ,{"data":documentName});      //No I18N  	

			fileInput.disabled = true;
			model.getEntries(fileInput.files[0], function(entries) {
				files = entries;

				var filesjson = [];

				for (var i = files.length - 1; i >= 0; i--) {

					var fname = files[i].filename;
					if(fname.indexOf(".png") > 0 || fname.indexOf(".jpg") > 0 || fname.indexOf(".jpeg") > 0 || fname.indexOf(".gif") > 0){
						 // var blob = new Blob([xhr.response], {type: type});
              			 // var FileURL = URL.createObjectURL(blob);
						// console.log(files[i],"file ",download(files[i]));
					}

					files[i].getData(new zip.TextWriter(), function(text,i,j) {
							// console.log(i," i ",j);
							var jsone = x2js.xml_str2json(text);
							// console.log("files[i] ",text);

					

							filesjson.push(jsone);
							if(filesjson.length == files.length){
								var container = document.querySelector("#container");
								container.style.display	="none";
									OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.Data,{"data":docoffline,"sheetID":0});      //No I18N  
				 			}
				 	})
				};
			});
		}, false);

	})();

})(this);
