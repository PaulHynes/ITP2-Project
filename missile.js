// class for missile to be used in asteroids game
class Missile{
    
    constructor(x,y,angle){
        // angle 
        this.angle = angle;
        // create vector for missile's velocity
        this.velocity = p5.Vector.fromAngle(radians(this.angle)-PI/2);
        //create vector for missile's end position
        this.epos = createVector(x, y);
        // create vector for missile's front position
        this.fpos = null;

        //missile length
        this.length = 14;

        //variable to show if missile has hit a target
        this.spent = false;

        //increase velocity of missiles
        this.velocity.mult(5);
    }
    
    
    draw(){
        //calculate vector values for front of the line  
        const x = this.length * cos(this.angle+degrees(PI/2));
        const y = this.length * sin(this.angle+degrees(PI/2));
        
        this.fpos = this.epos.copy();
        this.fpos.add(x, y);
        
        stroke(255);
        strokeWeight(5);
        line(this.fpos.x, this.fpos.y, this.epos.x, this.epos.y);
        
        // update position using velocity vector
        this.epos.add(this.velocity);
    
    }
    
    isOffScreen(){
        //check if the missile has gone offscreen
        if(this.epos.x < -width/2 || this.epos.x > width/2 ||
           this.epos.y < -height/2 || 
           this.epos.y > height/2){
            
            return true;
            
        } 
        // check if missile has hit a target
        else if(this.spent === true){
            return true;
            
        } else {
            return false;
            
        }
    }
}
