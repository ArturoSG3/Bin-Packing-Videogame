function load() { 
  var button1 = document.getElementById("level1");
  const inputTextField = document.getElementById('userName') 

  button1.addEventListener("click", function(){
  	name = inputTextField.value
  	if(name.length >= 13 && /\d/.test(name)){
  		localStorage.setItem("user", name);
  		window.document.location = './selector.html';
  	} else if(name.length < 13){
  		document.getElementById("userText").innerHTML = "The user name you entered has " + name.length + " characters. A valid one must have at least 13.";
  	} else{
  		document.getElementById("userText").innerHTML = "The user name must have at least 1 number.";
  	}
  }, false); 
} 