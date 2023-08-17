// class for the progress bar
class ProgressBar{
    
    constructor(){
        this.x = null;
        this.y = null;
        this.length = 800;

        this.blockHeight = 30;

        this.playheadX = null;
        this.songProgress = 0;

        this.timeElapsed = "0:00";
        this.timeRemaining = "0:00";
    }
    
    
    draw(x,y){   
        this.x = x;
        this.y = y;

        this.playheadX = this.x + this.songProgress;
        
        // draw playhead
        stroke(255);
        strokeWeight(2);
        fill(0);
        triangle(this.playheadX, this.y-4,
                this.playheadX-10, this.y-14,
                this.playheadX+10, this.y-14);

        // draw progress blocks
        for (let i = 0; i < this.length; i++) {
            
          if (this.playheadX < this.x+i) {
            // colour the block grey
            fill(180);
          }
          else if (this.playheadX >= this.x+i) {
            // colour the block red
            fill(255-i/8,i/4,i/2);
          }

          noStroke();
          rectMode(CORNER);
          rect(this.x+i, this.y+2, 
             1, this.blockHeight);
        }
        
        // calculate time
        
        // private function to convert num to string in time format
        let numToMins = (time) => {
            
            const mins = floor(time/60)
            let secs = round(time%60);
            
            if (secs < 10) {
                secs = ("0" + secs);
            }
            
            time = (mins + ":" + secs);
            return time;
        }
        
        // draw track currentTime and time remaining  
        //check that the sound hasn't been paused
        if(!sound.isPaused()){
            this.timeElapsed = sound.currentTime()
            this.timeRemaining = sound.duration()-this.timeElapsed
            
            this.timeElapsed = numToMins(this.timeElapsed);
            this.timeRemaining = numToMins(this.timeRemaining);
        }
         
        //draw text for times
        fill(255);
        textSize(20);
        textFont(font);
        textAlign(LEFT);
        text(this.timeElapsed, this.x, this.y+60);
        text(this.timeRemaining, this.x+this.length-50, this.y+60);

    }

    updatePlayhead(){
        // map duration of song to length of progress bar
        const songLength = sound.duration();
        
        //check sound hasn't been paused
        if(!sound.isPaused()){
            // map current time to point on progress bar
            this.songProgress = map(sound.currentTime(), 0, songLength, 0, this.length);
        }
               
    }

}
