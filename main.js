function initApp(){
  var firebaseConfig = {
    apiKey: "AIzaSyDkNn6EnXH18GL5D610xAK-NFJp0-UIFWs",
    authDomain: "home-service-77cd9.firebaseapp.com",
    databaseURL: "https://home-service-77cd9.firebaseio.com",
    projectId: "home-service-77cd9",
    storageBucket: "home-service-77cd9.appspot.com",
    messagingSenderId: "955199412013",
    appId: "1:955199412013:web:0ae5a9ccff9ae7045ce5a4",
    measurementId: "G-Q8WX0VSRP4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log("Firebase init");
}

window.onload = function(){
  initApp();
}
function showSignup(){
  document.getElementById("signin").style.display = 'none';
  document.getElementById("signup").style.display = 'block';
}

function showSignin(){
  document.getElementById("signup").style.display = 'none';
  document.getElementById("signin").style.display = 'block';
}

function signin() {
  console.log("Sign in clicked");
  var email = document.getElementById('your_email').value;
  var password = document.getElementById('your_pass').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
      console.log("Welcome");
      window.location = "map.html";

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
    // ...
  });
}

function signup(){
  console.log("Sign up clicked");
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var rePassword = document.getElementById('re_pass').value;
  var name = document.getElementById('name').value;
  if (email.length < 8) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 6) {
    alert('Please enter a password.');
    return;
  }
  if(password != rePassword){
    alert("Password doesn't match !!\n Re-Type password");
  }
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
      console.log("Welcome %s",name);
      window.location = "map.html";
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error : " + errorMessage);
  // ...
});
}

