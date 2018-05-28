function Level(subjects){
    var _bg = color(255);
    var _activeSubjects = subjects.slice();
    var _nextIndex = nextIndex();

    var _fountain;

    this.activate = () => {
    };

    this.reset = () => {
        _bg = color(255);
        _activeSubjects = subjects.slice();
        _fountain.Stop();
        _fountain = null;
    };

    this.draw = () => {
        background(_bg);
        if(!_activeSubjects.length){
            push();
            _fountain.Draw();
            _fountain.Create();
            _fountain.Step();
            rectMode(CENTER);
            textAlign(CENTER);
            noStroke();
            textSize(100);
            text("Great job!!!", width/2,height/2);
            pop();
            return;
        }
        fill(0);
        let c = _activeSubjects[_nextIndex].colorName;
        push();
        rectMode(CENTER);
        textAlign(CENTER);
        noStroke();
        textSize(50);
        text(c, width/2,height/2);
        pop();
        for(var i=0; i<_activeSubjects.length; i++){
            _activeSubjects[i].draw();
        }
    };

    this.handlePointAction = (p) => {
        if(!_activeSubjects.length){
            return;
        }
        let activated = _activeSubjects.filter(d => d.containsPoint(p))[0];
        if(!activated){
            return;
        }
        let index = _activeSubjects.indexOf(activated);
        if(index == _nextIndex){
            _bg = activated.color;
            _activeSubjects.splice(index,1);
            _nextIndex = nextIndex();
        }
        if(_activeSubjects.length == 0){
            _fountain = initFountain();
        }
    };

    function nextIndex(){
        return floor(random(0,_activeSubjects.length));
   }

   function initFountain(){
        return new Fountain({
            "parts": [
            {
                "name": "foo",
                "color": [ "white", [ 120, 100, 50 ], [200,100,50]],
                "shape": "rect",
                "gravity": 0.1,
                "sizePercent": 1,
                "angle": [ 240, 300 ],
                "speed": 9.5,
                //"limit": 250,
                "lifetime": 250,
                "size": [ 8, 12 ],
                "x": 0.5,
                "y": 0.5
            }
            ]
        }, 'foo');
   }
}