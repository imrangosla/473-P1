(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-registration="form"]';
  var SERVER_URL = 'http://localhost:2403/profiles';

  var $ = window.jQuery;
  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    $.post(SERVER_URL, data, function(serverResponse) {
      console.log(serverResponse);
    });
  });


})(window);
