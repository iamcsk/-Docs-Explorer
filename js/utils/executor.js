/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx, undefined){
    var U                           =   ctx.EUtil;
    U.topic                         =   {};
    U.topic.create                  =   function(obj, name) {
                                                if(obj === undefined){
                                                    console.trace();
                                                }
                                                obj[name]   =   {src:obj, registers:[]};
                                            };
                            
    U.topic.register                    =   function(obj, name, fn) {
                                                var g = {};
                                                g.fn  = fn;

                                                g.args = Array.prototype.slice.call(arguments, 3);
                                                obj[name].registers.push(g);
                                            };
                                
    U.topic.unregister              =   function(obj,name,func) {
                                                obj[name].registers =   U.array.exclude(obj[name].registers, func);
                                            };
                                        
    U.topic.contains                    =   function(obj,name)  {
                                                return  !!obj[name].registers.length;
                                            };

    U.topic.publish                 =   function(obj,name,resp) {
                                                // console.log(obj," name ",name," resp ",resp);
                                                var registers       =   obj[name].registers;
                                                for(var i=0, len  = registers.length;i<len;++i){
                                                    var args            =   U.topic.getArgs(registers[i]["args"], resp);//No I18N
                                                    registers[i]["fn"].apply(obj.src, args);//No I18N
                                                }
                                            };
    U.topic.getArgs                     =   function(args,resp) {
                                                var respAry         =   [];
                                                var arglen          =   args.length;
                                                for(var i=0;i<arglen;i++)   {
                                                    respAry.push(resp[args[i]])
                                                }
                                                return respAry;
                                            };

                                            
    U.Listeners                     =   {};

  var events  =   [
       "load","online","offline","getZDLocalfiles","uiload","explorercolrow","eplMainScroll","eplHeadScroll","zdrequest","onauthsuccess","fileItemClick",      //No I18N
       "updateLocalStorage","loadFileContent","createnewtab" //No I18N
   ]; //No I18N

   for (var i = events.length - 1; i >= 0; i--) {
       U.topic.create(EUtil.Listeners, events[i]);
   };
    
    
})(this);