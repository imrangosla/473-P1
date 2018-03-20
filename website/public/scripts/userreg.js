(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-registration="form"]';

  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    dpd.profiles.post(data).then(function(todo) {
      // do something with todo
      console.log(todo); // display {id: "###", message: 'Hello world'}
    }, function(err) {
      // do something with the error
      console.log(err); // display an error if the request failed
    });
  });


})(window);
