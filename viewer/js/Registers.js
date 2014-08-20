/*$Id$*/
var OSheet = {};
(function(ctx, undefined){
	var U							  = ctx.OSheet;
  U.Events            = {}; 
	U.topic							=	{};
	U.topic.create					=	function(obj, name) {
												obj[name]	=	{src:obj, registers:[]};
											};
							
	U.topic.register					=	function(obj, name, fn) {
												var g = {};
												g.fn  = fn;

												g.args = Array.prototype.slice.call(arguments, 3);
                             if(typeof(obj[name]) ===  "undefined"){ /*console.log(arguments);console.trace();*/return console.log("Event Name is undefined in register.js :input param : ",arguments, " g ",g," obj[name] ",obj[name]); }    // :debug mode:
												obj[name].registers.push(g);
											};
								
	U.topic.unregister				=	function(obj,name,func)	{
												obj[name].registers	=	U.array.exclude(obj[name].registers, func);
											};
										
	U.topic.contains					=	function(obj,name)	{
												return	!!obj[name].registers.length;
											};

	U.topic.publish					=	function(obj,name,resp)	{
                        if(name === undefined){
                            console.trace();
                            console.log("name",name);

                        }
												var	registers		=	obj[name].registers;
												for(var i=0, len  = registers.length;i<len;++i){
													var args 			=	U.topic.getArgs(registers[i].args, resp);
													registers[i].fn.apply(obj.src, args);
												}
											};
	U.topic.getArgs 					= 	function(args,resp)	{
												var respAry 		=	[];
												var arglen			= 	args.length;
												for(var i=0;i<arglen;i++)	{
													respAry.push(resp[args[i]])
												}
												return respAry;
											};

											
    U.Listeners           =   {};
    U.Gestures						=	  {};      // topic to handle the all the req for I-Pad native gestures.
    U.UserActions         =   {};     //  this topic is to handle all the useraction's


    U.Events.Sheet           =    {
                                Operations :   {
                                    OnZoom                : 1002000,    //    1 0 0 2 0 0 0
                                    ZoomEnd               : 1002001,   //    1 0 0 2 0 0 1
                                    switch                : 1002002,   //    1 0 0 2 0 0 2
                                    onSwitch              : 1002002,   //    1 0 0 2 0 0 3
                                    onSwitchComplete      : 1002003   //    1 0 0 2 0 0 4
                               },
                    }

                    // Grid (Cells) altering utils has been added in this court for while need to reconsider
    U.Events.ViewPort        =      {
                          onHeightChange                   : 1005000, //    1 0 0 5 0 0 0
                          onWidthChange                    : 1005001, //    1 0 0 5 0 0 1
                          Listener                         : 1005002, //    1 0 0 5 0 0 2 
                          onContentHeightChange            : 1005003, //    1 0 0 5 0 0 3
                          onContentWidthChange             : 1005004, //    1 0 0 5 0 0 4 
                          Change                           : 1005005,  
                          onBeforeStable                   : 1005006, //    1 0 0 5 0 0 5       // replace for onBeforeStableStateGrid    
                          onStable                         : 1005007, //    1 0 0 5 0 0 6       // replace for onStableStateGrid    
                          stateChange                      : 1005008, //    1 0 0 5 0 0 8       // replace for viewport event
                          NewCellStyleNames                : 1005009, //    1 0 0 5 0 1 1
                          CellStylesNames                  : 1005010, //    1 0 0 5 0 1 2
                          FilterRespDataForViewPort        : 1005011, //    1 0 0 5 0 1 3 
                          onSwitchSheetAxisData            : 1005012, //    1 0 0 5 0 1 7  // changes regarding viewport
                          MakeFaulty                       : 1005013, //    1 0 0 5 0 1 8
                          SubmitData                       : 1005014, //    1 0 0 5 0 1 9
                          reFillEmptyTails                 : 1005015
        }

        U.Events.Merge       =   {
                          MergeRange                       : 1006000, //    1 0 0 6 0 0 0        // Need to reconsider
                          onBeforeMerge                    : 1006001,//    1 0 0 6 0 0 1
                          onMerge                          : 1006002, //    1 0 0 6 0 0 2
                          SplitRange                       : 1006003, //    1 0 0 6 0 0 3
                          onSplitRange                     : 1006004, //    1 0 0 6 0 0 4
                          onBeforeSplitRange               : 1006005 //    1 0 0 6 0 0 5
        }                            

        U.Events.Row         =   {

                          Insert                        : 1003000, //    1 0 0 3 0 0 0
                          Delete                        : 1003001, //    1 0 0 3 0 0 1
                          onInsert                      : 1003002, //    1 0 0 3 0 0 2
                          onDelete                      : 1003003, //    1 0 0 3 0 0 3
                          Hide                          : 1003004, //    1 0 0 3 0 0 4
                          Show                          : 1003005, //    1 0 0 3 0 0 5
                          onHide                        : 1003006, //    1 0 0 3 0 0 6
                          onShow                        : 1003007, //    1 0 0 3 0 0 7
                          Resize                        : 1003008, //    1 0 0 3 0 0 8
                          onResize                      : 1003009, //    1 0 0 3 0 0 9
                          onBeforeHide                  : 1003010, //    1 0 0 3 0 1 0
                          onBeforeShow                  : 1003011 //    1 0 0 3 0 1 1    
        }
        U.Events.Column         =   {

                          Insert                        : 1004000,   //    1 0 0 4 0 0 0              
                          Delete                        : 1004001,  //    1 0 0 4 0 0 1
                          onInsert                      : 1004002,  //    1 0 0 4 0 0 2
                          onDelete                      : 1004003,  //    1 0 0 4 0 0 3
                          Hide                          : 1004004,  //    1 0 0 4 0 0 4
                          Show                          : 1004005,  //    1 0 0 4 0 0 5
                          onHide                        : 1004006,  //    1 0 0 4 0 0 6
                          onShow                        : 1004007,  //    1 0 0 4 0 0 7
                          Resize                        : 1004008, //    1 0 0 4 0 0 8
                          onResize                      : 1004009, //    1 0 0 4 0 0 9
                          onBeforeHide                  : 1004010,  //    1 0 0 4 0 1 0
                          onBeforeShow                  : 1004011,  //    1 0 0 4 0 1 1
                          onBeforeDelete                : 1004012,  //    1 0 0 4 0 1 2 
                          onBeforeInsert                : 1004013  //    1 0 0 4 0 1 3     
        }     

        U.Events.Selection       = {
                                  Start                    : 1007000,     
                                  Move                     : 1007001, //    1 0 0 7 0 0 0
                                  End                      : 1007002,  //    1 0 0 7 0 0 1
                                  RangeStart               : 1007003,  //    1 0 0 7 0 0 2
                                  RangeMove                : 1007004,  //    1 0 0 7 0 0 3
                                  RangeEnd                 : 1007005,  //    1 0 0 7 0 0 4
                                  ActiveCell               : 1007006,  //    1 0 0 7 0 0 5
                                  ActiveCellRange          : 1007007,  //    1 0 0 7 0 0 6
                                  Edit                     : 1007008,  //    1 0 0 7 0 0 6
                                  indexer                  : 1007009,
                                  cell                     : 1007010,
        }

        U.Events.Gears     = {
                          DocumentMeta                     : 1009000,  //    1 0 0 9 0 0 0  
                          UsersMetaInfo                    : 1009001,  //    1 0 0 9 0 0 1
                          CollabInfo                       : 1009002,  //    1 0 0 9 0 0 2
                          Device                           : 1009003,  //    1 0 0 9 0 0 3
                          getSheetNames                    : 1009004,  //    1 0 0 9 0 0 4
                          DocumentName                     : 1009005                 
        }

        U.Events.Mouse   = {
                          scrollX                           : 1008000, //    1 0 0 8 0 0 0
                          scrollY                           : 1008001,//    1 0 0 8 0 0 1
                          scrollXY                          : 1008002,//    1 0 0 8 0 0 2
                          WheelX                            : 1008003, //    1 0 0 8 0 0 3
                          WheelY                            : 1008004,//    1 0 0 8 0 0 5
                          Pane0WheelXY                      : 1008005,//    1 0 0 8 0 0 6
                          Pane1WheelXY                      : 1008006,//    1 0 0 8 0 0 7
                          Pane2WheelXY                      : 1008007,//    1 0 0 8 0 0 8
                          Pane3WheelXY                      : 1008008,//    1 0 0 8 0 0 9
                          Up                                : 1008009,//    1 0 0 8 0 1 0
                          Down                              : 1008010,//    1 0 0 8 0 1 1
                          Move                              : 1008011,//    1 0 0 8 0 1 2
                          DrageMove                         : 1008012,//    1 0 0 8 0 1 3
                          DBClick                           : 1008013,
                          Click                             : 1008014,
        }     


        U.Events.WorkBook   =   {
                                UILoad                      : 1001000,
                                UIinitialised               : 1001001,
                                Key                         : 1001002,
                                XWIN                         : 1001003,
                                YWIN                         : 1001004,
                                YWIN                         : 1001005,
                                WINH                         : 1001006,
                                WINW                         : 1001007,
                                ParseComplete                : 1001008,
                                FullyLoaded                   : 1001009,

        }


        U.Events.Data       = {
                               DOCUMENT_META  : 1010000,
                               USERS_METAINFO : 1010001,
                               LOADINGVAR     : 1010002,          // initiating var from the server   
                               COLLAB_INFO    : 1010003,
                               responseManager: 1010004,
                               Format         : 1010005,
                               SHEET_META     : 1010006,
                               PUSHCHANGES    : 1010007,
                               ROW_HEAD_DEFINITION : 1010008,
                               COL_HEAD_DEFINITION : 1010009,
                               ROW_HEADERS         : 1010010,
                               COL_HEADERS         : 1010011,
                               CELL_RESPONSE       : 1010012,
                               CellsList           : 1010013

        }

        U.Events.JSON    =   {
                                 Data         : 1011000,
                                 Init         : 1011001,
                                 WorkBook     : 1011002,
                                 Sheets       : 1011003,
                                 SharedString : 1011004,
                                 StyleSheet   : 1011005,
                                 StyleList    : 1011006,
                                 Theme        : 1011007,
                                 SheetRows        : 1011008,
                                 SheetCols        : 1011009,
                                 SheetCells        : 1011010,
                                 RowsTopArray       : 1011011,
                                 ColsLeftArray      : 1011012,
                                 SheetColsWidth     : 1011013,
                                 SheetRowsHeight    : 1011014,
                                 SheetColsWidth     : 1011015,
                                 SheetColsIndex     : 1011016,
                                 Properties         : 1011017,
                                 availableRange     : 1011018,
                                 HyperLink          : 1011019,
                                 Comment            : 1011020,
                                 ExternalLink       : 1011021
        } 



        U.Events.UI    =   {
                                 SheetsList                 : 1012000,
                                 GridHolder                 : 1012001,
                                 RowHeader                  : 1012002,
                                 ColHeader                  : 1012003,
                                 RowHeader1                 : 1012004,
                                 ColHeader1                 : 1012005,
                                 RowsHolder                 : 1012006,
                                 ColsHolder                 : 1012007,
                                 sheetPane                  : 1012008,
                                 colHead                    : 1012009,
                                 docInformer                : 1012010,
                                 formulaInputBox            : 1012011,
                                 bold                       : 1012012,
                                 underline                  : 1012013,
                                 italic                     : 1012014,
                                 strikethrough              : 1012015,
                                 fontcolor                  : 1012016,
                                 bgcolor                    : 1012017,
                                 fontSize                   : 1012018,
                                 fontFamily                 : 1012019,
                                 CellsHolder                : 1012020
        } 

        U.Events.CellFormat = {
                                Bold                        : 1013000,
                                Italic                      : 1013001,
                                Underline                   : 1013002,
                                StrikeThrough               : 1013003,
                                FontFamily                  : 1013004,
                                FontSize                    : 1013005,
                                FontColor                   : 1013006,
                                BackgoundColor              : 1013007,
                                HorizontalAlign             : 1013008,
                                VerticalAlign               : 1013009,
                                Wrap                        : 1013010,
                                Border                      : 1013011,
                                ContentFormat               : 1013012,
                                displayValue                : 1013013,
                                HyperLink                   : 1013014
        }

        U.Events.CellReview = {
                              Comment                      : 1014000
        }  


      OSheet.Events.DocumentMouseScrollXY  = {   // 1008002
          sheetPane  : 1008002000,
      };

      OSheet.Events.ColHeader             = { // 1012002
                    click     : 1012003000
      }
      OSheet.Events.RowHeader             = { // 1012002
                    click     : 1012002000
      }
        
        function createUtilEvent(eve){
            for(var j in eve){
                    U.topic.create(U.Listeners, eve[j]);    //No I18N
            }
        }                    

        OSheet.Events.Grid           = { //extent of 1008014
                    sheetPane : 1008014000,
                    move      : 1008014001
        } 

        createUtilEvent(U.Events.Sheet.Operations);     
        createUtilEvent(U.Events.Selection);     
        createUtilEvent(U.Events.Merge);     
        createUtilEvent(U.Events.Row);     
        createUtilEvent(U.Events.Column);     
        createUtilEvent(U.Events.Mouse);     
        createUtilEvent(U.Events.ViewPort);     
        createUtilEvent(U.Events.WorkBook);     
        createUtilEvent(U.Events.Data);
        createUtilEvent(U.Events.JSON);
        createUtilEvent(U.Events.UI);
        createUtilEvent(U.Events.CellFormat);
        createUtilEvent(U.Events.Gears);

        createUtilEvent(U.Events.DocumentMouseScrollXY);
        createUtilEvent(OSheet.Events.Grid);
        createUtilEvent(OSheet.Events.RowHeader);
        createUtilEvent(OSheet.Events.ColHeader);
        createUtilEvent(OSheet.Events.CellReview);
	
})(this);

