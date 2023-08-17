// class for spaceship to be used by asteroidsGame
class Spaceship{
  
    constructor(){
        this.x = 0;
        this.y = 0;
        this.angle = 0;

        //  this.isFiring = false;
        this.missiles = [];

        // variables to allow missile to fire
        this.canFire = true; 
    }
    
    
    draw(){
        push();
        translate(width/2, height/2);
        
        // check for keyPressed events
        this.keyPressed();
        
        // draw the missiles
        
        for (let m of this.missiles) {
            m.draw();
        }
      
        // rotate the spaceship
        angleMode(DEGREES);
        rotate(this.angle);
        
        //draw spaceship
        stroke(255);
        strokeWeight(3);
        fill(0);
        beginShape();
        vertex(this.x, this.y-10);
        vertex(this.x-20, this.y+30);
        curveVertex(this.x, this.y+20);
        vertex(this.x+20, this.y+30);
        endShape(CLOSE);
        
        pop();
        
        // remove missiles that have gone off screen
        // or collided with an asteroid
        for(let i = this.missiles.length-1; i >-1; i--){
            
            if(this.missiles[i].isOffScreen()){
                
                // splice from missiles array
                this.missiles.splice(i, 1);
            }
        }
        
    }
    
    // function to fire a missile
   fireMissile(x,y,angle){
        
        //only allow missiles to be fired if sound is playing
        if(sound.isPlaying()){

            // only fire if canFire is true
            if(this.canFire){
                this.missiles.push(new Missile(x, y, angle));
                this.canFire = false;
                
            }
        } else if(!sound.isPlaying()) {
            alert('You can only fire missiles if the music is playing.');
            
        }
    }
    
    //function to check if any asteroids have hit the spaceship
    hitCheck(asteroid){
        const d = dist(asteroid.pos.x, asteroid.pos.y, width/2, height/2);
        
        if(d < asteroid.radius){
           return true;
        } else {
           return false;
        }
    }
  
    keyPressed(){
        if (keyIsDown(LEFT_ARROW)) {
          this.angle -= 4;
        }
        if (keyIsDown(RIGHT_ARROW)) {
          this.angle += 4;
        }

        // if f key is pressed
        if (keyIsDown(70)) {
            this.fireMissile(this.x, this.y, this.angle);
        }
        
    }
    
    keyReleased(){
        if(keyCode == 70){
            this.canFire = true;
        }
    }
  
}
