//class for wavepattern visualisation
class WavePattern{
    
    constructor(){
        //vis name
        this.name = "wavepattern";
        this.angle = 0;
        this.increment = 0.01;
    }
	

	//draw the wave form to the screen
	draw(){
		push();
        // move 0,0 position
        translate(width/2, height/2);
        // rotate the pattern
        rotate(this.angle)
		noFill();
		stroke(255, 0, 0);
		strokeWeight(2);

		beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++){
			//for each element of the waveform map it to screen 
			//coordinates and make a new vertex at the point.
			const x = map(i, 0, wave.length, -width/2, width/2);
			const y = map(wave[i]*2, -1, 1, -height/2, height/2);

			vertex(x, y);
		}
		endShape();
        
        // increment rotation angle
        this.angle += this.increment;
    
		pop();
	};
}
