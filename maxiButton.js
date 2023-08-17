// class for the maximise button to be used in control panel
class MaxiButton{
    
    constructor(){
        this.x = null;
        this.y = null;

        this.length = 5;
        this.weight = 4;
    }
    
  
    draw(x,y){
        this.x = x;
        this.y = y;
        stroke(150);
        strokeWeight(this.weight);
        line(this.x-this.length, this.y, this.x+this.length, this.y);
        line(this.x, this.y+this.length, this.x, this.y-this.length);
    }

    
    hitCheck(){
        if(mouseX > this.x-this.length && mouseX < this.x+this.length && 
           mouseY > this.y-this.length && mouseY < this.y+this.length) {

            // change to maximized view
            return true;
          }
        return false;
    }
}
