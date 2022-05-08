prediction_1="";
prediction_2="";

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>'
    });
}

console.log('ml5version:', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FOwdyI1ku/model.json', modelLoaded);
function modelLoaded(){
    console.log("Model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1="First prediction is - " + prediction_1;
    speak_data2= "Second prediction is - " + prediction_2;
    var utter_this = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utter_this);
    
}

function identifyemoji(){
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);

}

function gotResult(error, results){
   if(error){
       console.error(error);
    
   }

   else{
console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
prediction_1=results[0].label;
prediction_2=results[1].label;
speak();
if(results[0].label == "happy"){
document.getElementById("update_emoji").innerHTML =  "&#128515;"

}
if(results[0].label == "sad"){
    document.getElementById("update_emoji").innerHTML="&#128532;";
}

if(results[0].label == "angry"){
    document.getElementById("update_emoji").innerHTML="&#128545;";
}

if(results[1].label == "happy"){
    document.getElementById("update_emoji2").innerHTML=" &#128515;";
}

if(results[1].label == "sad"){
    document.getElementById("update_emoji2").innerHTML="&#128532;";
}
if(results[1].label == "angry"){
    document.getElementById("update_emoji2").innerHTML="&#128545;";
}
   }
}