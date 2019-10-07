function load() { 
  var button1 = document.getElementById("level1"); 
  var button2 = document.getElementById("level2"); 
  var button3 = document.getElementById("level3"); 
  var button4 = document.getElementById("level4"); 
  var button5 = document.getElementById("level5"); 
  var button6 = document.getElementById("level6"); 
  var button7 = document.getElementById("level7");
  var button8 = document.getElementById("level8"); 
  var button9 = document.getElementById("level9"); 
  var button10 = document.getElementById("level10"); 
  var button11 = document.getElementById("level11"); 
  var button12 = document.getElementById("level12"); 
  var user = localStorage.getItem("user")
  button1.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 0;
  }, false); 
  button2.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 1;
  }, false); 
  button3.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 2;
  }, false); 
  button4.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 3;
  }, false); 
  button5.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 4;
  }, false); 
  button6.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 5;
  }, false); 
  button7.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 6;
  }, false); 
  button8.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 7;
  }, false); 
  button9.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 8;
  }, false); 
  button10.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 9;
  }, false); 
  button11.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 10;
  }, false); 
  button12.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './level.html' + '?' + 11;
  }, false); 
} 