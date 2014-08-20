/*$Id$*/
/*
 * Below util methods use to change the appearance of cell content
 * CSS property             -           Appearance
 *
 *  font-style              -           italic                          | normal
 *
 *  font-weight             -           bold                            | normal  | bolder | lighter | normal | inherit | 100 - 900
 *
 *  text-decoration         -           line-through (Strikethrough)
 *                                      overline                        | none
 *                                      underline
 *                                      
 *      (Note : We can decorate text through mentioned above three types of values together)
 *
 *  font-size               -           Number                          | initial | large | larger | x-large | xx-large | medium | small | smaller | x-small | xx-small
 *  font-family             -           Fontface name
 *  color                   -           color code
 *
 *  font-variant            -           small-caps
 *  text-transform          -           capitalize
 *                                      lowercase                       | none
 *                                      uppercase
 *
 *  -vendorprefix-transform -           rotate( angle in deg )
 *
 *      (Note : Text rotation by applying css transform property to the cell relavent Element)
 *
 *   letter-spacing         -           Number
 *   word-spacing           -           Number
 *
 *  Changing selected text appearance through  execCommand
 *      Example code :- rcedit.contentDocument.execCommand ('insertHTML', false,"<span style='background:green'>"+rcedit.contentDocument.getSelection().toString()+"</span>");
 */
(function(ctx){


    var contentStyle    =   {           // Here may goes consideration to the default for each properties
        "font-size"       	:   "",   //No I18N
        "font-family"     	:   "",  //No I18N
        "font-weight"     	:   "",   //No I18N
        "font-style"      	:   "",   //No I18N
        "text-decoration" 	:   "",   //No I18N
        "color"           	:   ""    //No I18N
   
    }

    var textCrosslines      =   {
        lineThrough     	:   "",     //No I18N
        overLine        	:   "",     //No I18N
        underLine       	:   ""      //No I18N
    }

    var contentFormat	=	{
   		"displayValue"		:   ""	 //No I18N 		
    }

    //  /[{\\"}]/g regex use to remove {}
    //  /[,]/g     regex will remove ""
    // 0 0 0 0 0 0 0 0  respectively bold , italic , underline , strike , overline , fontface , fontsize 

//    var contStyle   =   JSON.stringify(contentStyle).replace(/[{\\"}]/g,"").replace(/[,]/g,";");


    function   applyBold(check){
                contentStyle["font-weight"]         =   (check) ? "bold"    : "normal"; //No I18N
    };

    function   applyItalic(check){
                contentStyle["font-style"]          =   (check) ? "italic"  : "normal"; //No I18N
    };

    function   applySize(size){
                contentStyle["font-size"]           =   size+"px";//No I18N
    };

    function   applyFace(fontFace){
                contentStyle["font-family"]         =   fontFace;//No I18N
    };

    function   applyColor(fontFace){
                contentStyle.color               	=   fontFace;//No I18N
    };

    function   applyLinethrough(check){
                textCrosslines.lineThrough          = (check) ? "line-through"  : ""; //No I18N
                applyCrosslines();
    };

    function   applyUnderline(check){
                textCrosslines.underLine            =  (check) ? "underline"    : "";  //No I18N
                applyCrosslines();
    };

    function   applyOverline(check){
                textCrosslines.overLine             =  (check) ? "overline"     : "";  //No I18N
                applyCrosslines();
    }

    function   applyCrosslines(){
                contentStyle["text-decoration"]    	=    "";//No I18N

                if(textCrosslines.lineThrough.length > 0){
                	contentStyle["text-decoration"]	+=	textCrosslines.lineThrough+"  "; //No I18N
                }
                if(textCrosslines.underLine.length > 0){
                	contentStyle["text-decoration"]	+=	textCrosslines.underLine+"  "; //No I18N
                }
                if(textCrosslines.overLine.length > 0){
                	contentStyle["text-decoration"]	+=	textCrosslines.overLine; //No I18N
                }

                contentStyle["text-decoration"]    	=    (contentStyle["text-decoration"].trim().length === 0) ? "none" : contentStyle["text-decoration"];//No I18N
    }

    function   applyContentValue(value) {    			
    			contentFormat.displayValue			=	value;
    }

    // Below format Keys can be change to number format in future instanted of string, example 0 refers to bold and 1 to italic an etc..   

    var execStyle      =   {
        font            :   applyFace,
        size            :   applySize,
        italic          :   applyItalic,
        bold            :   applyBold,
        color           :   applyColor,
        strike          :   applyLinethrough,
        overline        :   applyOverline,
        underline       :   applyUnderline,
        value       	:   applyContentValue
    }   

    function   excerciseContent(style,args){
                if (execStyle   [style]) {
                    execStyle[style](args);
                }
    }

    function alterContentStyle (styles) {
             for(var i in styles){
              excerciseContent(i, styles[i]);
             }
    }

    /*
        Below codes are used for DOM manipulation to apply Content appearance format of JSON Object
        which contains available format properties to sheetss ss
        Example to applying format through API :- 
            syntax :-   formatContentApperance( startRow,startColumn,endRow,endColumn,{property:value})
                        formatContentApperance(0,0,0,0,{"bold":true})
    */

    function syncDOMandData (uiObj,prop) {
                            for(var i in contentStyle){
                                if(uiObj.hasOwnProperty(i) && (contentStyle[i].trim().length > 0)){
                                    uiObj[i]    =   contentStyle[i];
                                }    
                            }
    }

    function syncContentFormat (uiObj) {
    			for(var j in contentFormat){
    				// uiObj.innerHTML 	=	contentFormat[j];
    			}
    }

    function formatManifestation (cell) {       
    		syncContentFormat(cell);
            var  cellStyle           =   cell.style;
            for (var i = cellStyle.length - 1; i >= 0; i--) {
                var prop            =   cellStyle.item(i);   
                syncDOMandData(cellStyle, prop);          
            }
            
    }

    function  appearanceEnhancement(r,c,cell) {      

                if(cell){ formatManifestation(cell);}
    } 
 

    function formatSelectedAppearance (styles) {        
				var actSheet = sPlusPlus.data.ActiveWorkBook.ActiveSheet;
             var sRange  =   actSheet.Selection.getSelectdRange();
             applyAppearance(sRange.sr,sRange.sc,sRange.er, sRange.ec , styles)
    }

    getCellStyles = function getCellStyles (cell) {    

                        var str = "{";
                        if(cell){
                            var  cellStyle           =   cell.style;
                            var  styles              =   {};
                            
                            for (var i = cellStyle.length - 1; i >= 0; i--) {
                                var prop            =   cellStyle.item(i); 
                                str +=  prop+":"+cellStyle.getPropertyValue(prop); if(0 !== i){ str += ","}
                            }    
                        }                   
                        
                        str += "}";
                        return str;

    }

    formatContentApperance         =   function applyAppearance(sr,sc,er,ec , styles, cell){           // use to developer debug written methods
                                        alterContentStyle(styles);                                
                                        appearanceEnhancement(0,0,cell);
                                        if(Object.keys(styles).length === 0){
                                            return contentStyle;
                                        }
    };

})(window);
