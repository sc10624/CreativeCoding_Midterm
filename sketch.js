// for switching screens
let option;

//let time;
//let lastTime;

// time since the sketch is first run
let time;

let c; // background color
let orange = "#FFAF05";
let green = "#70D130";
let lightGreen = "#A2E057";
let darkGreen = "#1FA823";
let blue = "#41D1CB";


// scene 1 object
let mini; // a creature

// scene two object
let bushes = [];
let grass = [];
/*
let bush1;
let bush2;
let bush3;
*/
//let grass1;
let miniTwo;

//scene three object
let threeObjects = [];
/*
let threeA;
let threeB;
*/

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

  //------------scene 1--------------
  mini = new Creature(400,400);

  //------------scene 2---------------
  // fixed y, random x
  //let bushX = 100;
  let bushY = 125;
  for (let i = 0; i < 3; i++){
    bushes[i] = new Bushes(random(100,width-300),bushY); //** MAKE THE SPACING EVEN
    bushY += 300;
  } 

  let grassX = 0;
  let grassY = 50;
  for (let i = 0; i < 100; i++){
    grass[i] = new Grass(grassX,grassY)
    grassX += 50;
  }
  /*
  bush1 = new Bushes(550,200);
  bush2 = new Bushes(100,400);
  bush3 = new Bushes(550,700);
  grass1 = new Grass(50,50);
  */
  miniTwo = new Creature(500,600);

  //------------scene 3--------------
  for (let i = 0; i < 10; i++){
    threeObjects[i] = new Creature(random(0,width), random(0,height));
  }
  /*
  threeA = new Creature(300,400);
  threeB = new Creature(500,400);
  */


  //smile = false;
}

function draw() {

  time = millis(); // current time in milliseconds





  //----------------------------------SCENE 1------------------------------------
  //** DRAW SOME BACKGROUND? SOMETHING LIKE A PLAYGROUND WOULD BE CUTE
  // ** DRAW MORE OBJECTS
  // ** MAYBE MAKE AN ARRAY FOR BACKGROUND COLORS AND MAKE IT CHANGE EVERY TIME YOU TICKLE THE OBJECT (BUT IN CYCLE, NOT RANDOMLY)
  if (option == 1){
  c = orange;
  background(c);
  
  fill(100);
  rect(0,470,800,350);
  
  mini.blink();
  mini.sideJump();
  //mini.checkHover();
  //mini.checkSmile();
  mini.smileIfHover();
  mini.tickle();
  mini.display();
} // option 1 ends
  




//----------------------------------SCENE 2------------------------------------
// the creature moves between & hides behind bushes
// if possible, make it slightly peek over the bushes and giggle at you
// (just an idea) make it speed up once you tickle it?

if (option == 2){
  c = green;
  background(c);

  //**PLANT THE GRASS ALL OVER THE SCREEN USING ARRAY**
  //grass1.display();

  for(i = 0; i < 50; i++){
    grass[i].display();
  }

  miniTwo.hide(bushes[0]);
  miniTwo.blink();
  miniTwo.walk(); // **MAKE THE OBJECT MOVE FROM ONE BUSH TO ANOTHER, THEN STOP AT THAT LOCATION FOR A FEW SECONDS**
  miniTwo.smileIfHover();
  miniTwo.tickle();
  miniTwo.display();


  for(i = 0; i < 3; i++){
    bushes[i].display();
  }

  

  /*
  bush1.display();
  bush2.display();
  bush3.display();
  */
  
  //print(miniTwo.x);
} // option 2 ends





//-----------------------------------SCENE 3--------------------------------------
// creatures play tag? chaser & chased switch roles once one tags the other
//***** MAKE THE MOVEMENTS MORE RANDOM!! *****
if (option == 3){
  c = blue;
  background(c);

  for(let i = 0; i < 10; i ++){
    threeObjects[i].blink();
    threeObjects[i].smileIfHover();
    threeObjects[i].wander();
    threeObjects[i].tickle();
    // ** FIGURE OUT HOW TO USE giggleIfNear FUNCTION WITH NOT JUST ONE OBJECT BUT EVERY OTHER OBJECT
    threeObjects[i].giggleIfNearMany();
    threeObjects[i].display();
  }

  /*
  threeA.blink();
  threeA.smileIfHover();
  threeA.walk();
  threeA.tickle();
  threeA.giggleIfNear(threeB);
  threeA.display();

  threeB.blink();
  threeB.smileIfHover();
  threeB.walk();
  threeB.tickle();
  threeB.giggleIfNear(threeA);
  threeB.display();
  */
} // option 3 ends

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

  let direction = random([-1,1]);
  this.direction = direction;

  let speed = random(1,5);
  this.speed = speed;
}


walk(){ // walk within the screen
  this.speed = 2; // fixed the speed bc it's walk

  this.x = this.x + (this.direction*this.speed);
  this.y = 10*sin(frameCount*0.3) + this.initialY;

  if(this.x > width || this.x < 0){
    this.direction *= -1;
  }
  /*
  if (this.x < 0){
    this.direction *= 1;
  }
  */
} // walk ends


wander(){ // ** MAKE Y DIRECTION CHANGE TOO
  //this.speed = 2; // let the speed be random bc it's wander

  this.x = this.x + (this.direction*this.speed);
  this.y = 10*sin(frameCount*0.3) + this.initialY;

  if(this.x > width){
    this.direction = -1;
  }
  if (this.x < 0){
    this.direction = 1;
  }
} // wander ends


//***************************************IN PROGRESS*******************************************
hide(object){  
  this.initialX = object.x;
  this.initialY = object.y;

  //print(initialX);

} // hide ends
//*********************************************************************************************


sideJump(){
  this.x = 70*cos(frameCount*0.1) + this.initialX;
  this.y = 40*sin(frameCount * 0.20) + this.initialY;
} // sideJump ends


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
    stroke(0);
    strokeWeight(3);
    line(this.x+45, this.y-20, this.x+random(60,65), this.y-random(25,30));
    line(this.x+45, this.y-30, this.x+random(55,60), this.y-random(35,40));
    line(this.x+35, this.y-30, this.x+random(40,45), this.y-random(40,45));
    } // hover if statement
  } // mouseIsPressed if statement
} // tickle ends


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


// referenced a coding train video provided on github
///*
giggleIfNear(other){ // creatures smile when they near each other
  // ** HOW DO I CHECK WHEN THE OBJECTS ARE CLOSE TO EACH OTHER? -- for statement going through the array

  //***************************************************************

  // COME BACK TO THIS ONE LATER TODAY!!!!!!! MUST BE FIGURED OUT BY TODAY OR ELSE I DIE

  //***************************************************************

  //for (let i = 0; i < threeObjects.length; i ++){ // for statement checking the distance and hover status of objects
  let distance = dist(this.x,this.y,other.x,other.y);
  if (distance < 25*2){
    this.smile = true;

    // tickling
    this.x = this.x + random(-10,10);
    this.y = this.y + random(-10,10);

    // ** make the lines more elaborate & add another set of similar lines on the bottom left of the character
    line(this.x+45, this.y-20, this.x+random(60,65), this.y-random(25,30));
    line(this.x+45, this.y-30, this.x+random(55,60), this.y-random(35,40));
    line(this.x+35, this.y-30, this.x+random(40,45), this.y-random(40,45));
  } // if statement ends
  //} // for statement ends
} // giggleIfNear ends
//*/


giggleIfNearMany(){ // creatures smile and giggle when they near each other
  //***************************************************************
  // DOESN'T WORK
  //***************************************************************
  /*
  for (let i = 0; i < threeObjects.length; i ++){ // for statement checking the distance and hover status of objects
    if (this != threeObjects[i]){
    let distance = dist(this.x,this.y,threeObjects[i].x,threeObjects[i].y);
      if (distance < 25*2){
        // smiling (giggling)
        this.smile = true;

        // tickling (giggling)
        this.x = this.x + random(-10,10);
        this.y = this.y + random(-10,10);

        // ** make the lines more elaborate & add another set of similar lines on the bottom left of the character
        line(this.x+45, this.y-20, this.x+random(60,65), this.y-random(25,30));
        line(this.x+45, this.y-30, this.x+random(55,60), this.y-random(35,40));
        line(this.x+35, this.y-30, this.x+random(40,45), this.y-random(40,45));
      } // if statement ends
    } // if statement ends
  } // for statement ends
  */

  // WORKS!!!
  for (let i = 0; i < threeObjects.length; i ++){
    if(this != threeObjects[i]){
    this.giggleIfNear(threeObjects[i]);
    }
  }
} // giggleIfNear ends



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
} // smileIfHover ends

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
} // blink ends


display(){
stroke(0);
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


} // creature class ends





class Bushes {

  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  
  // **MAKE THE SIZE CHANGEABLE**
  display(){
    stroke(0);
    strokeWeight(10);
    fill(darkGreen);
    ellipse(this.x,this.y-5,90,90);
    ellipse(this.x+50,this.y,90,90);
    ellipse(this.x+100,this.y-5,90,90);
    ellipse(this.x+25,this.y-40,90,90);
    ellipse(this.x+75,this.y-40,90,90);
    noStroke();
    ellipse(this.x,this.y-5,90,90);
    ellipse(this.x+50,this.y,90,90);
    ellipse(this.x+100,this.y-5,90,90);
    ellipse(this.x+25,this.y-40,90,90);
    ellipse(this.x+75,this.y-40,90,90);
  } // display ends
} // Bushes ends

class Grass{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  display(){
  noStroke();
  fill(lightGreen);
  triangle(this.x,this.y-15,this.x-15,this.y+15,this.x+15,this.y+15);
  } // display ends
} // Grass ends




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
