(function (ctx) {
				var colHolder, winh, colHead;
				var colsLeftArray = [];
				var albhaArr;

				function main(data){
					var defaultWidth = 20;
					var totalHeight = ~~(sumArray(sheetRowsHeight,sheetRowsHeight.length))
					for (var i = 0; i < data.length; i++) {
							var left = ~~(sumArray(data,i));
							colsLeftArray.push(left);
							var col = document.createElement("div");						
							col.className		=	"colW";
							col.style.width 	= data[i]+"px";
							col.id 				=	i;
							col.style.height 	= totalHeight+"px";	// tmp will remove after calc of avilable height
							colHolder.appendChild(col);
					};
						OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.ColsLeftArray,{"data":colsLeftArray});      //No I18N  
				} 
		

				function parallelScroll (data,top,left) {
							colHead.scrollLeft = left;
				}

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.DocumentMouseScrollXY.sheetPane, parallelScroll ,"data","top","left");//No I18N   

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.WINH, function(i){
						winh  = i;
					} ,"data");//No I18N   

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetRowsHeight, function(i){
						sheetRowsHeight  = i;
					} ,"data");//No I18N   

				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.ColsHolder, function(i){ colHolder = i;} ,"ui");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.colHead, function(i){ colHead = i;} ,"ui");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth, main ,"data");//No I18N   
				  OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsIndex, function(i){albhaArr = i} ,"data");//No I18N   
				
})(this)