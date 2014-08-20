/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx, undefined){

	function initreqUI () {
			 zdocs.ui.req.filerow		=	document.createElement("p");	 //No I18N
			 zdocs.ui.req.fileicellItem	=	document.createElement("span");	 //No I18N
			 zdocs.ui.req.link	        =	document.createElement("a");	 //No I18N
             zdocs.ui.req.fileinput	    =	document.createElement("input");	 //No I18N
             zdocs.ui.req.fileinputchk	=	document.createElement("input");	 //No I18N
             zdocs.ui.req.icon			=	document.createElement("image");	 //No I18N
             zdocs.ui.req.fileinputchk.type =   "checkbox"; //No I18N

	}

	ctx.EUtil.topic.register(ctx.EUtil.Listeners, "load", initreqUI); //No I18N

})(this);