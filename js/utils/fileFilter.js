
/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx) {
    EUtil.getFiles = function getFilesByType (type) {
     		var files = {
     			"all"   : zdocs.files,    //No I18N
                    "sheet" : zdocs.files.filter( function(i,j){ if(i.FILETYPE == "zohosheet" || i.FILETYPE == "spreadsheet"){return j;}}),//No I18N
                    "show"  : zdocs.files.filter( function(i,j){ if(i.FILETYPE == "zohoshow" || i.FILETYPE == "show"){return zdocs.files[j];}}), //No I18N
     			"writer" : zdocs.files.filter( function(i,j){ if(i.FILETYPE == "writer") return i}),//No I18N
     			"video" : zdocs.files.filter( function(i,j){ if(i.FILETYPE == "video"){return j;}}), //No I18N
     			"audio" : zdocs.files.filter( function(i,j){ if(i.FILETYPE == "audio"){return j;}}),//No I18N
     			"image" : zdocs.files.filter( function(i,j){ if(i.FILETYPE == "image"){return j;}}) //No I18N
     		}
			return files[type];
	}



	
})(this);