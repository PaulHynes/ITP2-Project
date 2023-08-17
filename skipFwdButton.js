// class for skip forward button to be used by control panel
class SkipFwdButton{
  
    constructor(){
        this.x = null;
        this.y = null;
        this.width = 20;
        this.height = 20;
    }
    

    draw(x,y){
        this.x = x;
        this.y = y;

        noStroke();
        fill(255);
        triangle(this.x + this.width, this.y + this.height/2,
                    this.x, this.y,
                    this.x, this.y + this.height);

            triangle(this.x + this.width*2, this.y + this.height/2,
                    this.x + this.width, this.y,
                    this.x + this.width, this.y + this.height);
        }

    hitCheck(){
        if(mouseX > this.x && mouseX < this.x + this.width*2 && 
           mouseY > this.y && mouseY < this.y + this.height) {
                
            // skip forward 3 seconds
            let jumpTo;

            if(sound.isPlaying()){
                //check if fewer than 3 seconds are remaining
                if(sound.currentTime() + 3 >= sound.duration()){
                    // restart song
                    sound.jump();
                } else {
                    jumpTo = sound.currentTime()+3;
                    sound.jump(jumpTo);
                } 
            }

            return true;
        }
        return false;
    }

}
