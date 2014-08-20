
(function (ctx) {
	var UI = {};
	var U = OSheet;

	function main () {
			var ui;	
			for(var j in U.Events.UI){
				var ui  = ctx.document.querySelector("."+j);
				// console.log("ui ",ui);
				OSheet.topic.publish(OSheet.Listeners,OSheet.Events.UI[j],{"ui":ui});      //No I18N  
			}
	}

	window.addEventListener("DOMContentLoaded", function() {
		OSheet.topic.publish(OSheet.Listeners,OSheet.Events.WorkBook.UIinitialised,{"data":true});      //No I18N  
	})	 
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.UIinitialised, main ,"data");//No I18N    
	// main();

})(this)