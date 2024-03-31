// general idea (for now)
// creature jumps around in the screen, smiles when mouse hovers over it, and gets tickled (jiggles) when clicked
// after a certain number of clicks the creature will start following the mouse (draw an "image" for the mouse using shapes (location = (mouseX, mouseY) & make it jiggle when it's touched by the creature?)
// but when the mouse moves towards it and gets too close it runs away & maintains distance & giggles

// in a different screen, generate multiple creatures moving around randomly & make them giggle when they touch each other

// peek-a-boo
// hide and seek

// make the legs and arms move too

// possibly make the background moving?



let option;

//let time;
//let lastTime;

let time;

let c; // background color
let orange = "#FFAF05";
let green = "#70D130";
let blue = "#41D1CB";

let mini; // a creature
let miniTwo;

// Creature position
let x;
let y;

// ((CHANGED THE SCOPE OF THESE VARIABLES BELOW))
//let hover;
//let smile;
//let closed;







function setup() {
  createCanvas(800,800);

  option = 1;

  c = orange;

  x = 400;
  y = 400;

  mini = new Creature(400,400);
  miniTwo = new Creature(500,600);

  //smile = false;
}

function draw() {

  time = millis(); // current time in milliseconds





  //----------------------------------SCENE 1------------------------------------
  //** DRAW SOME BACKGROUND? SOMETHING LIKE A PLAYGROUND WOULD BE CUTE
  if (option == 1){
  c = orange;
  background(c);
  
  fill(100);
  rect(0,470,800,350);
  
  mini.blink();
  mini.jump();
  //mini.checkHover();
  //mini.checkSmile();
  mini.smileIfHover();
  mini.tickle();
  mini.display();
}
  




//----------------------------------SCENE 2------------------------------------
// the creature plays a hide and seek game (this scene will have little to no interaction, try to make it a looped animation)
// there are objects for the creature to hide & the creature sneakily moves between the objects
// it gets startled when you catch it
// it startles you and giggles at the end when it finally "catches" you
if (option == 2){
  c = green;
  background(c);
  

  miniTwo.blink();
  miniTwo.smileIfHover();
  miniTwo.display();

  //print(miniTwo.x);
}





//-----------------------------------SCENE 3--------------------------------------
// creatures play tag? chaser & chased switch roles once one tags the other
if (option == 3){
  c = blue;
  background(c);
}

} // end of draw





class Creature { //**put this in a separate file later

constructor(x,y){
  this.initialX = x;
  this.initialY = y;

  this.x = x;
  this.y = y;

  let hover = false;
  this.hover = hover;

  let smile = false;
  this.smile = smile;

  let closed = false;
  this.closed = closed;
}

jump(){
  this.x = 70*cos(frameCount*0.1) + this.initialX;
  this.y = 40*sin(frameCount * 0.20) + this.initialY;
}

tickle(){ // ** make the character laugh and shake its limbs when tickled -- need a boolean variable that indicates whether it is being tickled or not
  if(mouseIsPressed){
    if(this.hover){
      if(option == 1){
        c = green; // ** this line doesn't seem so necessary
        background(c);

        fill(100);
        rect(0,470,800,350);
      }

    this.x = this.x + random(-10,10);
    this.y = this.y + random(-10,10);

    // ** make the lines more elaborate & add another set of similar lines on the bottom left of the character
    line(this.x+45, this.y-20, this.x+random(60,65), this.y-random(25,30));
    line(this.x+45, this.y-30, this.x+random(55,60), this.y-random(35,40));
    line(this.x+35, this.y-30, this.x+random(40,45), this.y-random(40,45));
    }
  }
}

/*
tickle(){
  //this.x = this.x + random(-10,10);
}
*/

/*
smileYes(){
  smile = true;
}
smileNo(){
  smile = false;
}
*/

/*
eyesClosed(){
  closed = true;
}
eyesNotClosed(){
  closed = false;
}
*/

smileIfHover(){
  let distance = dist(mouseX,mouseY,this.x,this.y);
  //print(distance);

  // check hover
  // hover is true when mouse is near the character
  if (distance < 25*2.5){ // giving more room for error (bc the figure moves too fast -- need to slow it down)
    this.hover = true;
  } else{
    this.hover = false;
  }

  // smile is true when hover is true
  if (this.hover == true){
    this.smile = true;
  } else{
    this.smile = false;
  }
  //this.smileIfHover();



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

/*
smileIfHover(){
  if (hover == true){
    this.smileYes();
  } else{
    this.smileNo();
  }
}
*/

/*
checkSmile(){ //****************JUST FOR TROUBLESHOOTING
  //print(smile);
}
*/

blink(){ // this works but the interval is off
  if(time%5 == 0){ //adjust the interval later..
    //mini.eyesClosed();
    this.closed = true;
  } else {
    //mini.eyesNotClosed();
    this.closed = false;
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
ellipse(this.x,this.y,50,50); // **make the width and height changeable

// eyes
if(this.smile == true){
  noFill();
  arc(this.x-5,this.y-5,5,5,PI,0);
  arc(this.x+5,this.y-5,5,5,PI,0);
} else if (this.closed == true){
  line(this.x-7.5,this.y-5,this.x-2.5,this.y-5);
  line(this.x+2.5,this.y-5,this.x+7.5,this.y-5);
} else{
  fill(0);
  ellipse(this.x-5,this.y-5,5,5);
  ellipse(this.x+5,this.y-5,5,5);
}
} // display ends

} // creature ends

/*
function mousePressed(){
  if(smile == true){
    this.tickle();
  }
}
*/




// switching between screens
function keyPressed() {

  option = option + 1;

  if (option > 3){
    option = 1;
  }

}







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
    
//     /*
//     update(){ //update object variables associated with this particular object
//         this.velocity.add(this.acceleration); //add this particular object's acceleration to the velocity
//         this.position.add(this.velocity); // add velocity to this particular object's location (thus moving the object)
//         this.lifespan -= 2; // decrease the lifespan by 2 each time
//     }
//     */

//     display(){
//       stroke(127);
//       strokeWeight(2);
//       fill(255);
//       ellipse(this.position.x, this.position.y, 48, 48) // beacuse position contains x and y locations, you need to pull out x and y respectively!
//     }
    
    
//     }
