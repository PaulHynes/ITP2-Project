// class to be used by the destroyed constructor in asteroidsGame
class Fireball extends Meteorite{
    
    constructor(x,y){
        super(x,y);
        //set the velocity
        this.v.mult(random(4, 8));
        // set the size
        this.size = random(15, 30);
    }
    
    draw(){
    
        noStroke();
        // random red colour
        fill(random(150, 255), random(80), random(20), 180);
        ellipse(this.pos.x, this.pos.y, this.size);
        //update position with velocity
        this.pos.add(this.v);
    
  }
  
}