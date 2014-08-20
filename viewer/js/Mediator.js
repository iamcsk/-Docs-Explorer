(function (ctx) {
		 var uiComplete = false;
		 var dataComplete = false;
		 function uiinit(i){
		 	uiComplete = i;
		 }
		 function datainit(i){
		 	dataComplete = i;
		 	OSheet.topic.publish(OSheet.Listeners,OSheet.Events.WorkBook.FullyLoaded, {"data":true});//No I18N    
		 }
		
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.ParseComplete, datainit ,"data");//No I18N    
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.UIinitialised, uiinit  ,"data");//No I18N    
})(this)