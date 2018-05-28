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
    return colorCodes
      .split('')
      .map((k,i) => new ColoredSubject(
        colors[k],
        i*360/colorCodes.length,
        img));
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
  let drawables = levels.getCurrent();
  let activated = drawables.filter(d => d.containsPoint(p))[0];
  if(activated){
    bg = activated.color;
  }
}

function keyPressed(){
  switch(keyCode){
    case LEFT_ARROW:  levels.movePrev(); bg = color(255); break;
    case RIGHT_ARROW: levels.moveNext(); bg = color(255); break;
    break;
  }
}

function mouseClicked(){
}

function draw() { 
  background(bg);
  let drawables = levels.getCurrent();
  for(var i=0; i<drawables.length; i++){
    drawables[i].draw();
  }
}

function svgImage(img, x, y, size){
  let scale = Math.min(size / img.width, size / img.height);
  image(img, x, y, scale * img.width, scale * img.height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function ColoredSubject(color,degreesOffset,img){
  var _inBound = true;
  var _rotation = 0;
  var _ellipseDiameter = 1;
  var _center = createVector(0,0);
  this.color = color;
  this.containsPoint = (v) => {
    return v.dist(_center) <= _ellipseDiameter/2;
  }

  this.draw = () => {
    push();
    let duration = 100;
    angleMode(DEGREES);
    rectMode(CENTER);
    imageMode(CENTER);
    _rotation = degreesOffset + (frameCount/10 % 360);
    let centerX = windowWidth / 2;
    let centerY = windowHeight / 2;
    let x0 = windowWidth / 6;
    let y0 = windowHeight / 6;
    let r = Math.sqrt(x0*x0 + y0*y0);
    _center.x = r * cos(_rotation) + centerX;
    _center.y = r * sin(_rotation) + centerY;
    if(frameCount % duration == 0){
      _inBound = !_inBound;
    }
    let progress = (frameCount % duration)/duration;

    let sizeFactor = (windowWidth / 500 );
    let s = sizeFactor * (40 + 10 * Easing.Sinusoidal.InOut(_inBound ? progress : 1 - progress));
    _ellipseDiameter = s + (sizeFactor * 40);
    strokeWeight(5);
    fill(color);
    ellipse(_center.x, _center.y, _ellipseDiameter, _ellipseDiameter);
    if(img){
      svgImage(img, _center.x, _center.y, s);
    }
    pop();
  };
}