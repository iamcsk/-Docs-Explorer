
(function (ctx) {
		var ColHeader1, RowHeader1, GridHolder, rowHolder,colHolder,cellsHolder;
		function switchSheet (id) {
					ColHeader1.innerHTML="";
					RowHeader1.innerHTML="";
					rowHolder.innerHTML="";
					colHolder.innerHTML="";
					cellsHolder.innerHTML="";

					var ColsIndexArray  = [];

					var list=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
					for(var i=0; i<list.length; i++){
						 for(var j=0; j<list.length; j++){
						  ColsIndexArray.push(list[i]+""+list[j]);
						 }
					} 
					var colsIndex = list.concat(ColsIndexArray);

					var rowStartIdx,rowEndIdx, colStartIdx, colEndIdx;
					var dim 		   = SpreadSheet.sheets[0].dimension;
					// console.log("dim ",dim);
					if(dim !== undefined && dim["_ref"].indexOf(":") !== -1){
						var availableRange = SpreadSheet.sheets[0].dimension["_ref"].split(":");
						rowStartIdx    = availableRange[0].replace(/[A-Za-z$-]/g,"");
						rowEndIdx 	   = availableRange[1].replace(/[A-Za-z$-]/g,"");

						colStartIdx    = availableRange[0].replace(/[0-9$-]/g,"");
						colEndIdx 	   = availableRange[1].replace(/[0-9$-]/g,"");
						colsIndex.forEach(function(i,j){
							if(i==colStartIdx){ colStartIdx= j;}
							if(i==colEndIdx){ colEndIdx= j;}
						});	
					}else{
						rowStartIdx = 1;
						rowEndIdx 	= 1000;
						colStartIdx = 1;
						colEndIdx 	= 100;
					}

					console.log("SpreadSheet.sheets[0] ",SpreadSheet.sheets[0]);


					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.availableRange,{"data":{"sr":rowStartIdx,"er":rowEndIdx,"sc":colStartIdx,"ec":colEndIdx}});      //No I18N  


					var ActiveSheet  			= 	SpreadSheet.sheets[id];

					// if(SpreadSheet.sheets[0]);

					if(ActiveSheet["cols"] === undefined) {
						ActiveSheet.cols 			=   {};
						ActiveSheet.cols.col 		=	[];	
					}else{
						var col 		= 	ActiveSheet["cols"].col;
						var colsArr 	=	[];
						if(!col.hasOwnProperty("length")){
							colsArr.push(col);
							 ActiveSheet.cols.col 		=	colsArr;	
						}
					}
					

					// console.log("SpreadSheet.sheets[0] ",SpreadSheet.sheets[0]);

					if(ActiveSheet.sheetData.length === 0){
							ActiveSheet.sheetData	= {
								row : []
							}
					}

					if(ActiveSheet["hyperlinks"] === undefined){
						ActiveSheet.hyperlinks 	=	[];
					}
										


					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.SheetColsIndex,{"data":colsIndex});      //No I18N  
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.SheetRows,{"data":ActiveSheet.sheetData.row});      //No I18N  
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.SheetCols,{"data":ActiveSheet.cols.col});      //No I18N  	

					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.HyperLink,{"data":ActiveSheet.hyperlinks});      //No I18N  	
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.ExternalLink,{"data":SpreadSheet.externalLinks});      //No I18N  	

					if(SpreadSheet.comments !== undefined){
						OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.Comment,{"data":SpreadSheet.comments});      //No I18N  	
					}

					
					// console.log(ActiveSheet.sheetData.row," :: ",ActiveSheet.sheetData.cols);

					if(ActiveSheet.sheetData.row.length > 0 || ActiveSheet.cols.col.length > 0){
						OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.SheetCells,{"rowData":ActiveSheet.sheetData.row,"colData":ActiveSheet.cols.col});      //No I18N  
					}
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.WorkBook.ParseComplete,{"data":true});      //No I18N  


		}	

		OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.CellsHolder, function(i){ cellsHolder = i;} ,"ui");//No I18N   
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.ColsHolder, function(i){ colHolder = i;} ,"ui");//No I18N   
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.RowsHolder, function(i){ rowHolder = i;} ,"ui");//No I18N   

		OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.ColHeader1, function(i){ ColHeader1 = i;} ,"ui");//No I18N   
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.RowHeader1, function(i){ RowHeader1 = i;} ,"ui");//No I18N   
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.GridHolder, function(i){ GridHolder = i;} ,"ui");//No I18N   
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.Sheet.Operations.switch, switchSheet,"id");//No I18N 

})(this)

	
	// grid.addEventListener("mousewheel",function(){console.log("calling on scroll");})