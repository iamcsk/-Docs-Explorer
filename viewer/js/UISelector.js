
(function (ctx) {
	var src;
	var rowHeights, colsWidths, gridHolder , ui, rowsTopArray, colsLeftArray ;
	var selectedColHead , selectedRowHead, colHeader1, RowHeader1;
	var st = 0;
	var sl = 0;
	function makeSelectionComponent () {
			ui = document.createElement("div");						
			ui.className		=	"uiselector";
			gridHolder.appendChild(ui);
	}

	function getTop (idx) {
				return rowTopArr[idx] + st;
	}

	function getLeft (idx) {
				return colsLeftArray[idx] + sl;
	}

	function getWidth(idx) {
			 return colsWidths[idx];
	}

	function getHeight(idx) {
			 return rowHeights[idx];		
	}

	function setSelection (data) {
				if(data.sr !== undefined){

					var sc 	   = data.sc-1;
					var sr 	   = data.sr-1;

					// console.log("sc ",sc," sr ",sr);		


					UnSelect(selectedRowHead,"rowH");
					UnSelect(selectedColHead,"colW");
					selectedRowHead 	= RowHeader1.children[sr];
					selectedColHead 	= colHeader1.children[sc];
					SelectRowHeader(selectedRowHead.id,selectedRowHead);
					SelectColumnHeader(selectedColHead.id,selectedColHead);
					ui.style.width  = getWidth(sc)+"px";
					ui.style.height = getHeight(sr)+"px";	
					ui.style.top    = getTop(sr)+"px";	
					ui.style.left   = getLeft(sc)+"px";	
				
				}
				
	}	
	
	function SelectColumnHeader(idx,selectedColHead) {
			 	ui.style.left 		= getLeft(idx)+"px";
				ui.style.top  		= selectedColHead.offsetTop+"px";
				var maxH 			= rowHeights[rowHeights.length-1] + rowsTopArray[rowsTopArray.length-1];
				ui.style.height  	= maxH+"px";
				ui.style.width 		= selectedColHead.style.width;
				selectedColHead.className   	= "selectedHeader";   
	}

	function SelectRowHeader (idx,selectedRowHead) {
				ui.style.top 		= getTop(idx)+"px";
				ui.style.left  		= selectedRowHead.offsetLeft+"px";
				var maxW 			= colsWidths[colsWidths.length-1] + colsLeftArray[colsLeftArray.length-1];
				ui.style.width  	= maxW+"px";
				ui.style.height 	= selectedRowHead.style.height;
				selectedRowHead.className   	= "selectedHeader";   
	}

	function SelectColumn (data) {
				UnSelect(selectedColHead,"colW");
				UnSelect(selectedRowHead,"rowH");
				selectedColHead 	= 	data.target; 
				var sc 				= 	selectedColHead.id; 
				SelectColumnHeader(sc,selectedColHead);

	}

	function SelectRow (data) {
				UnSelect(selectedColHead,"colW");
				UnSelect(selectedRowHead,"rowH");
				selectedRowHead 	= 	data.target; 
				var sr 				= selectedRowHead.id; 
				SelectRowHeader(sr,selectedRowHead);
	}

	function UnSelect (src,className) {
			 if(src){
			 		src.className=className;
			 }
	}


	OSheet.topic.register(OSheet.Listeners,OSheet.Events.Selection.indexer, setSelection ,"data");//No I18N   
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.FullyLoaded, makeSelectionComponent);//No I18N   
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.GridHolder, function(i){ gridHolder = i;} ,"ui");//No I18N   

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth,function(i){
		colsWidths = i;
	} ,"data");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetRowsHeight,function(i){
		rowHeights = i;
	} ,"data");//No I18N   			

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.RowsTopArray, function(i){
		rowsTopArray  = i;
	} ,"data");//No I18N   
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.ColsLeftArray, function(i){
		colsLeftArray  = i;
	} ,"data");//No I18N  


	OSheet.topic.register(OSheet.Listeners,OSheet.Events.ColHeader.click, SelectColumn ,"data");//No I18N   
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.RowHeader.click, SelectRow ,"data");//No I18N   

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.ColHeader1, function(i){ colHeader1 = i;} ,"ui");//No I18N   
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.RowHeader1, function(i){ RowHeader1 = i;} ,"ui");//No I18N   

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.DocumentMouseScrollXY.sheetPane, function(data,y,x){
		// console.log("data ",data," x ",x," y ",y);
		st = (y !== undefined) ?  y : 0;
		sl = (x !== undefined) ?  x  : 0;
	} ,"data","top","left");//No I18N   
})(this)