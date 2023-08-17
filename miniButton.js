// class for the minimise button to be used by the control panel
class MiniButton{
    
    constructor(){
        this.x = null;
        this.y = null;
        this.weight = 4;
        this.length = 10;
    }
    
    
    draw(x,y){
        this.x = x;
        this.y = y;
        
        stroke(150);
        strokeWeight(this.weight);
        line(this.x, this.y, this.x+this.length, this.y);
    }
 
    hitCheck(){
        if(mouseX > this.x && mouseX < this.x + this.length && 
           mouseY > this.y-this.weight && mouseY < this.y + this.weight) {
            
            // change to minimized view
            return true;
          }
        return false;
    }
}
