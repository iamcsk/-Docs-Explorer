(function (ctx) {
				var rowHolder, rowWidth, rowCount,startRow;
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
						 		height = ~~(row[j]["_ht"])
						 	}
						 }
						 return height;
				}

				function main(data){
					var rowHeightArr = [];
					var rowsCount = rowCount;	
					
					for (var j = 0; j <= rowsCount; j++) {
						var crh = getRowHeight(data,j)
						rowHeightArr.push(crh);
						var top = ~~(sumArray(rowHeightArr,j));
						rowsTopArray.push(top);
						var row = document.createElement("div");						
						row.className	=	"rowH";
						row.id 			=  j;
						row.style.height = crh+"px";
						row.style.width = rowWidth+"px";

						rowHolder.appendChild(row);
					}
					
						
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.RowsTopArray,{"data":rowsTopArray});      //No I18N  
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.SheetRowsHeight,{"data":rowHeightArr});      //No I18N  
				} 
			
				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth, function(i){
					rowWidth	= ~~(sumArray(i,i.length));
					// console.log("width ",rowWidth);
				} ,"data");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.RowsHolder, function(i){ rowHolder = i;} ,"ui");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetRows, main ,"data");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.availableRange, function(i){rowCount=i.er; startRow =i.sr; } ,"data");//No I18N   
})(this)