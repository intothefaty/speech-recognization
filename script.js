var recognition;

var startButton = document.getElementById('startButton');
var speakButton = document.getElementById('speakButton');
var nameElement = document.getElementById('name');
var diagnostic = document.querySelector('.output');

window.onclick = function(){
  diagnostic.textContent = 'Result: ' + nameElement.value
}

startButton.onclick = function() {
  if (recognition) {
    recognition.start();
    diagnostic.textContent = 'Ready, give me a full name.';
    console.log('Ready, give me a full name.');
  } else {
    diagnostic.textContent = 'An API that supports sound detection could not be found in your browser.';
    console.error('An API that supports sound detection could not be found in your browser.');
  }
};

speakButton.onclick = function() {
  var nameSurname = nameElement.value;
  speak(nameSurname);
};

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = false;
  recognition.lang = 'en';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    var spokenText = event.results[0][0].transcript;
    diagnostic.textContent = 'Result: ' + spokenText + '.';
    
    var nameArray = spokenText.split(" ");
if (nameArray.length >= 2) {
  var fullName = "";
  for (var i = 0; i < nameArray.length; i++) {
    var namePart = nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1);
    fullName += namePart + " ";
  }
  nameElement.value = fullName.trim();
} else {
  diagnostic.textContent = "Please enter a valid first and last name.";
}

  }

  recognition.onspeechend = function() {
    recognition.stop();
  }

  recognition.onnomatch = function(event) {
    diagnostic.textContent = "I did not recognize this name and surname.";
  }

  recognition.onerror = function(event) {
    diagnostic.textContent = 'An error occurred during recognition: ' + event.error;
  }

} else {
  recognition = null;
  startButton.disabled = true;
}

function speak(text) {
  var speech = new SpeechSynthesisUtterance();
  speech.lang = 'en'; 
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
