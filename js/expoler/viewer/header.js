/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx) {
    var zdfiles	    =	null;
    var headerui    =   null;
    var Populate	=	{
        init                : function(){
                              this.createListColumn();
        },
        createListColumn	: function(){
            headerui =    document.querySelector("#explorerhead");   //No I18N
            for(var col=0; col<zdocs.ul.reqcollabel.length; col++){
                var clable  		=   zdocs.ui.req.fileicellItem.cloneNode();  
                clable.innerHTML	=	zdocs.ul.reqcollabel[col];
                clable.className    =   "filedetail"+col; //No I18N
                if(col !== zdocs.ul.reqcollabel.length-1){  // tmp 
                    clable.setAttribute("style","position:relative;left:30px;");
                }
                headerui.appendChild(clable)
            }
        },
        scrollSetter        : function(top,left){
            headerui.scrollLeft  =   left;
        }

    }


    ctx.EUtil.topic.register(ctx.EUtil.Listeners, "load", Populate.createListColumn); //No I18N
    ctx.EUtil.topic.register(ctx.EUtil.Listeners, "eplMainScroll" , Populate.scrollSetter ,"top","left"); //No I18N
})(this);