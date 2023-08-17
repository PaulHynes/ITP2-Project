// class for explosions, to be used by the asteroidsGame
class Explosion{
  
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        
        this.numCircles = random(30, this.radius);
        
        this.circles = [];
        
        // fill circles array
        for(let i = 0; i < this.numCircles; i++){
            this.circles.push(new Meteorite(x, y));
        }
    }
    
    
    draw(){
        // draw all the circles
        for(let m of this.circles){
            m.draw();
        }
    
        // remove circles from the array
        for(let i = this.circles.length-1; i > -1; i--){
            const d = dist(this.circles[i].pos.x, 
                         this.circles[i].pos.y,
                         this.x, this.y);
      
            if(d > this.radius){
                this.circles.splice(i, 1);
            }
        }
    } 
  
}