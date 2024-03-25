// general idea (for now)
// creature jumps around in the screen, smiles when mouse hovers over it, and gets tickled (jiggles) when clicked
// it stops jumping while jiggling
// after a certain number of clicks the creature will start following the mouse (draw an "image" for the mouse using shapes (location = (mouseX, mouseY) & make it jiggle when it's touched by the creature?)
// but when the mouse moves towards it and gets too close it runs away & maintains distance & giggles



//let option;

//let time;
//let lastTime;

let time;

let c; // background color
let orange = "#FFAF05"

let mini; // a creature

// Creature position
let x;
let y;

let smile; // change the scope? (for making multiple creatures)
let closed;

let hover;






function setup() {
  createCanvas(800,800);

  //option = 1;

  c = orange;

  x = 400;
  y = 400;

  mini = new Creature(x,y);

  smile = false;
}

function draw() {
  background(c);

  time = millis(); // current time in milliseconds

  // an attempt to make the mouse tickle the creature
  /*
  if (distance < 25){
    mini.update();
    mini.display();
  } else {
    mini.display();
  }
  */

  mini.blink();
  mini.jump();
  mini.checkHover();
  //mini.checkSmile();
  mini.smileIfHover();
  mini.display();
  
}





class Creature {

constructor(x,y){
  this.x = x;
  this.y = y;
}

jump(){
  this.x = 70*cos(frameCount*0.1) + 400;
  this.y = 40*sin(frameCount * 0.20) + 400;
}

jiggle(){
  this.x = random(390,410);
}

smileYes(){
  smile = true;
}
smileNo(){
  smile = false;
}

eyesClosed(){
  closed = true;
}
eyesNotClosed(){
  closed = false;
}

checkHover(){
  let distance = dist(mouseX,mouseY,this.x,this.y);
  print(distance);

  if (distance < 25*2.5){ // giving more room for error (bc the figure moves too fast -- need to slow it down)
    hover = true;
  } else{
    hover = false;
  }

  /*
  if (hover == true){
    this.smileYes();
  } else{
    this.smileNo();
  }
  */

  //print(hover);
  //print(smile);
}

smileIfHover(){
  if (hover == true){
    this.smileYes();
  } else{
    this.smileNo();
  }
}

tickle(){
  //this.x = this.x + random(-10,10);
}

/*
checkSmile(){ //****************JUST FOR TROUBLESHOOTING
  //print(smile);
}
*/

blink(){ //************NOW THIS DOESN'T WORK
  if(time%5 == 0){ //adjust the interval later..
    /*
    let lastTime = millis();
    while(time - lastTime < 2000){ // an attempt to make it jiggle for two sec
      mini.jiggle();
    }
    */
    mini.eyesClosed();
  } else {
    mini.eyesNotClosed();
  }
}

display(){
strokeWeight(3);

// left arm
line(this.x,this.y,this.x-35,this.y+15);
//right arm
line(this.x,this.y,this.x+35,this.y+15);

// left leg
line(this.x,this.y,this.x-10,this.y+40);
line(this.x-10,this.y+40,this.x-15,this.y+35);
// right leg
line(this.x,this.y,this.x+10,this.y+40);
line(this.x+10,this.y+40,this.x+15,this.y+35);

// face
fill(255);
ellipse(this.x,this.y,50,50); // **make the width and height changeable**

// eyes
if(smile == true){
  noFill();
  arc(this.x-5,this.y-5,5,5,PI,0);
  arc(this.x+5,this.y-5,5,5,PI,0);
} else if (closed == true){
  line(this.x-7.5,this.y-5,this.x-2.5,this.y-5);
  line(this.x+2.5,this.y-5,this.x+7.5,this.y-5);
} else{
  fill(0);
  ellipse(this.x-5,this.y-5,5,5);
  ellipse(this.x+5,this.y-5,5,5);
}
} // display ends

} // creature ends


function mousePressed(){
  if(smile == true){
    this.tickle();
  }
}




// switching between screens
/*
function keyPressed() {

  option = option + 1;

  if (option > 3){
    option = 1;
  }

}
*/








//**************************************************
// an atempt to make a moving ball
//**************************************************


// BALL DOESN'T SHOW UP?
/*
let mini;

function setup() {
 // put setup code here
  createCanvas(800,800);
  mini = new Ball(400,400);
}

function draw() {
  // put drawing code here
  background(255);
  mini.display;
}

class Ball {

  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  display() {
  stroke(0);
  strokeWeight(3);
  fill(124);
  ellipse(this.x,this.y,50,50);
  }
}
*/


//----------------------------------------------------------------------------------------
// using code from class for truobleshooting (figuring out why the ball doesn't display with my code)
//----------------------------------------------------------------------------------------


// let mini;

// function setup() {
//   createCanvas(800, 800)
//  v = createVector(width/2, 48);
//  mini = new Ball(v);
// }

// function draw() {
//   background(0);

//   mini.display();
// }

// // class definition
// /*
// class Ball{

// constructor(x, y){
//   this.x = x;
//   this.y = y;
// }

// display(){
//   stroke(127);
//   strokeWeight(2);
//   fill(255, 127);
//   ellipse(this.x, this.y, 48, 48)
// }

// }
// */

// class Ball{

//     constructor(position){
//         /*
//       this.x = x;
//       this.y = y;
//       */
//       this.position = position;
//     }
    
//     display(){
//       stroke(127);
//       strokeWeight(2);
//       fill(255);
//       ellipse(this.position.x, this.position.y, 48, 48) // beacuse position contains x and y locations, you need to pull out x and y respectively!
//     }
    
//     }
