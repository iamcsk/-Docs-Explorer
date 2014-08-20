(function (ctx) {
		 var mainUI = ""

		 function init(ui) {
		 		mainUI = ui;
		 }

		 function createUI (sheet, name, idx) {
		 			var sheetUI 		=  sheet.cloneNode();
					sheetUI.innerHTML 	= name;	
					sheetUI.id 			= idx;
					sheetUI.addEventListener("click",function(){
						OSheet.topic.publish(OSheet.Listeners,OSheet.Events.Sheet.Operations.switch,{"id":this.id})
					})
					mainUI.appendChild(sheetUI);
		 }

		 function main (data) {
		 	// console.log(" data[i] ", typeof data)
				 var sheet = document.createElement("div")
				 sheet.className = "sheetUI";
				 if(data.length > 0){
				 	for (var i = 0; i < data.length; i++) {
				 			createUI(sheet, data[i]["_name"],i);
					};		 		
				 }else{
				 	createUI(sheet, data["_name"],0);
				 }
				 
		 }
		 OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.SheetsList, init ,"ui");//No I18N  
		 OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.Sheets, main ,"data");//No I18N  
})(this)