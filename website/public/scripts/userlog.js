(function(window) {
  //check if user is logged in already
  dpd.profiles.me(function(user) {
    if (user) {
      location.href = "/create.html";
    }
  });

  'use strict';
  var FORM_SELECTOR = '[data-login="form"]';

  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);

  //get username and password
  formHandler.addSubmitHandler(function(data) {
    //convert username to lower
    data.username = data.username.toLowerCase();

    dpd.profiles.login(data, function(result, error) {
      //wrong username or password
      if (result == null) {
        alert(error.message);
      } else {
        window.location.replace('create.html');
      }
    });
  });

})(window);
