/*$Id$*/
/**
 * User: chandra-1263
 * Date: 24/05/13
 * Time: 10:57 PM
 */

(function(contxt, dataPtr) {

    var context = document.querySelector("body"); //No I18N
    var Util = EUtil;
    var keyStore = {
        cKey: "", //No I18N
        cVal: "", //No I18N
        cKeyComp: "", //No I18N
        shiftCom: [],
        shiftHybrid: {
            "key": "", //No I18N
            "val": ""//No I18N
        },
        magicKeys: {
            "16": "Shift", //No I18N
            "18": "Alt", //No I18N
            "18" : "Opt", //No I18N
                    "91": "Cmd", //No I18N
            "93": "Cmd", //No I18N
            "9": "Tab", //No I18N
            "20": "CabsLock", //No I18N
            "27": "Esc", //No I18N
            "8": "Delete", //No I18N
            "13": "Enter", //No I18N
            "33": "PageUp", //No I18N
            "34": "PageDown", //No I18N
            "35": "End", //No I18N
            "36": "Home", //No I18N
            "37": "Left", //No I18N
            "38": "Up", //No I18N
            "39": "Right", //No I18N
            "40": "Down", //No I18N
            "45": "Insert", //No I18N
            "45" : "Delete"//No I18N
        },
        opr: ""

    }

    function keydown(e) {
        dataPtr.sheetEvents.protect(e);
        keyStore.cKey = getKeyCode(e);
        keyStore.cVal = String.fromCharCode(keyStore.cKey);
        var req = false;
        for (var key in keyStore.magicKeys)
        {
            if (keyStore.magicKeys.hasOwnProperty(keyStore.cKey))
            {
                if (keyStore.cKey === key) {
                    keyStore.opr = (keyStore.cKeyComp.length > 0) ? keyStore.opr = "+" : "";    //No I18N
                    keyStore.cKeyComp += keyStore.opr + keyStore.magicKeys[key]
                }
            } else {
                req = true;
            }
        }


        if (keyStore.cKeyComp === "Shift") { //No I18N
            if (keyStore.shiftCom.length < 2){
                keyStore.shiftCom.push(keyStore.cKey);
            }
            if (keyStore.shiftCom.length === 2) {
                keyStore.shiftHybrid.key = (keyStore.shiftCom[0] > keyStore.shiftCom[1]) ? keyStore.shiftCom[0] - keyStore.shiftCom[1] : keyStore.shiftCom[1] - keyStore.shiftCom[0];
                keyStore.shiftHybrid.val = String.fromCharCode(keyStore.shiftHybrid.key);
            }
            keyStore.opr = (keyStore.cKeyComp.length > 0) ? keyStore.opr = "+" : "";
        }

        if (req) {
            if (keyStore.cKeyComp.indexOf(keyStore.cVal) === -1){
                keyStore.cKeyComp += keyStore.opr + keyStore.cVal;
            }
        }
        keyStore.state = 0;

        // Util.topic.publish(Util.Listeners, "onKeyInput", {'Evt': e, "keys": keyStore.cKeyComp, "state": keyStore.state});//No I18N

    }

    function keypress(e) {
        dataPtr.sheetEvents.protect(e);
        // keyStore.cKey	=	 getKeyCode(e);
        // contextsole.log("calling on keypress ",getKeyCode(e));
    }

    function keyup(e) {

        // dataPtr.sheetEvents.protect(e);
        keyStore.state = 3;
         // Util.topic.publish(Util.Listeners, "onKeyInput", {'Evt': e, "keys": keyStore.cKeyComp, "state": keyStore.state});//No I18N

        keyStore.cKeyComp = "";
        keyStore.shiftCom = [];


    }

    function getKeyCode(e) {
        return (e.keyCode) ? e.keyCode : e.keyCode;
    }



    dataPtr.sheetEvents.add(document, "keydown", keydown, true);//No I18N
    dataPtr.sheetEvents.add(document, "keypress", keypress, true);//No I18N
    dataPtr.sheetEvents.add(document, "keyup", keyup, true);//No I18N

})(this,parent);






