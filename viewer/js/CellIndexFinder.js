var colLeftArr , rowTopArr, rowHeights, colsWidths;
var st = 0;
var sl = 0;

(function (ctx) {
	var src;
	function getSrcElement (data) {
			var rowHeightArr = rowHeights;

			var x = data.x+35;
			var y = data.y-70;

			var left , top , rowIdx , colIdx;
			colLeftArr.filter(function(i,j){
				if(i < x){
					colIdx = 	j;
					left   =	i;
				}
			})

			rowTopArr.filter(function(i,j){
				if(i < y){
					rowIdx = 	j+1;
					top   =	i;
				}
			})

			OSheet.topic.publish(OSheet.Listeners,OSheet.Events.Selection.indexer,{"data":{"sr":rowIdx,"er":rowIdx,"sc":colIdx,"ec":colIdx}});      //No I18N  
	}
	
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.Grid.sheetPane,getSrcElement ,"data");//No I18N   			
	
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth,getSrcElement ,"data");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth,function(i){
		colsWidths = i;
	} ,"data");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetRowsHeight,function(i){
		rowHeights = i;
	} ,"data");//No I18N   			

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.DocumentMouseScrollXY.sheetPane, function(data,y,x){
		// console.log("data ",data," x ",x," y ",y);
		st = (y !== undefined) ?  y : 0;
		sl = (x !== undefined) ?  x  : 0;
	} ,"data","top","left");//No I18N   
})(this)