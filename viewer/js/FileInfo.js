(function (ctx) {
	var doc = ctx.document, infoDialog;
	function createDocumentInfo (data) {
				var docInfo = [];
				var src 	= 	document.createElement("div");						
				infoDialog = src.cloneNode();				
				infoDialog.className	=	"docInfo";
				if(data !== undefined){
					for(var x in data){
						if(x.indexOf("_") == -1){
							var row 				= src.cloneNode();				
							row.className			= "rowdisplay";	
							var cols = [x, ":",data[x]["__text"]];
							for (var i = 0; i < cols.length; i++) {
									var cell 				= src.cloneNode();				
									cell.innerHTML = (cols[i] !== undefined) ? cols[i] : "";
									if(i === 0){
										cell.className			= "celldisplay";	
									}
									cell.style.paddingRight		=	"8px";
									cell.style.paddingBottom	=	"8px";
									row.appendChild(cell);
							};
							infoDialog.appendChild(row);	
					}}
					// console.log(infoDialog);
					doc.body.appendChild(infoDialog);
				}
	}
	


	OSheet.topic.register(OSheet.Listeners,OSheet.Events.Gears.DocumentName, function(i){
					doc.title = i;
	} ,"data");//No I18N  
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.Properties,createDocumentInfo,"data");//No I18N  

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.docInformer,function(i){

		i.addEventListener("mouseover",function(e){
				infoDialog.style.display = "block";
				infoDialog.style.left 	= "78%";
				infoDialog.style.top 	= "1.5%";
		})
		i.addEventListener("mouseout",function(e){
			infoDialog.style.display = "none";
		})

	},"ui");//No I18N  
	
})(this)