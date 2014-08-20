/*$Id$*/
/**
 * User: chandra-1263
 * Date: 24/03/13
 * Time: 7:54 PM
 */
var   sheetEvents    =       {
  
                      add   :   function(obj, type, method, bub) {
                                bub = bub || false;
                                if (obj.addEventListener){
                                    obj.addEventListener(type, method, bub);  
                                } 
                                else if (obj.attachEvent){
                                    obj.attachEvent("on" + type, method);//No I18N
                                }
                      }, 
                      remove    :   function(obj, type, method, bub) {
                                    bub = bub || false;
                                    if (obj.removeEventListener){
                                        obj.removeEventListener(type, method, bub);  
                                    } 
                                    else if (obj.detachEvent){
                                        obj.detachEvent("on" + type, method);//No I18N
                                    } 
                      }, 

                      protect   :   function(ev) {
                                    if (!ev.preventDefault){
                                        ev.preventDefault = function () { 
                                        return false; 
                                        }  
                                    } 
                                    if (!ev.stopPropagation){
                                        ev.stopPropagation = function () { 
                                            if (window.event){ window.event.cancelBubble = true;}
                                        }  
                                    } 
                                    return ev;
                      },
                      getSrc         :   function(e){
                                         e.tgt = e.srcElement ? e.srcElement: e.target;
                                         return  e.tgt;
                      },
                      getCapturePos   :   function(e){
                                            this.capturePos    =   {};
                                            if(!this.client && !this.page){        // browser support
                                                this.client   =   (e.clientX) ? true : false;
                                                this.page     =    (e.pageX)  ? true : false;
                                            }
                                            if(this.client){
                                                this.capturePos.x   =   e.clientX;
                                                this.capturePos.y   = e.clientY;
                                            }else if(this.page){
                                                this.capturePos.x   = e.pageX;
                                                this.capturePos.y   = e.pageY;
                                            }
                                            return this.capturePos;
                     }
}