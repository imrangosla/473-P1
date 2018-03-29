(function(window) {
  var $ = window.jQuery;
  var username;
  var cardMade = false;
  var oldCard;


  //check if user is not logged in
  dpd.profiles.me(function(user) {
    if (!user) {
      location.href = "/index.html";
    } else {
      username = user;
    }
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
  var check = function(userN) {
    dpd.cards.get({
      user: userN
    }, function(results, error) {
      if(error) {
        console.log(error);
      }
      else {
        cardMade = true;
        oldCard = results[0];
      }
    });
  };
  check(username);


  formHandler.addSubmitHandler(function(data) {
    //form validations


    //submit
    //add the username associated
    data.user = username;
    //add id to update card instead if already made
    if(cardMade) {data.id = oldCard.id;}
    //console.log(data);


    dpd.cards.post(data).then(function(todo) {
      // do something with todo
      console.log(todo);
      alert('Business card submitted!')
    }, function(err) {
      // do something with the error
      console.log(err); // display an error if the request failed
    });
  });

})(window);
