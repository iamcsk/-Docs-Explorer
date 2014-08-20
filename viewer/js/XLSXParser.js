
(function (ctx) {
			function main (data,activeSheetId) {
					// console.log("data ",data);
					SpreadSheet = {
							main   				: data,
							sheets 				: [],
							cols   				: {
									col 		: []	
							},
							sheetData   		: {
									row 	    : []
							},
							externalLinks  		: []
					};

					data.forEach(function(i,j){
							if(i !== null){

								if(i.hasOwnProperty("workbook")){
									SpreadSheet.workbook = i.workbook;	
								}

								if(i.hasOwnProperty("sst")){
									SpreadSheet.sharedStrings = i["sst"]["si"];	
								}

								if(i.hasOwnProperty("worksheet")){
									SpreadSheet.sheets.push(i["worksheet"]);	
								}

								if(i.hasOwnProperty("styleSheet")){

									SpreadSheet.styleSheet = i["styleSheet"];	

									if(SpreadSheet.styleSheet.hasOwnProperty("cellXfs")){
										SpreadSheet.styleList = SpreadSheet.styleSheet["cellXfs"]["xf"];
									}
								}

								if(i.hasOwnProperty("theme")){
									SpreadSheet.theme = i["theme"];	
								}

								if(i.hasOwnProperty("wsDr")){
									SpreadSheet.wsDr = i["wsDr"];	
								}

								if(i.hasOwnProperty("coreProperties")){
									SpreadSheet.coreProperties = i["coreProperties"];	
								}

								if(i.hasOwnProperty("comments")){
									SpreadSheet.comments = i["comments"];	
								}

								if(i.hasOwnProperty("Relationships")){
										var rel 	= i["Relationships"];
										var relOb 	= rel["Relationship"];
										for(var j in relOb){
											if(relOb[j].hasOwnProperty("_TargetMode")){
												SpreadSheet.externalLinks.push(relOb[j]);
											}
										}
								}		
								
							}
						})

					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.SharedString,{"data":SpreadSheet.sharedStrings});   //No I18N  
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.Properties,{"data":SpreadSheet.coreProperties});      //No I18N  
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.WorkBook,{"data":SpreadSheet.workbook});      //No I18N  
					
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.StyleSheet,{"data":SpreadSheet.styleSheet});      //No I18N  
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.StyleList,{"data":SpreadSheet.styleList});      //No I18N  
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.Theme,{"data":SpreadSheet.theme});      //No I18N  

					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.Sheet.Operations.switch,{"id":0})
					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.JSON.Sheets,{"data":SpreadSheet.workbook.sheets.sheet});      //No I18N  
					var main = document.querySelector("#main");
					main.style.visibility		="visible";

			}

		 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.Data, main ,"data","sheetID");//No I18N 

})(this)
