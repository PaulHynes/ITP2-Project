// class for spectrum visualisation
class Spectrum{
    
    constructor(){
        this.name = "spectrum";
    
        // song progress used for colour mapping
        this.songProgress = 0;
    }
	

	draw(){
		push();
		var spectrum = fourier.analyze();
        
        // track the song progress and map value from 0 - 255
        var songLength = sound.duration();
        
        if(!sound.isPaused()){
            
            this.songProgress = map(sound.currentTime(), 0, songLength,
                      0, 255);
        }
        
		noStroke();
		
		for (let i = 0; i < spectrum.length; i++){
            // calculate value for x coordinate
			const x = map(i, 0, spectrum.length, 0, width*1.5);
            // calculate value for height of rectange
            const h = -width + map(spectrum[i], 0, 255, width, 0);
            
            // map spectrum value to green values.
            const b = map(spectrum[i], 0, 255, 220, 0);
            
            // draw rectange
            fill(spectrum[i], this.songProgress, b);
            rect(x, height, -height/ spectrum.length, h);
  		}
		pop();
	}
    
}
