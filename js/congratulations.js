function load() { 
  var button1 = document.getElementById("Play"); 
  var button2 = document.getElementById("Finish"); 
  var user = localStorage.getItem("user")
  button1.addEventListener("click", function(){
  	localStorage.setItem("user", user)
  	window.document.location = './selector.html';
  }, false); 
  button2.addEventListener("click", function(){window.document.location = './index.html';}, false); 
} 