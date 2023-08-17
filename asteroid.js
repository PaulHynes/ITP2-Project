class Asteroid{
  
    constructor()
    {
        // variables to be assigned random values
        this.pos = null;
        this.numVertices = null;
        this.vertices = [];
        this.radius = null;
        // variables for motion
        this.velocity = null;
        // variable to hold start pos vector
        this.startPos = null;
        
        //assign radius value
        this.radius = random(50, 150);
    }

    
    // function to randomly generate an asteroid
    create(){
    
        // assign starting position off screen
        const startVector =  round(random(0, 3));
        
        if(startVector == 0){
            // above the screen
            this.pos = createVector(random(0, width), -this.radius);            
        } else if (startVector == 1){
            // below the screen
            this.pos = createVector(random(0, width), height+this.radius);
            
        } else if (startVector == 2){
            // to the left of the screen
            this.pos = createVector(0-this.radius, random(0, height));
            this.velocity = p5.Vector.fromAngle(random(-PI/2, PI/2));
            
        } else if (startVector == 3){
            //to the right of the screen
            this.pos = createVector(width+this.radius, random(0, height));
            
        }

        // assign number of vertices
        this.numVertices = random(3, 8);

        //set rotation
        this.rotation = random(-5, 5);

        // create random velocity value
        this.velocity = p5.Vector.fromAngle(random(0, TWO_PI));
        this.velocity.mult(random(4,8));

        // create vertices based on numVertices positioned around a circle
        angleMode(RADIANS);
        for(let i = 0; i < this.numVertices; i++){

            const angle = map(i, 0, this.numVertices, 0, TWO_PI);
            let x = this.radius * cos(angle);
            let y = this.radius * sin(angle);

            x += this.pos.x + random(-20, 20);
            y += this.pos.y + random(-20, 20);
            
            this.vertices.push(createVector(x, y));
            
        }
        //revert angleMode to degrees
        angleMode(DEGREES);
    
  }
    
  
  // function to render the asteroid
  draw(){
      
      fill(255, 100);
      stroke(255);
      strokeWeight(2);
      beginShape();
      for(let v of this.vertices){
          vertex(v.x, v.y);
      }
      endShape(CLOSE);

      this.update();
  }
  
  
  // function to update asteroid
  update(){
      
      //update pos
      this.pos.add(this.velocity);
    
      // update vertices position
      for(let v of this.vertices){
          v.add(this.velocity);
      }
      
  }
  
  
  //function to check if a missile hit the asteroid
  hitCheck(posX, posY){
      
      // adjust values of posX and posY to account for translate() in spaceship.js
      const adPosX = posX + width/2;
      const adPosY = posY + height/2;
      
      // variable to hold the distance between the asteroid and the missile
      const d = dist(this.pos.x, this.pos.y, adPosX, adPosY);
      
      // check if a missile has hit the asteroid using asteroid's radius
      if(d < this.radius){
          return true;
      } else {
          return false;
    }
      
  }
  
  
  // function to check if an asteroid is offscreen
  offScreen(){
      // check asteroid x position
      if(this.pos.x < -this.radius*3 ){
          return true;
          
      } else if(this.pos.x > width+this.radius*3){
          return true;

      }
      // check asteroid y position
      else if(this.pos.y < -this.radius*3 ){
          return true;

      } else if(this.pos.y > height+this.radius*3){
          return true;

      } else {
          //asteroid is still on screen
          return false;
      }
  }
  
}
