//class for needles visualisation
class Needles{
    
    constructor(){
        //name of the visualisation
        this.name = "needles";

        //how large is the arc of the needle plot.
        this.minAngle = PI + PI / 10;
        this.maxAngle = TWO_PI - PI / 10;

        this.plotsAcross = 2;
        this.plotsDown = 2;

        // array of solobuttons
        this.solos = [];
        // variable to hold currently solo'd button
        this.solod = null;

        // array of filters
        this.filters = [];

        //filters
        this.lowPassF = new p5.LowPass();
        this.lowMidF = new p5.BandPass();
        this.highMidF = new p5.BandPass();
        this.highPassF = new p5.HighPass();

        // set filter frequencies, resonances and gain controls
        this.lowPassF.freq(120);
        this.lowPassF.gain(5);

        this.lowMidF.freq(250);
        this.lowMidF.res(1);
        this.lowPassF.gain(10);

        this.highMidF.freq(700);
        this.highMidF.res(1);
        this.highMidF.gain(20);

        this.highPassF.freq(1200);
        this.highPassF.gain(1.4);

        //frquencies used by the energyfunction to retrieve a value
        //for each plot.
        this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];
    }
	

	// resize elements of the visualisation
	onResize(){
		this.pad = width / 20;
        //resize the plots sizes when the screen is resized.
		this.plotWidth = (width - this.pad) / this.plotsAcross;
		this.plotHeight = (height - this.pad) / this.plotsDown;
		this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;
        
        // resize the meter LEDs
        this.ledRadius = (width - this.pad) / 45;
        
        // resize the VU meter text
        this.textSize = (width - this.pad) / 40;
        
        // resize the solobuttons
        this.soloW = (width - this.pad) / 18;
        this.soloH = (width - this.pad) / 30;
	};
    

	// draw the plots to the screen
	draw(){
        
        this.onResize();
		//create an array amplitude values from the fft.
		let spectrum = fourier.analyze();
		//iterator for selecting frequency bin.
		let currentBin = 0;
        
		push();
        
        // draw background for needles display
        fill(70, 150)
        stroke(160, 200);
        strokeWeight(1);
        rect(50, 10, windowWidth-100, windowHeight-20, 10);
        
        // create the buttons on the first loop
        if (this.solos.length == 0){
            for(let i = 0; i < 4; i++){
                this.solos.push(new SoloButton());
            }
        }
        
        // create the filters on the first loop
        if(this.filters.length == 0){
            this.filters.push(this.lowPassF);
            this.filters.push(this.lowMidF);
            this.filters.push(this.highMidF);
            this.filters.push(this.highPassF);
        }
        
		
		//nested for loop to place plots in 2*2 grid.
		for (let i = 0; i < this.plotsDown; i++) {
			for (let j = 0; j < this.plotsAcross; j++) {

				const x = 80 + i * windowWidth / 2;
				const y = 20 + j * windowHeight / 2;
				const w = windowWidth / 2.5;
				const h = windowHeight / 2.5;
				
				//draw a rectangle out of two triangles at that location and size
                noStroke();
                fill(242,237,172);
                triangle(x, y, x+w, y, x, y+h);
                fill(235,230,166);
                triangle(x+w, y+h, x+w, y, x, y+h);

				//add on the ticks
				this.ticks(x+w/2, y+h, this.frequencyBins[currentBin]);
                
                //get energy value of current bin
				const energy = fourier.getEnergy(this.frequencyBins[currentBin]);

				//add the needle
				this.needle(energy, x+w/2, y+h);
                
                // draw LED volume meters
                for(let i = 0; i < 15; i++){
                    // set colour transparency values according to
                    // getEnergy values 
                    let strokeTrans;
                    let fillTrans;
                    
                    if(energy > i*17){
                        strokeTrans = 150;
                        fillTrans = 255;
                    } else {
                        strokeTrans = 50;
                        fillTrans = 100;
                    }
                    
                    // change fill colour
                    if(i < 9){
                        stroke(85,255,51,strokeTrans);
                        fill(85,255,51,fillTrans);
                    } else if (i < 11) {
                        stroke(255,255,77,strokeTrans);
                        fill(255,255,77,fillTrans);
                    } else { 
                        stroke(255,25,25,strokeTrans);
                        fill(255,25,25,fillTrans);
                    }
                    
                    strokeWeight(5);
                    ellipse(
                        x+20+(i*this.ledRadius), 
                        y+h+40, 
                        this.ledRadius);
                }
                
                // boolean for solo button
                const soloX = x+w-90;
                const soloY = y+h+10
                
                // draw the solo button
                this.solos[currentBin].draw(soloX, soloY, this.soloW, this.soloH);
                
				currentBin++;
			}
		}
		pop();
        
	}
    
    mousePressed(){
        // check if the user pressed any of the solo buttons
        for(let i = 0; i < this.solos.length; i++){
            
            if(this.solos[i].hitCheck()){
                // check if either no button is solo'd
                if(this.solod === null){
                    
                    //disconnect audio from main output
                    sound.disconnect();
                    //connect audio to filter
                    sound.connect(this.filters[i]);
                    this.solod = i;
                    
                    return true;
                }
                // if a button is already solo'd
                else if (this.solod != null){
                    
                    // check if button clicked is already solo'd
                    if (this.solod === i){
                        
                        // reset solo'd variable to null
                        this.solod = null;
                        
                        //disconnect sound from the filter
                        sound.disconnect();
                        // connect sound to main output
                        sound.connect();
                        
                        return true;
                        
                    } else if (this.solod != i){
                        
                        // make sure button remains switched off
                        this.solos[i].solo = false;
                        // alert user to only use one frequency band.
                        alert("Only one frequency band can be solo'd at a time.");
                        
                    }
                }
                
            }
            
        }
    }
    

	/*
	 *draws a needle to an individual plot
	 *@param energy: The energy for the current frequency
	 *@param centreX: central x coordinate of the plot rectangle
	 *@param bottomY: The bottom y coordinate of the plot rectangle
	 */
	needle(energy, centreX, bottomY){
		push();
		stroke(80);
        //set angleMode
        angleMode(RADIANS);
		//translate so 0 is at the bottom of the needle
		translate(centreX, bottomY);
		//map the energy to the angle for the plot
		let theta = map(energy, 0, 255, this.minAngle, this.maxAngle);
		//calculate x and y coorindates from angle for the length of needle
		let x = this.dialRadius * cos(theta);
		let y = this.dialRadius * sin(theta);
		//draw the needle
        strokeWeight(2);
		line(0, 0, x, y);
		pop();
	};

	/*
	 *draw the graph ticks on an indivisual plot
	 *@param centreX: central x coordinate of the plot rectangle
	 *@param bottomY: The bottom y coordinate of the plot rectangle
	 *@param freqLabel: Label denoting the frequency of the plot
	 */
	ticks(centreX, bottomY, freqLabel){
		// 8 ticks from pi to 2pi
		let nextTickAngle = this.minAngle;
		push();
		stroke('#333333');
        strokeWeight(2);
		fill('#333333');
        //set angleMode
        angleMode(RADIANS);
		translate(centreX, bottomY);
		//draw the semi circle for the botttom of the needle
		arc(0, 0, 50, 50, PI, 2 * PI);
		textAlign(LEFT);
		textSize(this.textSize);
        noStroke();
		text(freqLabel, -50, -(this.plotHeight / 2));

		for (let i = 0; i < 9; i++) {
			//for each tick work out the start and end coordinates of
			//based on its angle from the needle's origin.
			const x = this.dialRadius * cos(nextTickAngle);
			const x1 = (this.dialRadius - 20) * cos(nextTickAngle);

			const y = (this.dialRadius) * sin(nextTickAngle);
			const y1 = (this.dialRadius - 20) * sin(nextTickAngle);
            
            // change tick colour depending on positions
            if(i < 6){
                stroke(20);
            } else {
                stroke(255, 0, 0);
            }
            
			line(x, y, x1, y1);
			nextTickAngle += PI / 10;
		}
		pop();
	}

}
