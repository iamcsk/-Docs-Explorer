
(function (ctx) {
	function bindMouseWheel (ui) {
		var evName = (ctx.MouseScrollEvent) ? "scroll" : "mousewheel";
		console.log("ctx.MouseScrollEvent ",evName);
		ui.addEventListener(evName,function(i,j,k){
			var top = this.scrollTop;
			var left = this.scrollLeft;
			OSheet.topic.publish(OSheet.Listeners,OSheet.Events.DocumentMouseScrollXY.sheetPane ,{"data":i,"top":top,"left":left});      //No I18N  
		})
	}

	function clickBinder(ui){
		ui.addEventListener("mousedown",function(e){
			OSheet.topic.publish(OSheet.Listeners,OSheet.Events.Grid.sheetPane ,{"data":e});      //No I18N  
		})

		ui.addEventListener("mousemove",function(e){
			OSheet.topic.publish(OSheet.Listeners,OSheet.Events.Grid.move ,{"data":e});      //No I18N  
		})
	}

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.sheetPane,bindMouseWheel ,"ui");//No I18N   			
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.sheetPane,clickBinder ,"ui");//No I18N   			

	
})(this)

	
