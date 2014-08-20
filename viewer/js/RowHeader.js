(function (ctx) {
				var rowHolder , sheetRowsHeight, totalWidth, rowCount, startRow;
				var rowsTopArray = [];
				var defaultHeight = 20;

				function getRowsCount (data) {
						var len = (data == undefined) ?  0 : rowCount;	
						 return (len === 0) ? 1000 :  rowCount;
				}

				function getRowHeight (row,j) {
						 var height = defaultHeight;
						 if(row[j] !== undefined){
						 	if(row[j]["_ht"] !== undefined){
						 		height = ~~(row[j]["_ht"]);
						 	}
						 }
						 return height;
				}

				function main(data){
					var rowHeightArr = [];
					var defaultHeight = 18;
					var rowsCount = rowCount;
					for (var j = 0; j <= rowsCount; j++) {
						var crh = getRowHeight(data,j);
						rowHeightArr.push(crh);
						var top = sumArray(rowHeightArr,j);
						rowsTopArray.push(top);
						var row = document.createElement("div");						

						row.addEventListener("mousedown",function(e){
									OSheet.topic.publish(OSheet.Listeners,OSheet.Events.RowHeader.click,{"data":e});      //No I18N  
						})	

						row.className	=	"rowH";
						row.id 			=  j;
						row.style.height = sheetRowsHeight[j]+"px";
						row.style.width = totalWidth+"px";
						row.innerHTML = j+1;

						rowHolder.appendChild(row);
					}
					
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.RowsTopArray,{"data":rowsTopArray});      //No I18N  
				} 

				function parallelScroll (data,top,left) {
							rowHolder.scrollTop = top;
				}

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetRowsHeight, function(i){
						sheetRowsHeight  = i;
					} ,"data");//No I18N  

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth, function(i){
						sheetColsWidth  = i;
					} ,"data");//No I18N   
		

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.DocumentMouseScrollXY.sheetPane, parallelScroll ,"data","top","left");//No I18N   

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth, function(i){
					totalWidth = ~~(sumArray(i,i.length));
				} ,"data");//No I18N   

				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.RowHeader1, function(i){ rowHolder = i;} ,"ui");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetRows, main ,"data");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.availableRange, function(i){rowCount=i.er;startRow =i.sr; } ,"data");//No I18N   
})(this)