(function (ctx) {
		 var xwin , ywin, winh , winw,rowWidth;
		 var gridHolder, rowHeader1;

		 function main(){
		 		gridHolder.style.width 	= rowWidth+"px";
		 		gridHolder.style.height = window.innerHeight-100+"px";
		 		rowHeader1.style.height =  gridHolder.style.height;
		 		sheetPane.style.height =  gridHolder.style.height;
		 }

		
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.XWIN, function(i){
			xwin =i;
		} ,"data");//No I18N   
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.YWIN, function(i){
			ywin = i;
		} ,"data");//No I18N   
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.WINH, function(i){
			winh = i;
		} ,"data");//No I18N   
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.WINW, function(i){
			winw  = i;
		} ,"data");//No I18N   

		OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.GridHolder, function(i){
			gridHolder  = i;
		} ,"ui");//No I18N   

		OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.sheetPane, function(i){
			sheetPane  = i;
		} ,"ui");//No I18N   

		OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.SheetColsWidth, function(i){
					rowWidth	= ~~(sumArray(i,i.length));
				} ,"data");//No I18N   


		OSheet.topic.register(OSheet.Listeners,OSheet.Events.WorkBook.FullyLoaded, main ,"data");//No I18N   
		OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.RowHeader1, function (i) {
			rowHeader1  = i;
		} ,"ui");//No I18N   


		

		// 
})(this)