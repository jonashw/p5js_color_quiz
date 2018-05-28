function ColoredSubject(img,color,colorName,degreesOffset){
  var _inBound = true;
  var _rotation = 0;
  var _ellipseDiameter = 1;
  var _center = createVector(0,0);
  this.color = color;
  this.colorName = colorName;
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

  function svgImage(img, x, y, size){
    let scale = Math.min(size / img.width, size / img.height);
    image(img, x, y, scale * img.width, scale * img.height);
  }
}