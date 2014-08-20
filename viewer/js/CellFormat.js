
(function (ctx) {
	function setBorder (data,ui) {
			var border = 1;
			if(data == undefined){ return};
			if(data["bottom"] !== undefined && data["bottom"].hasOwnProperty("_style")){
				ui.style.borderBottom = border+"px solid";
			}else if(data["top"].hasOwnProperty("_style")){
				ui.style.borderTop = border+"px solid";
			} 	

			if(data["diagonal"] !== undefined && data["diagonal"].hasOwnProperty("_style")){
				ui.style.borderRight = border+"px solid";
			}	

			if(data["left"] !== undefined && data["left"].hasOwnProperty("_style")){
				ui.style.borderLeft = border+"px solid";
			}else if(data["right"] !== undefined && data["right"].hasOwnProperty("_style")){
				ui.style.borderRight = border+"px solid";
			} 	

	}

	function setFGColor (data,ui) {
			if(data === undefined){
				return;
			}
			var bgColor  					= (data.hasOwnProperty("bgColor")) ? data["bgColor"] : "";
			var fgColor  					= (data.hasOwnProperty("fgColor")) ? data["fgColor"] : "";
			var theme  						= (fgColor.hasOwnProperty("_theme"))  ? fgColor["_theme"] : "";
			var tint  						= (fgColor.hasOwnProperty("_tint"))  ? fgColor["_tint"] : "";
			var rgb  						= (fgColor.hasOwnProperty("_rgb"))  ? fgColor["_rgb"].substr(2,8) : "";

			ui.style.backgroundColor 		= 	"#"+rgb;
	}



	function setFontFamily (data,fonts,ui) {
				if(data === undefined){
						return;
					}
				var fontId 						= 	data["_fontId"];
				var fontObj 					=	(fonts[fontId] !== undefined) ? fonts[fontId].name : "";
				var fontStyle  					= 	fontObj["_val"];
				ui.style.fontFamily 			= 	fontStyle;
	}


	function setHorizontalAlignment (data,ui,cellContentFormat) {

				var hAlignment 				= (data !== undefined) ? data["_horizontal"] : "";
					hAlignment 			   	= (cellContentFormat == 1) ? "right" : hAlignment;
				ui.style.textAlign 			=  hAlignment;
	}

	function setVerticalAlignment (data,ui,cellContentFormat,height) {
				var vAlignment 				= (data !== undefined) ? data["_vertical"] : "bottom";
				if(vAlignment == "center"){
					ui.style.lineHeight 		=  height+"px";
				}
				if(vAlignment == "bottom"){
					ui.style.lineHeight 		=  ((height*2) - 20)+"px";
				}
	}

	function setCellDisplayValue (data,ui) {
				ui.innerText	=	data;
	}
	
	function setCellTitle (data,ui) {
				ui.title 		=	data;	
	}

	function setFontSize (data,fonts,ui) {
				if(data === undefined){
								return;
				}
				var fontId 						= 	data["_fontId"];
				var fontObj 					=	(fonts[fontId] !== undefined) ? fonts[fontId].sz : "";
				var fontSize  					= 	fontObj["_val"];
				ui.style.fontSize 				= 	fontSize+"px";
	}

	function setFontColor (data,fonts,ui) {
				// var fontId 						= 	data["_fontId"];
				// var fontObj 					=	(fonts[fontId] !== undefined) ? fonts[fontId].color : "";
				// var theme  						= 	~~(fontObj["_theme"]);
				// var clrs 						=	SpreadSheet.theme.themeElements.clrScheme;
				// var color 						=   (clrs["accent"+theme] !== undefined) ? "#"+clrs["accent"+theme].srgbClr["_val"] : "#000000";  
				// // ui.style.color 					= 	color;
				// console.log(clrs, " theme ",theme," :: ",fontObj);
	}

	function setHyperLink (data,ui,link) {
				var a 							= document.createElement("a")
				a.href=link;
				a.innerText = data;
				console.log(a, " :: ",data)
				ui.appendChild(a);
	}

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellFormat.Border,setBorder ,"data","ui");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellFormat.FontColor,setFontColor ,"data","fonts","ui");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellFormat.FontFamily,setFontFamily ,"data","fonts","ui");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellFormat.FontSize,setFontSize ,"data","fonts","ui");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellFormat.HorizontalAlign,setHorizontalAlignment,"data","ui","cellContentFormat");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellFormat.VerticalAlign,setVerticalAlignment,"data","ui","cellContentFormat","height");//No I18N   			

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellFormat.displayValue,setCellDisplayValue,"data","ui");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellFormat.displayValue,setCellTitle,"data","ui");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.CellFormat.HyperLink,setHyperLink,"data","ui","link");//No I18N   			
	
})(this)

	
