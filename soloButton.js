// class for needles solo buttons
class SoloButton{
    
    constructor(){
        this.x = null;
        this.y = null;
        this.width = 90;
        this.height = 50;

        this.solo = false;
    }
    
    
    draw(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        //check for button state and change fill
        if(!this.solo) {
            // if the button hasn't been pressed, faint colour and no filter
            fill(255, 0, 0, 100);
        } else if (this.solo) {
            // if the button has been pressed, bright colour and audio filter
            fill(255, 0, 0);   
        }

        rect(this.x, this.y, this.width, this.height);
        fill(0);
        textSize(this.height/3)
        text('SOLO', 
             (this.x+this.width/2) - (this.height/2), 
             this.y+30);

    }
    
    hitCheck(){
        // if mouse pressed, check if any of the solo buttons have been pressed
        if(mouseX > this.x && mouseX < this.x+this.width &&
           mouseY > this.y && mouseY < this.y+this.height)
        {
            this.solo = !this.solo;
            return true;
        }
        return false;
    }
}