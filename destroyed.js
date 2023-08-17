// class for spaceship being destroyed in asteroidsGame
class Destroyed extends Explosion{
  
    constructor(x,y,radius){
        super(x,y,radius=150);
        
        // set circles array to empty array so it doesn't contain meteorites
        this.circles = [];
        
        // fill circles array
        for(let i = 0; i < this.numCircles; i++){
            this.circles.push(new Fireball(x, y));
        }
    }
  
}
