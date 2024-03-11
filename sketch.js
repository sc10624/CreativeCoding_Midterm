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

  constructor(u,v) {
    this.x = u;
    this.y = v;
  }

  display() {
  stroke(0);
  strokeWeight(3);
  fill(124);
  ellipse(this.x,this.y,50,50);
  }
}
*/









let mini;
/*
let c;
let d;
let v;
*/

// let particles = [];

function setup() {
  createCanvas(800, 800)
  // each of this is an object
  /*
  b = new Ball(width/2, 48);
  c = new Ball(30, 48);
  d = new Ball(600, 48);
  */
 v = createVector(width/2, 48);
 mini = new Ball(v);
}

function draw() {
  // call the methods on each object aht you wish to use
  /*
  b.display();
  c.display();
  d.display();
  */
  background(0);

  //b.update(); // update the object variables
  //b.isDead(); // checking if it's dead
  mini.display();
}

// class definition
/*
class Ball{

constructor(x, y){
  this.x = x;
  this.y = y;
}

display(){
  stroke(127);
  strokeWeight(2);
  fill(255, 127);
  ellipse(this.x, this.y, 48, 48)
}

}
*/

class Ball{

    constructor(position){
        /*
      this.x = x;
      this.y = y;
      */
      this.position = position;
    }
    
    /*
    update(){ //update object variables associated with this particular object
        this.velocity.add(this.acceleration); //add this particular object's acceleration to the velocity
        this.position.add(this.velocity); // add velocity to this particular object's location (thus moving the object)
        this.lifespan -= 2; // decrease the lifespan by 2 each time
    }
    */

    display(){
      stroke(127);
      strokeWeight(2);
      fill(255);
      ellipse(this.position.x, this.position.y, 48, 48) // beacuse position contains x and y locations, you need to pull out x and y respectively!
    }
    
    /*
    isDead(){
        if(this.lifespan < 0.0){
            return true;
        } else{
            return false;
        }
    }
    */
    
    
    }