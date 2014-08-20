(function (ctx) {
				var colHolder, winh, sharedString, gridHolder , rowsTopArray , colsLeftArray, sheetColsWidth, sheetRowsHeight, styleList, styleSheet, sheetColsIndex,rowCount, hyperLink;
				var comments, ExternalLinks, cellsHolder;
				function getRowsCount (data) {
						 return (data !== undefined) ? data.length : 1000;
				}

				function getColsCount (data) {
						  return (data !== undefined) ? data.length : 256;	
				}

				function main(rowData,colData){
					var cellArray = [];
					for (var i = 0; i < getRowsCount(rowData); i++) {

						var cellData = rowData[i]["c"];
						for (var j = 0; j < cellData.length; j++) {
							var cont = "";

								var r = ~~(rowData[i]["_r"]);
								var c = j;

								
								var cellObj = rowData[i]["c"][j];
								if(rowData[i]["c"][j]  !== undefined){
									c = rowData[i]["c"][j]["_r"].replace(/[0-9-z$-]/g, "");

									var cellSetId 			= cellObj["_s"]

									if(styleList[cellSetId] !== undefined){

											var styleObj					=	styleList[cellSetId];
											var fillId 						= styleList[cellSetId]["_fillId"];

											// Cell BG Color		
											var fillObj 					= styleSheet.fills.fill[fillId].patternFill;
													
											// Alignment
											var alignment					= styleList[cellSetId]["alignment"];

											var cellBorder 					=	styleSheet.borders.border;
											var border 						=	 styleSheet.borders.border[styleList[cellSetId]["_borderId"]]	


										// console.log("row ",r," col ",c," === ",styleObj," ::: ",SpreadSheet.styleSheet.fonts.font[fillId]);		
										// console.log("row ",r," col ",c," === ",styleObj," ::: ",SpreadSheet.styleSheet.fills.fill[fillId]);		

									}
									

									// check cell just has display text value / shared String value 
									// if cellDisplayType  "s" need retrive from sharedString otherwise print original
									var cellDisplayType 			= 	cellObj["_t"];		

									var cellTextValue = (cellDisplayType == "s" && sharedString[cellData[j]["v"]] !== undefined) ? sharedString[cellData[j]["v"]]["t"] : (cellData[j]["v"] !== undefined) ?  cellData[j]["v"] :  "";
									// console.log("r ",r," c ",c," --- ",sharedString[cellData[j]["v"]]," :: ",cellData[j]["v"]);										
									
									var cellContentFormat  = isNaN(cellTextValue) ? 0 : 1;  


									var cell = document.createElement("div");						
									cell.className	=	"cell";
									var cIdx;
									sheetColsIndex.forEach(function(i,j){if(i==c){ cIdx= j;}})



								// console.log("row ",r , " col ",c, " cIdx ", cIdx,"  cellObj ",styleList[cellData[j]["v"]], cellData[j]["v"]);
								// if(styleList[cellData[j]["v"]] !== undefined){
									// console.log(hyperLink["_ref"] == cellObj["_r"]," row ",r , " col ",c, " cIdx ", cIdx,"  cellObj ");
								// }
									// var fonts 						=	styleSheet.fonts.font;
									// var fontId 						= 	styleObj["_fontId"];
									// var fontObj 					=	(fonts[fontId] !== undefined) ? fonts[fontId].color : "";
									// var theme  						= 	~~(fontObj["_theme"])%6;
									// var scheme  					= 	fonts[fontId]["scheme"];
									// var clrs 						=	SpreadSheet.theme.themeElements.clrScheme;
									// var color 						=   (clrs["accent"+theme] !== undefined) ? "#"+clrs["accent"+theme].srgbClr["_val"] : "#000000";  


									var nleft						=   sumArray(colsLeftArray,colsLeftArray.indexOf(c));
									var left 						=   (colsLeftArray[cIdx]);
									var top 						=   (rowsTopArray[r-1]);

									var width 						=   sheetColsWidth[j];
									var height 						=   sheetRowsHeight[i];
									cell.id 						=   cIdx+""+(r-1);
									cell.style.left 				= 	left+"px";
									cell.style.top 					= 	top+"px";
									cell.style.width 				= 	width+"px";
									cell.style.height 				= 	height+"px";
									
									cellArray.push({"idx":cIdx+""+(r-1),"cell":cell});

									OSheet.topic.publish(OSheet.Listeners,OSheet.Events.CellFormat.Border ,{"data":border,"ui":cell});      //No I18N  	
									OSheet.topic.publish(OSheet.Listeners,OSheet.Events.CellFormat.FontColor ,{"data":styleObj,"fonts":styleSheet.fonts.font,"ui":cell});      //No I18N  	
									OSheet.topic.publish(OSheet.Listeners,OSheet.Events.CellFormat.FontFamily ,{"data":styleObj,"fonts":styleSheet.fonts.font,"ui":cell});      //No I18N  	
									OSheet.topic.publish(OSheet.Listeners,OSheet.Events.CellFormat.HorizontalAlign ,{"data":alignment,"ui":cell,"cellContentFormat":cellContentFormat});      //No I18N  	
									OSheet.topic.publish(OSheet.Listeners,OSheet.Events.CellFormat.VerticalAlign ,{"data":alignment,"ui":cell,"cellContentFormat":cellContentFormat,"height":sheetRowsHeight[i]});      //No I18N  	
									OSheet.topic.publish(OSheet.Listeners,OSheet.Events.CellFormat.FontSize ,{"data":styleObj,"fonts":styleSheet.fonts.font,"ui":cell});      //No I18N  	



									var hasHyperLink			=	(hyperLink !== undefined) ?  true : false;
									var hasComment				=	(comments !== undefined) ?  true : false;

									if(hasHyperLink){
										if(!hyperLink.hasOwnProperty("length")){
											hlink = [hyperLink];
										}else{
											hlink = hyperLink;
										}

                                     var hyperlinkCell = false;
										hlink.filter(function(i,j,k){
											if(i["_ref"] === cellObj["_r"]){												
												hyperlinkCell = true;
												OSheet.topic.publish(OSheet.Listeners,OSheet.Events.CellFormat.HyperLink ,{"data":cellTextValue,"ui":cell,"link":ExternalLinks[j]["_Target"]});      //No I18N  	
											}else{
												
											}

										})
									}

									if(!hyperlinkCell){
										OSheet.topic.publish(OSheet.Listeners,OSheet.Events.CellFormat.displayValue ,{"data":cellTextValue,"ui":cell});      //No I18N  	
									}


									if(hasComment){
										var comment = SpreadSheet.comments.commentList.comment;
										var clist   = [];
										if(!comment.hasOwnProperty("length")){
											clist.push(comment);	
										}else{
											clist = comment;	
										}
										clist.filter(function(i,j,k){
											if(i["_ref"] == cellObj["_r"]){
												OSheet.topic.publish(OSheet.Listeners,OSheet.Events.CellReview.Comment ,{"data":k[j],"ui":cell,"x":left,"y":top,"w":width,"h":height});      //No I18N  	
											}

										})
									}

										// console.log("cellsHolder ",cellsHolder);
									cellsHolder.appendChild(cell);
								}

						};
					};

					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.Data.CellsList,{"data":cellArray});      //No I18N  	
					
				} 
		
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.GridHolder, function(i){ gridHolder = i;} ,"ui");//No I18N   
				OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.WINH, function(i){
						winh  = i;
					} ,"data");//No I18N   
				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.RowsTopArray, function(i){
						rowsTopArray  = i;
					} ,"data");//No I18N   
				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.ColsLeftArray, function(i){
						colsLeftArray  = i;
					} ,"data");//No I18N  

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth, function(i){
						sheetColsWidth  = i;
					} ,"data");//No I18N   
				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetRowsHeight, function(i){
						sheetRowsHeight  = i;
					} ,"data");//No I18N   

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.HyperLink, function(i){
					hyperLink = i.hyperlink;						
					} ,"data");//No I18N   

				OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.ExternalLink,function(i){
					ExternalLinks = i
				},"data");//No I18N   			

				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.CellsHolder, function(i){ cellsHolder = i;} ,"ui");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.ColsHolder, function(i){ colHolder = i;} ,"ui");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetCells, main ,"rowData","colData");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SharedString, function(i){ sharedString = i;} ,"data");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.StyleList, function(i){ styleList = i;} ,"data");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.StyleSheet, function(i){ styleSheet = i;} ,"data");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsIndex, function(i){ sheetColsIndex = i;} ,"data");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.availableRange, function(i){rowCount=i.er;} ,"data");//No I18N   
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.Comment, function(i){
				 	

				 if(i["commentList"] !== undefined){
						 comments=i.commentList;
				 	}
				 } ,"data");//No I18N   
})(this)
