/*$Id$*/
(function(contxt, dataPtr) {

    function onRightArrow(e, k) {
            console.log("e  onRightArrow",e," k ",k);
    }

    function onLeftArrow(e, k) {
        console.log("e onLeftArrow",e," k ",k);
    }

    function onUpArrow(e, k) {
        console.log("e onUpArrow",e," k ",k);
    }

    function onDownArrow(e, k) {
        console.log("e onDownArrow",e," k ",k);
    }



    Util.topic.register(Util.Listeners, "Right", onRightArrow, "Evt", "keys");//No I18N
    Util.topic.register(Util.Listeners, "Left", onLeftArrow, "Evt", "keys");//No I18N

    Util.topic.register(Util.Listeners, "Up", onUpArrow, "Evt", "keys");//No I18N
    Util.topic.register(Util.Listeners, "Down", onDownArrow, "Evt", "keys");//No I18N

})(this);
