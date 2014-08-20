var colLeftArr , rowTopArr;
(function (ctx) {

	// console.log(colLeftArr," :: ",rowTopArr);
	// console.log("tmp good ");	
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.ColsLeftArray, function(i){
		colLeftArr = i;
	} ,"data");//No I18N   
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.JSON.RowsTopArray, function(i){
		rowTopArr = i;
	} ,"data");//No I18N   
})(this)