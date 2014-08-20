function createSheetsList (sheets) {
	// var sheetList = document.querySelector(".sheetslist");
	 var sheet = document.createElement("div")
	sheet.className = "sheetUI";
	for (var i = 0; i < sheets.length; i++) {
		console.log(sheets[i]," sheet");
		var sheetUI =  sheet.cloneNode();
		sheetUI.innerHTML = sheetlist[i]["_name"];	
		document.querySelector(".sheetslist").appendChild(sheetUI);
	};
}

	
function createColHeader () {
		var colHeadExpander = document.querySelector(".colHeadExpander");
		var colHUI =  document.createElement("div");
		var gcols = document.querySelector(".gcols");
		colHUI.className	=	"colH";
		for(var i=0; i<=colslist.length; i++){
		  	colH =  colHUI.cloneNode();
		  	colH .style.width="80px";
		  	col =  colHUI.cloneNode();
		  	col.style.height=window.innerHeight-100+"px";
		  	col.style.width="80px";
		  	colH .style.position="relative";
		  	colH.innerHTML	=	colslist[i];
		  	gcols.appendChild(col)
		  	colHeadExpander.appendChild(colH)
		} 	
}

function createRowHeader (rowslist) {
		var rowHeadExpander = document.querySelector(".rowHeadExpander");
		var grows = document.querySelector(".grows");
		var rowHUI =  document.createElement("div");
		var rowUI =  document.createElement("div");
		var rowHeight;
		rowHUI.className	=	"rowH";
		rowUI.className		=	"row";
		var h , n , r ;
		for(var i=0; i<=rowslist.length; i++){
		  	var rowH =  rowHUI.cloneNode();
		  	// sheets[0]["sheetData"]["row"].filter(function(o,p,q){ 
		  		
		  		// if(i == ~~o["_r"]){
		  			// console.log(rh," Before ", o["_r"]);
		  			// rh= (o["_r"] === undefined) ? rh : o["_r"];
		  			// console.log("after rh ",rh);
		  			rowH .style.height= "20px";
		  		// }
		  		
		  		console.log(h , " CSK  :: ",n, ": ", i == r, ~~r, " i ",i)
		  		var has = (i == r);
		  		if(sheets[0]["sheetData"]["row"][i] !== undefined){
		  			
		  			n = sheets[0]["sheetData"]["row"][i]["_ht"];
		  			r = sheets[0]["sheetData"]["row"][i]["_r"];
		  		
		  			var rh = (has) ? n : h;
		  			console.log("has ",has);
		  			if(has){
		  				h = sheets[0]["sheetData"]["row"][i]["_ht"];	
		  			}
		  			
		  		}
		  		console.log(sheets[0]["sheetData"]["row"][i]," GG " ,i, " rh ",rh);

		  	// })
		  	// console.log("out rowHeight",god)
		  	// console.log(i," i ",sheets[0]["sheetData"]["row"], "  rowHeight ", " :: ",sheets[0]["sheetData"]["row"][i]);
		  	
		  	var row =  rowH.cloneNode();
		  	row.style.width=window.innerWidth-100+"px";
		  	rowH .style.position="relative";
		  	rowH.innerHTML	=	rowslist[i];
		  	grows.appendChild(row);
		  	rowHeadExpander.appendChild(rowH);
		} 	
}






Array.prototype.sum = function(i){ 
    var sum = 0;
    this.map(function(item,j){  
    	if(j < i){
        sum += item;		// calculate till mentioned index of an array
    	}	
    });
    return sum;
}

function createRows (rows) {
		console.log(rows," rows");
		 var row = document.createElement("div")
		 var col = document.createElement("div")
		 row.className	=	"row";
		 col.className	=	"col";
		for (var i = 0; i < rows.length; i++) {
			var rowUI =  row.cloneNode();
			 rowUI.style.height = (rows[i]["_ht"] * 2)+"px";
			 var cols= rows[i]["c"];
		 		var lefts = [];
			 for(var j in cols){
			 	var colUI =  col.cloneNode();
			 	lefts.push(sheets[c]["cols"]["col"]["_width"] * 5);
			 	var left = lefts.sum(j);
			 	var cType = cols[j]["_t"];
			 	var value = "";
			 	if(cType === "s"){
			 		value = st["si"][cols[j]["v"]]["t"];
			 			console.log(cols[j]["v"]," value ",st["si"][cols[j]["v"]]["t"]);
			 	}else if(cType === "n"){
			 		value = cols[j]["v"];
			 	}
			 	colUI.style.width = (sheets[c]["cols"]["col"]["_width"] * 2)+"px";
			 	colUI.style.left = left+"px";
			 	colUI.innerHTML = value;
				 	rowUI.appendChild(colUI);
			 }	
			 document.querySelector(".sheetTable").appendChild(rowUI);

		};
		console.log(lefts," lefts ");
			
}

function createCols (cols) {
				console.log("col ",cols);
}


function createCell () {
			
}

function createCols(to){
    var a = 97;
    var list = [];
    var full = []
    var times = ~~(to/26);

    for(var j=0; j<times; j++){
            var charArray = [];
            var end = 26;
            if(times == j){
                end= to%26;
            }
            var last = list[list.length-1];           
             for (var i = 0; i<end; i++){   
                if(i <= 26){
                   var e = ""; 
                   if(last !== undefined){
                      e = last[i];
                   }
                    charArray[i] = String.fromCharCode(a + i)+e;         
                    full.push(charArray[i]);
                }        
            }

            list.push(charArray);

    }
    return full;

}


var colslist = createCols(56);


function rowRangeCreator (dim) {
		var range = dim["_ref"].split(":");
		var from = range[0].replace(/[A-Za-z$-]/g, "");
		var to = range[1].replace(/[A-Za-z$-]/g, "");
		var rowH = [];
		for (var i = from; i <= to; i++) {
					rowH.push(i);
			};	
		return rowH;		
}

function createCell (argument) {
			var g;		var rows = sheets[0]["sheetData"]["row"];
			var cell =  document.createElement("div");
			for(var i=0; i<=rows.length; i++){
					var col;
					 for(var x in rows[i]){ 
					 	col =rows[i][x]; 
					 }
			} 	
			console.log(" col ",col);

}


var sheetlist;
var sheets = [];
var st;
function init (argument) {
	setTimeout(function () {
		for(var x in docoffline){if(!isNaN(x)){ 
			if(docoffline[x] !== null && docoffline[x].hasOwnProperty("workbook")){
		       sheetlist  = docoffline[x].workbook.sheets.sheet
		    }
		    if(docoffline[x] !== null && docoffline[x].hasOwnProperty("worksheet")){
		    	console.log("docoffline[x].worksheet ",docoffline[x].worksheet);
		       sheets.push(docoffline[x].worksheet);
		    } 
		    if(docoffline[x] !== null &&  docoffline[x].hasOwnProperty("sst")){
		          st = docoffline[x]["sst"];
		    }
		}}
		createSheetsList(sheetlist);  
		rowRangeCreator();
		createColHeader();
		var rowslist  = rowRangeCreator()
		console.log("rowslist ",rowslist);
		createRowHeader(rowslist);
		createCell()

		

	},3000)
	var rowHead = document.querySelector(".rowHead");		
	rowHead.style.height = (window.innerHeight-100)+"px";
		
}

 window.addEventListener('DOMContentLoaded', init, false);

