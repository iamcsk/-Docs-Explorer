/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
/*
    Explorer window creations posibilities:-

                App normal lanuch 
                App restarted 
                Minimum width  and height setted as 900 * 600 small screens
                Maximum height and width setted repectively form available screen dimension

*/

function createExplorer (runnertype) {
        // if(runnertype === "onRestarted"){
        //     chrome.storage.local.remove("AUTHTOKEN");
        // }
        chrome.app.runtime[runnertype].addListener(function(data) {
            chrome.app.window.create('index.html',                   //No I18N
                {
                    bounds: {
                            width:screen.width,
                            height:screen.height
                    },  
                    minWidth:900, 
                    maxWidth: screen.width,
                    minHeight:600, 
                    maxHeight: screen.height,
                    frame:"none",
                    id:"ZDExplorer"  //No I18N
                }, 
                function(app_win) {
                        app_win.contentWindow.__MGA__bRestart = false;
                }
            );
        });
}



createExplorer("onLaunched"); //No I18N
createExplorer("onRestarted"); //No I18N


