/*$Id$*/
var webview = document.querySelector('webview');  //No I18N

  document.querySelector('#home').onclick = function() {   //No I18N
    webview.src = "www.docs.zoho.com";      //No I18N
  };

  document.querySelector('#reload').onclick = function() {//No I18N
    if (isLoading) {
      webview.stop();
    } else {
      webview.reload();
    }
  };
  document.querySelector('#reload').addEventListener(   //No I18N
    'webkitAnimationIteration',    //No I18N
    function() {
      if (!isLoading) {
        document.body.classList.remove('loading');  //No I18N
      }
    });

   document.querySelector('#back').onclick = function() {   //No I18N
    webview.back();
  };

  document.querySelector('#forward').onclick = function() {  //No I18N
    webview.forward();
  };

//console.log("CSK",webview);