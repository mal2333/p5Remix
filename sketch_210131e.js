let video;
let poseNet;
let pose;
let indexN = 0, indexM = 0, indexER = 0, indexEL = 0;
let valueN = 0, valueM = 0, valueER = 0, valueEL = 0;
let nose, eyeR, eyeL, d;
let ear1, ear2, ear3;
let mouth1, mouth2, mouth3, mouth4;
let eye1, eye2, eye3, eye4;
let nose1, nose2, nose3;

function preload(){
  ear1=loadImage('data/ear1.svg');
  ear2=loadImage('data/ear2.svg');
  ear3=loadImage('data/ear3.svg');
  nose1=loadImage('data/nose1.svg');
  nose2=loadImage('data/nose2.svg');
  nose3=loadImage('data/nose3.svg');
  mouth1=loadImage('data/mouth1.svg');
  mouth2=loadImage('data/mouth2.svg');
  mouth3=loadImage('data/mouth3.svg');
  eye1=loadImage('data/eye1.svg');
  eye2=loadImage('data/eye2.svg');
  eye3=loadImage('data/eye3.svg');
  eye4=loadImage('data/eye4.svg');
}

function setup() {
  createCanvas(640, 480);
  index=0;
  value=0;
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses);  
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    //console.log(pose);
    eyeR = pose.rightEye;
    eyeL = pose.leftEye;
    nose = pose.nose;
    d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    
    if(valueER != 0){
      if(valueER === eye1){
        image(valueER, eyeR.x-d/3, eyeR.y-d/2, d, 1.2*d); 
      }else if(valueER === eye2){
        image(valueER, eyeR.x-d/4, eyeR.y-d/4, d, d/1.7); 
      }else if(valueER === eye3){
        image(valueER, eyeR.x-d/4, eyeR.y-d/2, d, d/1.5); 
      }else{
        image(valueER, eyeR.x-d/2, eyeR.y-d/2, d, 1.5*d); 
      }
    }
    
    if(valueEL != 0){
      if(valueEL === eye1){
        image(valueEL, eyeL.x-d/3, eyeL.y-d/2, d, 1.2*d); 
      }else if(valueEL === eye2){
        image(valueEL, eyeL.x-d/4, eyeL.y-d/4, d, d/1.7); 
      }else if(valueEL === eye3){
        image(valueEL, eyeL.x-d/4, eyeL.y-d/2, d, d/1.5); 
      }else{
        image(valueEL, eyeL.x-d/2, eyeL.y-d/2, d, 1.5*d); 
      }
    }
    
    if(valueN != 0){
      image(valueN, nose.x-d/2, nose.y-d/2, 0.8*d, 0.8*d);
    }
    
    if(valueM != 0){
      if(valueM === mouth1){
        image(valueM, nose.x - d/2, nose.y + d/3, d, d/2);
      }else if(valueM === mouth2){
        image(valueM, nose.x - d/2, nose.y + d/3, d, d/2);
      }else{
        image(valueM, nose.x - d/2, nose.y + d/3, d, 1.5*d);
      }
    }
  }
}

function mouseClicked(event){
  if(((event.x < (nose.x + 10)) && (event.x > (nose.x - 10))) && ((event.y < (nose.y + 10)) && (event.y > (nose.y - 10)))){
    console.log("nose");
    if(indexN === 0 ){
      valueN = 0;
      indexN++;
    }else if(indexN === 1){
      valueN = nose1;
      indexN++;
    }else if(indexN === 2){
      valueN = nose2;
      indexN++;
    }else{
      valueN = nose3;
      indexN = 0;
    }
  }
  
  if(((event.x < (nose.x + 30)) && (event.x > (nose.x - 30))) && ((event.y < (nose.y + 65)) && (event.y > (nose.y + 40)))){
    console.log("mouth");
    if(indexM === 0 ){
      valueM = 0;
      indexM++;
    }else if(indexM === 1){
      valueM = mouth1;
      indexM++;
    }else if(indexM === 2){
      valueM = mouth2;
      indexM++;
    }else{
      valueM = mouth3;
      indexM = 0;
    }
  }
  
    if(((event.x < (eyeR.x + 20)) && (event.x > (eyeR.x - 20))) && ((event.y < (eyeR.y + 20)) && (event.y > (eyeR.y - 20)))){
    console.log("eyeR");
    if(indexER === 0 ){
      valueER = 0;
      indexER++;
    }else if(indexER === 1){
      valueER = eye1;
      indexER++;
    }else if(indexER === 2){
      valueER = eye2;
      indexER++;
    }else if(indexER === 3){
      valueER = eye3;
      indexER++;
    }else{
      valueER = eye4;
      indexER = 0;
    }
  }
  
  if(((event.x < (eyeL.x + 20)) && (event.x > (eyeL.x - 20))) && ((event.y < (eyeL.y + 20)) && (event.y > (eyeL.y - 20)))){
    console.log("eyeL");
    if(indexEL === 0 ){
      valueEL = 0;
      indexEL++;
    }else if(indexEL === 1){
      valueEL = eye1;
      indexEL++;
    }else if(indexEL === 2){
      valueEL = eye2;
      indexEL++;
    }else if(indexEL === 3){
      valueEL = eye3;
      indexEL++;
    }else{
      valueEL = eye4;
      indexEL = 0;
    }
  }
}
