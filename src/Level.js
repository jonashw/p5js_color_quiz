function Level(subjects){
    var _bg = color(255);
    var _activeSubjects = subjects.slice();
    var _nextIndex = nextIndex();

    this.activate = () => {
    };

    this.reset = () => {
        _bg = color(255);
        _activeSubjects = subjects.slice();
    };

    this.draw = () => {
        background(_bg);
        if(!_activeSubjects.length){
            push();
            rectMode(CENTER);
            textAlign(CENTER);
            noStroke();
            textSize(72);
            text("Great job!!!", width/2,height/2);
            pop();
            return;
        }
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
        if(activated){
            let index = _activeSubjects.indexOf(activated);
            if(index == _nextIndex){
                _bg = activated.color;
                _activeSubjects.splice(index,1);
                _nextIndex = nextIndex();
            }
        }
    };

    function nextIndex(){
        return floor(random(0,_activeSubjects.length));
   }
}