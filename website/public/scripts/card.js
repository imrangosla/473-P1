(function(window) {
  var $ = window.jQuery;


  //check if user is not logged in
  dpd.profiles.me(function(user) {
    if (!user) {
      location.href = "/index.html";
    }
    //view card button
    var cardBtn = $('#viewcard')[0];
    cardBtn.onclick = function() {
      //console.log(user.username);
      location.href = "/card.html?user=" + user.username;
    };
  });



  //log out button
  var logoutBtn = $('#logout')[0];
  logoutBtn.onclick = function() {
    dpd.profiles.logout(function(result, error) {
      if (error) {
        alert(error);
      }
      location.href = "/index.html";
    });
  };

  'use strict';
  var FORM_SELECTOR = '[data-card="form"]';

  var App = window.App;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);

  //check if user has card already
  var check = function(userN, data) {
    dpd.cards.get({
      userID: userN['id']
    }, function(results, error) {
      if (error) {
        console.log(error);
        return;
      } else if (results.length != 0) {
        data.id = results[0].id;
      }
      //console.log(data);
      dpd.cards.post(data).then(function(todo) {
        console.log(todo);
        alert('Business card updated!');
      }, function(err) {
        console.log(err); // display an error if the request failed
      });
      return;
    });
  }; //end of check

  formHandler.addSubmitHandler(function(data) {
    var submit = new Object();
    //form validations

    //get user id
    //check if user is not logged in
    dpd.profiles.me(function(user) {
      if (user) {
        //add the username associated
        submit.userId = user['id'];
        submit.user = user.username;
        submit.card = data;

        //add id to update card instead if already made and post
        check(user, submit);
      }
    });
  }); //end form handler



})(window);
