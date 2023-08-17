class AsteroidsGame{
    
    constructor(){
        //name of the visualisation
        this.name = "asteroids";
        // game state - 0 = game is playing, 1 = game over
        this.state = 0;

        //current score and high score counters
        this.currentScore = 0;
        this.highScore = 0;
        // boolean for new highscore
        this.newHighScore = false;

        // array of asteroids
        this.asteroids = [];
        // array of explosions
        this.explosions = [];
        // array of destroyed spaceships
        this.destroyeds = [];

        //number of lives
        this.lives = 3;

        //spaceship object
        this.spaceShip = new Spaceship();
        
        // perlin noise offsets for background
        this.xoff = 0.001;
        // spacing variable for background ellipses
        this.spacing = 14;
        // song progress used for colour mapping and num of asteroids   
        this.songProgress = 0;
        
    }
    
    
    // main draw function
    draw(){
        // track the song progress and map value from 0 - 255
        const songLength = sound.duration();
        
        //calculate the song progress and map to 8bit value
        if(!sound.isPaused()){
            
            this.songProgress = map(sound.currentTime(), 0, songLength,
                      0, 255);
        }
    
        // draw game background
        this.drawBackground();
        // game stats
        this.stats();
        
        // if the game is playing, draw spaceship, asteroids, count score
        if (this.state === 0){

            // draw the spaceship
            this.spaceShip.draw();
            // check for collisions
            this.checkCollisions();
            
            
            // draw asteroids
            this.drawAsteroids();
            
            // draw explosions
            this.drawExplosions();
            
            // if lives == 0, change the game state
            if (this.lives === 0){
                this.state = 1;
            }
            
            //check if new highscore
            if(this.currentScore > this.highScore){
                this.highScore = this.currentScore;
                this.newHighScore = true;
            }
            
        }
        // game over state
        else if (this.state === 1){
            
            // draw any leftover explosions
            this.drawExplosions();
            
            // display game over text
            fill(150, 180);
            rect(width/2-250, height/2-140, 500, 250, 5);
            // text
            fill(255);
            textSize(40);
            noStroke();
            textAlign(CENTER);
            text("Game Over!\nPress Enter to play again", 
                 width/2, height/2-100);
            
            //if new high score, post high score
            if(this.newHighScore){

                text("Congratulations!\nNew High Score: " + this.highScore,
                     width/2, height/2+50);
                
            } 
            // otherwise, display current score and high score
            else{

                text("Your Score: " + this.currentScore + 
                     "\nHigh Score: " + this.highScore, 
                     width/2, height/2+50);
            }
            
            //check for enter button key press to reset the game
            this.keyPressed();
            
        }
        
    }
    
    
    //function for drawing the background
    drawBackground(){
        //fourier analysis to draw background
        let spectrum = fourier.analyze();
        let wave = fourier.waveform();
        
        // draw the background
        push();
        translate(width/2, height/2);
        
        for(let i = -width/2; i < width/2; i+=this.spacing){
            // calculate energy values for frequencies across human hearing range
            const energyVal = map(i, -width/2, width/2, 20, 16000);
            const energy = fourier.getEnergy(energyVal);
            
            for(let j = -height/2; j < height/2; j+=this.spacing){
                
                // perlin noise values for fill
                let r = noise(this.xoff);
                
                //if energy > abs(j), change fill of ellipse
                // multiply energy to increase number of ellipses filled
                if(energy*3 > abs(j)){
                   fill(this.songProgress, r*255, energy, 200);
                   
                } else {
                    // grey fill
                    fill(110, 50);
                }
                // draw the ellipse
                noStroke();
                ellipse(i, j, 9);
            
                //increment perlin noise offset
                this.xoff += 0.01;
            }
        }
        pop();
    }
    
    
    //function for checking collisions
    checkCollisions(){
        // check if missiles hit asteroids
        for(let m of this.spaceShip.missiles){
            for(let j = this.asteroids.length-1; j >= 0; j--){

                if(this.asteroids[j].hitCheck(
                    m.fpos.x, m.fpos.y)){

                    //add to current score
                    // 1000 times the reciprocal of the asteroid radius
                    this.currentScore += round((1/this.asteroids[j].radius)*1000);

                    //create explosion
                    this.explosions.push(
                        new Explosion(
                            this.asteroids[j].pos.x,
                            this.asteroids[j].pos.y,
                            this.asteroids[j].radius
                        )
                    );

                    // if hit, splice asteroid from asteroids array
                    this.asteroids.splice(j, 1);

                    //set missile spent value to true so it will be spliced
                    m.spent = true;

                }
            }

        }

        // check if asteroid hits the spaceship
        for(let i = this.asteroids.length-1; i >= 0; i--){
            if(this.spaceShip.hitCheck(this.asteroids[i])){

                //create destroyed animation
                this.destroyeds.push(new Destroyed(width/2, height/2));

                // remove the asteroid
                this.asteroids.splice(i, 1);

                //remove one life
                this.lives--;

            }
        }
        
    }
    
    
    //function to create and draw asteroids
    drawAsteroids(){
            // create new asteroids
            // use bass energy to create new asteroids
            let energy = fourier.getEnergy("bass");
            
            //set max number of asteroids
            let maxNum = this.songProgress / 8;
            
            // limit num of asteroids
            if(this.asteroids.length < maxNum){
                
                if (energy > 180){
                    this.asteroids.push(new Asteroid());
                    //create the most recent new asteroid
                    this.asteroids[this.asteroids.length-1].create();
                }
            }

            // draw all asteroids
            for(let a of this.asteroids){
                a.draw();
                
            }
            
            // change asteroid velocity if it goes off screen
            for(let a of this.asteroids){
                if(a.offScreen()){
                    
                    // reverse the velocity
                    a.velocity.mult(-1);
                    //rotate velocity
                    a.velocity.rotate(random(-PI/4, PI/4));
                }
            }
    }
    
    //function for drawing asteroid and spaceship explosions
    drawExplosions(){
        // draw asteroid explosions
        if(this.explosions.length > 0){
                for(let e of this.explosions){
                    e.draw();
                }
                //splice any completed explosions
                for(let i = this.explosions.length-1; i>= 0; i--){
                    if(this.explosions[i].circles.length === 0){
                        this.explosions.splice(i, 0);
                    }
                }
            }
            
            // draw spaceship destroyed animation
            if(this.destroyeds.length > 0){
                for(let d of this.destroyeds){
                    d.draw();
                }
                //splice any completed explosions
                for(let i = this.destroyeds.length-1; i>= 0; i--){
                    if(this.destroyeds[i].circles.length === 0){
                        this.destroyeds.splice(i, 0);
                    }
                }
            }
        
    }
    
    //function for drawing game stats
    stats(){
        fill(255);
        textSize(40);
        strokeWeight(2);
        textFont(font);
        textAlign(LEFT);
        // currentscore
        text("Score", width*3/4, height*1/20);
        text(this.currentScore, width*3/4+40, height*2/20);
        // highscore
        text("Hi-Score", width*5/6, height*1/20);
        text(this.highScore, width*5/6+40, height*2/20);
        // lives
        text("Lives", width/6, height*1/20);
        text(this.lives, width/6+40, height*2/20);
    }
    
    //reset to defaults when a new game is started
    reset(){
        this.lives = 3;
        this.currentScore = 0;
        this.spaceShip.angle = 0;
        this.spaceShip.missiles = [];
        this.newHighScore = false;
        this.state = 0;
        this.asteroids = [];
        this.explosions = [];
        this.destroyeds = [];
    }
    
    keyPressed(){
            if(keyIsDown(ENTER)){
                this.reset();
            }
    }
    
}
