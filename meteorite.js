// class for meteorites to be used by the asteroidsGame
class Meteorite{
    
    constructor(x,y){
        this.pos = createVector(x, y);
        this.v = null;
        this.size = null;

        // set the velocity
        this.v = p5.Vector.fromAngle(random(0, TWO_PI));
        // amplify the velocity
        this.v.mult(random(2, 5));

        // set the size
        this.size = random(10, 18);
    }
    
    draw(){

        noStroke();
        fill(random(255), random(255), random(255), 180);
        ellipse(this.pos.x, this.pos.y, this.size);
        
        //update position with velocity
        this.pos.add(this.v);

    }

}
