/* For mobile phones - accesses accelerometer.
Make sure you turn on orientation lock on your iPhone or Android device. */

// variables for gyroscope and accelerometer data
var alpha, beta, gamma; // orientation data
var xPosition = 0;
var yPosition = 0;
var x = 0; // acceleration data
var y = 0;
var z = 0;

let cars = [] ;
let angle, px, py;

// other variables
var me;

function setup() {

  createCanvas(windowWidth, windowHeight);

  // initialize accelerometer variables
  alpha = 0;
  beta = 0;
  gamma = 0;

// initialize other variables
  me = loadImage("assets/me.jpg");
  imageMode(CENTER);
  rectMode(CENTER);

}

function draw() {

  background('#c6f5fe'); // light blue
    // add an image for the background?
  cars.push(new Car());

  // the map command !!!!
  // takes your variable and maps it from range 1 to range 2
  // map(yourVar, range1_x, range1_y, range2_x, range2_y) ;
  // xPosition = map(gamma, -60, 60, 0, width);
  // yPosition = map(beta, 60, 20, 0, height) ;
  xPosition = map(gamma, -18, 18, 0, width);
  yPosition = map(beta, 25, 45, 0, height);

  push(); // before you use translate, rotate, or scale commands, push and then pop after
  translate(xPosition, yPosition); // move everything over by x, y
  // rotate(radians(alpha)); // using alpha in here so it doesn't feel bad
  image(me, 0, 0, 500, 500);
  //  	rect(0, 0, 100, 100) ;
  pop();


  // Here is where you can design this program!
  fill('white');
  noStroke();
  textSize(100);
  textAlign(CENTER);
  text("KIMI", width / 2, height / 2);

  // DECORATIONS
  // Just a bunch of text commands to display data coming in from addEventListeners
  // textAlign(LEFT);
  // textSize(20);
  // fill('black');
  // text("orientation data:", 25, 25);
  // textSize(15);
  // text("alpha: " + alpha, 25, 50);
  // text("beta: " + beta, 25, 70);
  // text("gamma: " + gamma, 25, 90);
  // textSize(20);
  // text("acceleration data:", 25, 125);
  // textSize(15);
  // text("x = " + x.toFixed(2), 25, 150); // .toFixed means just show (x) decimal places
  // text("y = " + y.toFixed(2), 25, 170);
  // text("z = " + z.toFixed(4), 25, 190);

  for(let i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].update();

    if(cars[i].a <= 0){
      cars.splice(i,1);
    }
  }
  }

  class Car{

  constructor(){
    this.pos = createVector(windowWidth/2,windowWidth/2 + 150);
    this.vel = createVector(random(-5,5),random(-5,-5));
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.a = random(200,255);
    this.size = random(10,30);
  }

  display(){
    fill(this.r,this.g,this.b,this.a);
    ellipse(this.pos.x,this.pos.y,this.size)
  }

  update(){
    this.pos.add(this.vel);
    this.a = this.a - 5;


}

// HERE'S THE STUFF YOU NEED FOR READING IN DATA!!!

// Read in accelerometer data
window.addEventListener('deviceorientation', function(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});


// accelerometer Data
window.addEventListener('devicemotion', function(e) {
  // get accelerometer values
  x = e.acceleration.x;
  y = e.acceleration.y;
  z = e.acceleration.z;
});
