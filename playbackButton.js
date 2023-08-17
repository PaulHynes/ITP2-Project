//class for playback button used by controlpanel
class PlaybackButton{
    
    constructor(){
        this.x = null;
        this.y = null;
        this.width = 20;
        this.height = 20;

        //flag to determine whether to play or pause after button click and
        //to determine which icon to draw
        this.playing = false;
    }

	draw(x,y){
        this.x = x;
        this.y = y;
        
		if(this.playing){
            // draw the pause button
            fill(255);
            noStroke();
            rectMode(CORNER);
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{
            // draw the play button
            fill(255);
            noStroke();
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);

		}
	}

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	hitCheck(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			if (sound.isPlaying()) {
    			sound.pause();
  			} else {
    			sound.loop();
  			}
  			this.playing = !this.playing;
  			return true;
		}
			return false;
	}

}
