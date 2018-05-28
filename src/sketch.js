var img;
var imgs = [];
var levels;
var bg;

function setup() { 
  colorMode(HSL);
  createCanvas(windowWidth, windowHeight);
  bg = color(255);
  var colors = {
    r: color(  0,100,45),
    o: color( 30,100,50),
    y: color( 60,100,50),
    g: color(120,100,40),
    b: color(240,100,70),
    p: color(290,100,40)
  };
  var colorNames = {
    r: "Red",
    o: "Orange",
    y: "Yellow",
    g: "Green",
    b: "Blue",
    p: "Purple"
  };
  levels = new CircularArray([
    ['truck-o',     'roygbp'],
    ['car-o',       'rb'],
    ['shoe-o',      'rg'],
    ['hat-o',       'gb'],
    ['bicycle-o',   'ryb'],
    ['sock-o',      'rygb'],
    ['pants-o',     'roygb'],
    ['train-o',     'pog'],
    ['motorcycle-o','prb'],
    ['shirt-o',     'gy'],
    ['boot-o',      'gp'],
    ['bird-o',      'op'],
  ].map(([imgName,colorCodes]) => {
    let img = loadImage('assets/' + imgName + '.svg');
    return new Level(colorCodes
      .split('')
      .map((k,i) => new ColoredSubject(
        img,
        colors[k],
        colorNames[k],
        i*360/colorCodes.length)));
  }));
} 

function touchStarted(){
  var lastTouch = touches.slice().pop();
  handlePointAction(createVector(lastTouch.x, lastTouch.y));
  return false; // This is to prevent pinch-zooming on touch devices.
}

function mousePressed(){
  handlePointAction(createVector(mouseX, mouseY));
}

function handlePointAction(p){
  levels.getCurrent().handlePointAction(p);
}

function keyPressed(){
  switch(keyCode){
    case LEFT_ARROW:  levels.movePrev(); levels.getCurrent().activate(); break;
    case RIGHT_ARROW: levels.moveNext(); levels.getCurrent().activate(); break;
  }
  switch(key){
    case 'R': levels.getCurrent().reset(); break;
  }
}

function draw() { 
  levels.getCurrent().draw();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}