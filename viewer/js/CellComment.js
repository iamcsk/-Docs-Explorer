(function (ctx) {
	
	var doc = ctx.document, infoDialog, GridHolder, authorui, commentui;

	function createReviewDialogBox () {
			 	var src 	= 	document.createElement("div");						
				infoDialog = src.cloneNode();				
				for (var i = 0; i < 2; i++) {
					var row = src = src.cloneNode();			
					row.className = "rowDisplay";
					infoDialog.appendChild(row);
				};
				infoDialog.className ="cellcomment";				
				GridHolder.appendChild(infoDialog);
				
	}

	function showBox (comment,author) {
			infoDialog.style.display = "block";
			

			var sibs 			 	 	= infoDialog.children;
			authorui 					= sibs[1];
			commentui 					= sibs[0];
			authorui.innerText    		= author;
			commentui.innerText    		= comment;
			
	}

	function clearBox (src) {
			infoDialog.style.display = "none";
			authorui.innerText	=	"";	
			commentui.innerText	=	"";	
	}

	function bindCommentBox (data,ui,x,y,w,h) {
					var text 			= 	data["text"];
					var rTxtObj 		=	(text !== undefined) ? text["r"] : [];
					var author ,comment; 		
					if(rTxtObj.length > 0){
						author  	= rTxtObj[0]["t"];
						comment  	= "";
						for (var i = 1; i < rTxtObj.length; i++) {
								comment += " "+rTxtObj[i]["t"]["__text"]
						};
						ui.className= "cell commentIcon";
						ui.setAttribute("comment", comment);
						ui.setAttribute("author", author);
						// infoDialog.style.left	=	(x+w)+"px"; 
						// infoDialog.style.top	=	 y+"px"; 
					}
			ui.addEventListener("mouseover",function(e){
					var width 					= ~~(this.style.width.replace(/[A-Za-z$-]/g, ""));
					infoDialog.style.left		= (~~(this.style.left.replace(/[A-Za-z$-]/g, "")) + width)+"px";	
					infoDialog.style.top		= ~~(this.style.top.replace(/[A-Za-z$-]/g, ""))+"px";	
					showBox(author,comment,ui.style.left,ui.style.top);
			})

			ui.addEventListener("mouseout",function(e){
					clearBox(this);
			})
	}

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.GridHolder, function(i){ GridHolder = i;} ,"ui");//No I18N   
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellReview.Comment,bindCommentBox,"data","ui","x","y","w","h");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.Comment,createReviewDialogBox);//No I18N   			

})(this)