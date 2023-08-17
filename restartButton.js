// class for restart button in progress bar
class RestartButton{
    
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
        //draw the line on the left
        stroke(255);
        strokeWeight(2);
        line(this.x, this.y, this.x, this.y + this.height);
        
        // draw the triangle on the right
        noStroke();
        fill(255);
        triangle(this.x, this.y + this.height/2,
                this.x + this.width, this.y,
                this.x + this.width, this.y + this.height);
	};

	//checks for clicks on the button and stops playback.
	hitCheck(){
		if(mouseX > this.x && mouseX < this.x + this.width && 
           mouseY > this.y && mouseY < this.y + this.height) {
			if (sound.isPlaying()) {
    			sound.jump();   
  			}
            return true;
		}
        return false;
	};
}
