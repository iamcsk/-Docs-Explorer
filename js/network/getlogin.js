/*$Id$*/
/**
 * User: chandra-1263
 * Date: 29/09/13
 * Time: 2:20 PM
 */
(function(ctx) {
		var logindialog;
		var key = 'authToken'; //No I18N
		var uname;
		var pwd;
        var aLogin;
    EUtil.login 	=	function() {
        					EUtil.ui.blur(document.getElementById("main"),5) //No I18N
        					EUtil.ui.clearBlur(document.getElementById("main"))  //No I18N
		}

    EUtil.ui		=	{
							blur	: function(el,val){
										el.style.webkitFilter="blur("+val+"px)"; //No I18N
							},
							clearBlur	: function(el){
										el.style.webkitFilter="blur(0px)"; //No I18N
							},
							signOut		: 	function(){
                                EUtil.ui.blur(document.getElementById("main"),5);    //No I18N
											document.getElementById("listfiles").innerHTML="";  //No I18N
                                EUtil.ui.openLogin();
											document.getElementById("uiuid").innerHTML="";   //No I18N
							},
							openLogin	:  function(){
											document.querySelector("#ldopen").click();   //No I18N
							},
							closeLogin	:  function(){
											document.querySelector("#ldclose").click();   //No I18N
							}

		}	

		function opelogindialog(){
						setTimeout(function(){
							var singed = getAlreadySigned();
							document.querySelector("#ldopen").click(); //No I18N
						},1000)
		}	

		function closeLogDialog () {
//					console.log("calling");
					setTimeout(function(){
							EUtil.ui.clearBlur(document.getElementById("main"));  
						},1000)
					
		}

		function bind () {
		}

		ctx.EUtil.topic.register(ctx.EUtil.Listeners, "load", bind); //No I18N
		ctx.EUtil.topic.register(ctx.EUtil.Listeners, "onauthsuccess",closeLogDialog); //No I18N
})(this);