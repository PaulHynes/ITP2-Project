// class for star to be used by starfield
class Star{
    
    constructor(){
        //star coordinates
        this.x = random(-width/2, width/2);
        this.y = random(-height/2, height/2);
        this.z = random(width);
        this.pz = this.z;
        this.speed = 12;

        // array for color values for fill
        this.colorVals = [];

        this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];
    }
    
  
    update(){
        // update z position
        this.z = this.z - this.speed;
        
        // reset the star if it goes off screen
        if(this.z < 1) {
            this.z = width;
            this.x = random(-width/1.5, width/1.5);
            this.y = random(-height/1.5, height/1.5);
            this.pz = this.z;
        }        
        
        //create an array amplitude values from the fft.
		let spectrum = fourier.analyze();
        
        
        // change colour based on freq bands' amplitude and
        for (let i = 0; i < 4; i++){
            const energy = fourier.getEnergy(this.frequencyBins[i]);
            
            this.colorVals[i] = map(energy,0, 255, 80, 255);
            // change colorval by random amount
            this.colorVals[i] += random(-25, 25);
        }
    }

    draw(){  
        // create ellipse radius relatice to distance
        //from center point
        let r = map(this.z, 0, width, 15, 0);
        
        //multiple radius by random amount
        r *= random(0.8, 1.2);
        
        // calculate the starting points for the light trail
        // and position of the stars
        let sx = map(this.x/this.z, 0, 1, 0, width);
        let sy = map(this.y/this.z, 0, 1, 0, height);

        // draw the star
        noStroke();
        fill(this.colorVals[0], this.colorVals[1], this.colorVals[2]);
        noStroke();
        ellipse(sx, sy, r);
        
        // draw the halo
        fill(this.colorVals[0], this.colorVals[1], this.colorVals[2], 120);
        noStroke();
        ellipse(sx, sy, r*1.5);
        
        fill(this.colorVals[0], this.colorVals[1], this.colorVals[2], 80);
        noStroke();
        ellipse(sx, sy, r*2);
        
        // draw the light trail
        //calculate the starting points for the trails
        const px = map(this.x/this.pz, 0, 1, 0, width);
        const py = map(this.y/this.pz, 0, 1, 0, height);
        
        // draw the line
        strokeWeight(r/4);
        stroke(this.colorVals[0], this.colorVals[1], 
               this.colorVals[2], this.colorVals[3]/2);
        line(px, py, sx, sy);
        
    }

}
