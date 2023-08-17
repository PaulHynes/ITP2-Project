// class for the stop button used by controlpanel
class StopButton{
    
    constructor(){
        this.x = null;
        this.y = null;
        this.width = 20;
        this.height = 20;
        this.playing = false;
    }

    
	draw(x,y){
        this.x = x;
        this.y = y;
		if(sound.playing){
			fill(255);
            noStroke();
            rectMode(CORNER);
            rect(this.x, this.y, this.width, this.height);
		}
		else{	
            fill(255); // need to make this fill(255, 100)
            noStroke();
            rectMode(CORNER);
            rect(this.x, this.y, this.width, this.height);
		}
        
	}

	//checks for clicks on the button and stops playback.
	hitCheck(){
		if(mouseX > this.x && mouseX < this.x + this.width && 
           mouseY > this.y && mouseY < this.y + this.height) {

            sound.jump();
            sound.stop();
            
            return true;
		}
        return false;
	}
}
