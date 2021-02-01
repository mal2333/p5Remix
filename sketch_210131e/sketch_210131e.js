//Global variables
let video;
let poseNet;
let pose;
let indexN, indexM, indexER, indexEL;
let valueN, valueM, valueER, valueEL;
let nose, eyeR, eyeL, d;
//let ear1, ear2, ear3;
let mouth1, mouth2, mouth3, mouth4;
let eye1, eye2, eye3, eye4;
let nose1, nose2, nose3;

//Loading images
function preload(){
  //ear1=loadImage('data/ear1.svg');
  //ear2=loadImage('data/ear2.svg');
  //ear3=loadImage('data/ear3.svg');
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
  
  //Setting varaibles to 0 when starts
  value=0;
  indexN = 0;
  indexM = 0;
  indexER = 0;
  indexEL = 0;
  valueN = 0;
  valueM = 0;
  valueER = 0;
  valueEL = 0;
  
  //Video capture from webcam
  video = createCapture(VIDEO);
  video.hide();
  
  //Calling poseNet model
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses);  
}

//Callback, assigning the object pose to a variable to be able to access the different body points
function gotPoses(poses) {
  //We only need index 0 of the object pose.
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}


function draw() {
  //Video drawn on the canvas
  image(video, 0, 0);

  //Only run if a pose is found (a 'person' on the screen)
  if (pose) {
    //console.log(pose);
    
    //Assigning each variable to its matching property in the pose object
    eyeR = pose.rightEye;
    eyeL = pose.leftEye;
    nose = pose.nose;
    //Distance between right and left eye to scale the images (distance of face from screen)
    d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    
    //Scaling for right eye
    //If it's image(1,2,3,4) then draw image with that value, at positionx, position y, and scaled, w, h. 
    if(valueER != 0){
      if(valueER === eye1){//If right eye was clicked, then valueER becomes eye1
        image(valueER, eyeR.x-d/3, eyeR.y-d/2, d, 1.2*d);//eye1 is passed in to draw the image as well as it's position and scale
      }else if(valueER === eye2){//If right eye was clicked again, then valueER becomes eye2
        image(valueER, eyeR.x-d/4, eyeR.y-d/4, d, d/1.7); //eye2 is passed in to draw the image as well as it's position and scale
      }else if(valueER === eye3){//If right eye was clicked again, then valueER becomes eye3
        image(valueER, eyeR.x-d/4, eyeR.y-d/2, d, d/1.5); //eye3 is passed in to draw the image as well as it's position and scale
      }else{//If right eye was clicked again, then valueER becomes eye4
        image(valueER, eyeR.x-d/2, eyeR.y-d/2, d, 1.5*d); //eye4 is passed in to draw the image as well as it's position and scale
      }
    }
    
     //Scaling for left eye
    //If it's image(1,2,3,4) then draw image with that value, at positionx, position y, and scaled, w, h. 
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
    
     //Scaling for nose
    //Draw image with that value, at positionx, position y, and scaled, w, h. 
    if(valueN != 0){
      image(valueN, nose.x-d/2, nose.y-d/2, 0.8*d, 0.8*d);
    }
    
    //Scaling for mouth
    //If it's image(1,2,3) then draw image with that value, at positionx, position y, and scaled, w, h. 
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

//Mouse clicked function which was tricky to use at first
function mouseClicked(event){//Need the event as a parameter to determine where the mouse is clicking on the canvas
  //If mouse clicks the area of the Nose, then assign the image value to be drawn in the drawfunction and increase the index. 
  if(((event.x < (nose.x + 10)) && (event.x > (nose.x - 10))) && ((event.y < (nose.y + 10)) && (event.y > (nose.y - 10)))){//determining an area for nose. (nose.x, nose.y) is a dot, I had to create a larger target. 
    console.log("nose");//checking which area of the body is being clicked (debugging purposes)
    if(indexN === 0 ){//if index is 0
      valueN = 0;//don't assign a value so no image will be drawn
      indexN++;//increase index to 1
    }else if(indexN === 1){//if index is 1
      valueN = nose1;//assign image nose1 to the value to be drawn
      indexN++;//increase index by 1
    }else if(indexN === 2){//if index is 2
      valueN = nose2;//assign image nose2 to the value to be drawn
      indexN++;//increase index by 1
    }else{//else, if we click again
      valueN = nose3;//assign image nose3 to the value to be drawn
      indexN = 0;//return to the start by setting index to 0
    }
  }
  
  //If mouse clicks the area of the Mouse (there is not point for mouth, so I took nose and modified it a bit), then assign the image value to be drawn in the drawfunction and increase the index. 
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
  
    //If mouse clicks the area of the right eye, then assign the image value to be drawn in the drawfunction and increase the index. 
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
  
  //If mouse clicks the area of the left eye, then assign the image value to be drawn in the drawfunction and increase the index. 
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
