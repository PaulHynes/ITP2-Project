class ControlPanel{
    
    constructor(){
        this.x = windowWidth/2;
        this.y = windowHeight * 5/6;
        //maximised view variables
        this.maxWidth = 900;
        this.maxHeight = 130;
        //minimised view variables
        this.minWidth = 260
        this.minHeight = 50;

        // variable to allow the panel to be moved
        this.move = false;

        this.progressBar = new ProgressBar();

        this.playbackButton = new PlaybackButton();
        this.stopButton = new StopButton();
        this.restartButton = new RestartButton();
        this.skipFwdButton = new SkipFwdButton();
        this.skipBwdButton = new SkipBwdButton();
        this.moveButton = new MoveButton();
        this.miniButton = new MiniButton();
        this.maxiButton = new MaxiButton();

        //variable to change between maximised and minimised states
        this.state = "max";
    }
    
  
    draw(){
        
        //draw in maximised state
        if(this.state === "max"){
            rectMode(CENTER);
            stroke(255);
            strokeWeight(2);
            fill(0, 200);
            rect(this.x, this.y, this.maxWidth, this.maxHeight, 6);

            // progress bar
            this.progressBar.draw(this.x-400, this.y-40);
            this.progressBar.updatePlayhead();

            //playback button 
            this.playbackButton.draw(this.x, this.y+20);

            // stop button
            this.stopButton.draw(this.x+85, this.y+20);

            // restart button
            this.restartButton.draw(this.x+125, this.y+20);

            // skip forward button
            this.skipFwdButton.draw(this.x+35, this.y+20);

            // skip backward button
            this.skipBwdButton.draw(this.x-60, this.y+20);

            // move button
            this.moveButton.draw(this.x+430, this.y-60);
            
            // minimise button
            this.miniButton.draw(this.x+410, this.y-55);
            
        }
        // draw in minimized state
        else if (this.state === "min"){
            rectMode(CENTER);
            stroke(255);
            strokeWeight(2);
            fill(0, 200);
            rect(this.x, this.y, this.minWidth, this.minHeight, 6);
            
            //playback button 
            this.playbackButton.draw(this.x-50, this.y-10);

            // stop button
            this.stopButton.draw(this.x+35, this.y-10);

            // restart button
            this.restartButton.draw(this.x+75, this.y-10);

            // skip forward button
            this.skipFwdButton.draw(this.x-15, this.y-10);

            // skip backward button
            this.skipBwdButton.draw(this.x-110, this.y-10);

            // move button
            this.moveButton.draw(this.x+110, this.y-20);
            
            // maximise button
            this.maxiButton.draw(this.x+117, this.y+10);
            
        }
    }
        
    // check for mouse interaction
    mousePressed(){
        //check if the any of the buttons have been clicked
        //or if user clicks inside control panel
        //if not make the visualisation fullscreen
            if(this.playbackButton.hitCheck()){
                return true;
            } else if (this.stopButton.hitCheck()){
                this.playbackButton.playing = false;
                return true;
            } else if (this.restartButton.hitCheck()){
                return true;
            } else if (this.skipFwdButton.hitCheck()){
                return true;
            } else if (this.skipBwdButton.hitCheck()){
                return true;
            } else if (this.moveButton.hitCheck()){
                this.move = true;
                return true;
            } else if (this.miniButton.hitCheck()){
                this.state = "min";
                return true;
            } else if (this.maxiButton.hitCheck()){
                this.state = "max";
                return true;
            } else if(this.hitCheck()) {
                return true;
            } else {
                return false;
        }
        
    }
    
    hitCheck(){
        // check if clicked in the max state
        if(this.state === 'max'){
            
            if(mouseX > this.x-this.maxWidth/2 && 
               mouseX < this.x+this.maxWidth/2 &&
               mouseY > this.y-this.maxHeight/2 &&
               mouseY < this.y+this.maxHeight/2) {
                
                return true;
            }
        
        // check if clicked in the min state
        } else if (this.state === 'min'){
            
            if(mouseX > this.x-this.minWidth/2 && 
               mouseX < this.x+this.minWidth/2 &&
               mouseY > this.y-this.minHeight/2 &&
               mouseY < this.y+this.minHeight/2) {
                
                return true;
            }
        }
    }
    
}
