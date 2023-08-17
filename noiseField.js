// class for Noise Field visualisation
class NoiseField{

    constructor(){
        //name of the visualisation
        this.name = "noise field";

        // scale for drawing triangle stip
        this.scl = 22;
        // variables for window size
        this.w = windowWidth;
        this.h = windowHeight;

        // calculate number of columns and rows
        this.cols = this.w*1.5 / this.scl;
        this.rows = this.h*1.5 / this.scl;
        // set variable to move the terrain
        this.flying = 0;
        //array for terrain coordinates
        this.terrain = [];

        //array for colour values
        this.colorVals = [];

        this.frequencyBins = ["bass", "mid", "treble"];

        // create new canvas using WEBGL for 3d effects
        this.graphics = createGraphics(windowWidth, windowHeight, WEBGL);


        for(let i = 0; i < this.cols; i++){
            this.terrain[i] = [];
        }
    }
    
  
    draw(){
        
        let ampOffset = amplitude.getLevel()/2;
        let spectrum = fourier.analyze();
        
        for (let i = 0; i < 3; i++){
            const energy = fourier.getEnergy(this.frequencyBins[i]);
            
            this.colorVals[i] = map(energy, 0, 255, 20, 255);
            
        }
    
        //advance terrain if the song is playing
        if(sound.isPlaying()){
            this.flying -= 0.01 + ampOffset;
            
            let yoff = this.flying;

            for (let y = 0; y < this.rows; y++) {
                let xoff = 0;
                for (let x = 0; x < this.cols; x++) {
                
                    this.terrain[x][y] = map(noise(xoff, yoff), 
                                             0, 1, -300, 350+ampOffset*10);
                    xoff += 0.1;
                }
                yoff += 0.1;
            }
        }
        
        
        // draw 3d graphics
        this.graphics.background(0);
        
        this.graphics.push();
        this.graphics._renderer._update(); // this is needed due a p5js bug
        
        this.graphics.rotateX(PI/4);
        this.graphics.translate(-this.w/1.3, -this.h/2);
        
        // lighting
        this.graphics.ambientLight(255, 255, 255, 0, 0, 50);
        this.graphics.pointLight(250, 250, 250, 
                            map(sound.currentTime(), 0, sound.duration(), 
                            -windowWidth/2, windowWidth/2), 
                            0, 0);
        
        // material
        this.graphics.specularMaterial(this.colorVals[0]*0.8, 
                                       this.colorVals[1],
                                       this.colorVals[2]*1.1, 150);
        
        this.graphics.shininess(50);

        for (let y = 0; y < this.rows-1; y++) {
    
            this.graphics.stroke(150, 150);
            this.graphics.strokeWeight(1);
            this.graphics.beginShape(TRIANGLE_STRIP);
            for (let x = 0; x < this.cols-1; x++) {
                this.graphics.vertex(x*this.scl, y*this.scl, this.terrain[x][y]);
                this.graphics.vertex(x*this.scl, (y+1)*this.scl, this.terrain[x][y+1]);
            }
            this.graphics.endShape();
        }

        this.graphics.pop();
        
        // draw new canvas
        image(this.graphics, 0, 0);
    }
    
}
