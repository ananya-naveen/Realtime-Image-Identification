function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded(){
  console.log("Model is Loaded");
}

function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResults);
}

var previousResult="";

function gotResults(error,results){
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confidence>0.5) && (previousResult!=results[0].label)){
      console.log(results);
      previousResult=results[0].label;
      var synth=window.speechSynthesis;
      speckData="the object detected is"+results[0].label;
      var utterThis=new SpeechSynthesisUtterance(speckData);
      synth.speak(utterThis);
      document.getElementById("resultObjectName").innerHTML=results[0].label;
      document.getElementById("resultObjectAccuracy").innerHTML=Math.floor(results[0].confidence*100)+"%";
    }
  }
}