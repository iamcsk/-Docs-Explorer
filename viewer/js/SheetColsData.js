(function (ctx) {
				var defaultWidth = 20;
				var albhaArr;
				

				function main(data){
						var colsWidthArray = [];
						for (var i = 1; i <= albhaArr.length; i++) {
							var min  = i;
							var max  = i;

								var id  = data.filter(function(k,j,p){
									var id = i;
									if(k["_min"] == i){
										id  	= ~~(k["_min"]);
										return data;
									}

								}.bind("data"));
								var width = defaultWidth;		
								if(id.length > 0){
									width = ~~(id[0]["_width"]);
								}
								width = width * 4;
								colsWidthArray.push(width);
							
						};
						OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth,{"data":colsWidthArray});      //No I18N  
				} 
				 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetCols, main ,"data");//No I18N   
				  OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsIndex, function(i){albhaArr = i} ,"data");//No I18N   
})(this)
