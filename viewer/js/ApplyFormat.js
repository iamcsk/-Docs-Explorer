
(function (ctx) {
	var src;
	var fontface, fontsize, bold, italic, underline, strikethrough, bgcolo, fontcolor;

	function applyBold (i) {
			formatContentApperance(0,0,0,0,{"bold":true},src);
	}

	function applyItalic (data) {
			formatContentApperance(0,0,0,0,{"italic":true},src);	
	}

	function applyUnderline (data) {
			formatContentApperance(0,0,0,0,{"underline":true},src);	
	}

	function applyStrikeThrough (data) {
			formatContentApperance(0,0,0,0,{"strike":true},src);	
	}

	function applyFontColor (data) {
			formatContentApperance(0,0,0,0,{"color":true},src);	
	}

	function applyBGColor (data) {
			formatContentApperance(0,0,0,0,{"color":true},src);	
	}


	function applyFontFamily (data) {
			// console.log("data applyFontFamily  ",data);
			formatContentApperance(0,0,0,0,{"font":data},src);	
	}

	function applyFontSize (data) {
		// console.log("data applyFontSize  ",data," src ",src);
			formatContentApperance(0,0,0,0,{"size":28},src);	
	}


	function setSelectedFontFace(ff,ffobj) {
				// console.log(i," CSK " );
				for(var j in ffobj.options){
					if(ffobj.options[j] !== undefined && ffobj.options[j].value !== undefined){
						if(ffobj.options[j].value.indexOf(ff) !== -1){
							// console.log("j ",j);
							// ffobj.options[j].setAttribute("selected",true)
						}	
					}
					
				}
	}
	
	 			

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.bold,function(i){
		bold = i;
		i.addEventListener("click",function(e){
			applyBold(i);
		})		
	} ,"ui");//No I18N   			

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.underline,function(i){
		underline = i;
		i.addEventListener("click",function(e){
			applyUnderline(i);
		})		
	} ,"ui");//No I18N   			

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.italic,function(i){
		italic = i;
		i.addEventListener("click",function(e){
			applyItalic(i);
		})		
	} ,"ui");//No I18N   			

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.strikethrough,function(i){
		strikethrough = i;
		i.addEventListener("click",function(e){
			applyStrikeThrough(i);
		})		
	} ,"ui");//No I18N   			

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.fontcolor,function(i){
		i.addEventListener("click",function(e){
			// applyFontColor(i);
		})		
	} ,"ui");//No I18N   	

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.fontSize,function(i){
		fontsize = i;
		i.addEventListener("change",function(e){
			applyFontSize(this.value);
			
		})		
	} ,"ui");//No I18N   

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.fontFamily,function(i){
		fontface = i;
		i.addEventListener("change",function(e){
			applyFontFamily(this.value);
		})		
	} ,"ui");//No I18N   	

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.Selection.cell,function(i){
		// console.log(cell," fontface ",fontface);

		// console.log("I is ",i);
		if(i !== null && i !== undefined){
				setSelectedFontFace(i.style.fontFamily,fontface);
		}
		src = i;
	} ,"ui");//No I18N  		

})(this)