// class for starfield visualisation
class Starfield{
    
    constructor(){
        // name of the visualisation
        this.name = "starfield";
        // array to hold star objects
        this.stars = [];
        this.maxNum = 0;
        this.angle = 0;
        // variable for song length
        this.songLength = sound.duration();
        
    }
    
    
    draw(){
        
        // map current time to max number of stars
        this.maxNum = round(map(sound.currentTime(), 
                                0, this.songLength, 
                                100, 500)
                           );
        
        // add stars to stars array
        if (this.stars.length < round(this.maxNum)) {
            for(let i = this.stars.length; i < this.maxNum; i++) {
                this.stars[i]= new Star();
            }
        }
        
        // remove stars if length of stars array > maxNum
        if (this.stars.length > this.maxNum) {
            for(let i = this.stars.length; i > this.maxNum; i--) {
                this.stars.splice(i-1, 1);
            }
        }
        
        push();
        // move 0,0 to center of the screen
        translate(width/2, height/2);
        //make the starfield rotate
        rotate(this.angle);
        
        //update and draw all stars
        for(let s of this.stars) {
            s.update();
            s.draw();
        }
        
        // make starfield rotate slower and faster according to amplitude
        let level = amplitude.getLevel();
        
        //increase rotation angle according to amplitude level
        this.angle+= map(level, 0, 1, 0.0005, 0.1);
        // increase by constant amount
        this.angle+= 0.005;
        pop();
    }
    
}
