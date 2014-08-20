/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx, undefined){

requestData	=   function request (type , url, pid, respType) {


				var gtype = (typeof type == "undefined") ? "GET" : type; //No I18N
				var xmlhttp =	new XMLHttpRequest();
                xmlhttp.open(gtype,url,true);
                if(respType == "blob"){  //No I18N
                    xmlhttp.responseType = respType;
                }
				 xmlhttp.onreadystatechange=function()
				  {
				  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				    {
				    	var resp 	=	xmlhttp.response;
              if(pid === undefined){
                console.log("CSK ",resp);
              }

                        var contentType = xmlhttp.getResponseHeader('Content-Type'); //No I18N
					    	ctx.EUtil.topic.publish(ctx.EUtil.Listeners, "zdrequest" , {"response":resp,"pid":pid,"ctype":contentType});	//No I18N
				    	return resp;
				    }
				  }

				xmlhttp.send();

		},
	getResponse = 	function getResponse(url) {
	    var xmlhttp;

	        xmlhttp = new XMLHttpRequest();

	    xmlhttp.onreadystatechange = function() {
	    	var resp;
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        	resp = xmlhttp.responseText;
	        }
	        return resp;
	    }

	    xmlhttp.open("GET", url, true);
	    xmlhttp.send();
	}



})(this);


