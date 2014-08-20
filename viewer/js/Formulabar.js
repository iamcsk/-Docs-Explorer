(function (ctx) {
	var cellData, formulaInputBox, curCell;


	function setSelection (data) {
				if(data.sr !== undefined){

					var sc 	   = data.sc-1;
					var sr 	   = data.sr-1;
                    var cidx   = sc+""+sr;
                    var currObj;
					cellData.filter(function(i,j){
						if(i.idx == cidx){
							currObj = i;
						}
					})

					curCell      =  (currObj !== undefined) ? currObj.cell : null;
					var cellText = (currObj !== undefined) ?  currObj.cell.innerText : ""
					formulaInputBox.innerText =cellText ;

					OSheet.topic.publish(OSheet.Listeners,OSheet.Events.Selection.cell,{"ui":curCell});      //No I18N  	
				}
	}			
	function displayContent (data) {
			data.filter(function(i,j){if(i.idx == 21){
				console.log(i);
			}})
	}

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.Data.CellsList,function(i){
		cellData=i;
	},"data");//No I18N   			

	OSheet.topic.register(OSheet.Listeners,OSheet.Events.Selection.indexer, setSelection ,"data");//No I18N   
	OSheet.topic.register(OSheet.Listeners,OSheet.Events.UI.formulaInputBox, function(i){
		formulaInputBox = i;
	} ,"ui");//No I18N   

})(this)