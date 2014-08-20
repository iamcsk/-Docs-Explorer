/*$Id$*/
/**
 * User: chandra-1263
 * Date: 24/05/13
 * Time: 10:57 PM
 */
(function(contxt, dataPtr) {

    var eventKeys = ["Esc", "Enter", "Left", "Right", "Up", "Down", "Cmd"];     //No I18N

    function keyRegisters(e, keys, state) {
        for (var i = eventKeys.length - 1; i >= 0; i--) {
            if (eventKeys[i] === keys) {
                EUtil.topic.publish(EUtil.Listeners, eventKeys[i], {'Evt': e, "keys": keys, "state": state}); //No I18N
            }
        }
    }

    function register() {
        for (var i = eventKeys.length - 1; i >= 0; i--) {
            EUtil.topic.create(EUtil.Listeners, eventKeys[i]);
        }
    }

    register();
    // EUtil.topic.register(EUtil.Listeners, "onKeyInput", keyRegisters, "Evt", "keys", "state");    //No I18N
})(this);
