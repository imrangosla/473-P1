(function(window) {
  //check if user is logged in already
  dpd.profiles.me(function(user) {
    if (user) {
      location.href = "/index.html";
    }
  });

  'use strict';
  var FORM_SELECTOR = '[data-registration="form"]';

  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);

  //check if passswords match
  formHandler.addSubmitHandler(function(data) {
    //convert username to lower
    data.username = data.username.toLowerCase();

    //check if passwors match
    if (data.password != data.confirmP) {
      alert("Passwords dont match");
      return;
    }
    //check of password has one letter and number/length correct
    if(checkPwd(data.password) == '-1') {
      return;
    }

    dpd.profiles.post(data).then(function(response) {
      window.location.replace('login.html');
      //console.log(todo); // display {id: "###", message: 'Hello world'}
    }, function(err) {
      if(err.status == '400') {
        alert('Username Taken');
      }
    });
  });

  //https://stackoverflow.com/questions/7844359
  var checkPwd = function(pass) {
    if (pass.length < 6) {
      alert("Password too short");
      return -1;
    } else if (pass.length > 32) {
      alert("Password must be more than 6 characters long");
      return -1;
    } else if (pass.search(/\d/) == -1) {
      alert("Password must include a number");
      return ("no_num");
    } else if (pass.search(/[A-Z]/) == -1) {
      alert("Password must contain one uppercase letter");
      return ("no_letter");
    } else if (pass.search(/[a-z]/) == -1) {
      alert("Password must contain one lowercase letter");
      return -1;
    }
    return 1;
  };

})(window);
