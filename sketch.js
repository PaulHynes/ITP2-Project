//global for the controls and input 
let controls = null;
let controlPanel = null;
//store visualisations in a container
let vis = null;
//variable for the p5 sound object
let sound = null;
//variable for p5 fast fourier transform
let fourier;
// variable for sound amplitude
let amplitude;
// variable for font
let font;

function preload(){
    // preload audio file
	sound = loadSound('assets/stomper_reggae_bit.mp3');
    // preload font for WBGL
    font = loadFont('assets/american-typewriter.ttf');
}

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    background(0);
    
    // set pixel density
    pixelDensity(1);
    
    // set text font
    textFont(font);
    
    controls = new ControlsAndInput();
    controlPanel = new ControlPanel();

    //instantiate the fft object
    fourier = new p5.FFT();
    // instantiate the amplitude object
    amplitude = new p5.Amplitude();

    //create a new visualisation container and add visualisations
    vis = new Visualisations();
    vis.add(new Spectrum());
    vis.add(new WavePattern());
    vis.add(new Needles());
    vis.add(new Starfield());
    vis.add(new NoiseField());
    vis.add(new AsteroidsGame());

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
    controlPanel.draw();
}

function mousePressed(){
	
    // check if any controlPanel buttons have been pressed
    if(!controlPanel.mousePressed()){
        
        // if displaying needles vis, check if any buttons have been presssed
        if(vis.selectedVisual.name == 'needles'){
            if(!vis.selectedVisual.mousePressed()){
                // if not, toggle fullscreen mode
                const fs = fullscreen();
                fullscreen(!fs);
            }
        } else {
            // if not, toggle fullscreen mode
            const fs = fullscreen();
            fullscreen(!fs);
        }
    }
    
}

function mouseDragged(){
    if(controlPanel.move) {
        if(controlPanel.state === "max"){
            controlPanel.x = constrain(mouseX-430, 
                                       controlPanel.maxWidth/2, 
                                       windowWidth-80);
            controlPanel.y = constrain(mouseY+60, 
                                       30, 
                                       windowHeight-controlPanel.maxHeight);
            
        } else if(controlPanel.state === "min"){
            controlPanel.x = constrain(mouseX-110,
                                       controlPanel.minWidth/2,
                                       windowWidth-40);
            controlPanel.y = constrain(mouseY+20,
                                      30,
                                      windowHeight-controlPanel.minHeight);
        }
    }
    
}

function mouseReleased(){
    controlPanel.move = false;
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

function keyReleased(){
    if(vis.selectedVisual.name == 'asteroids'){
        vis.selectedVisual.spaceShip.keyReleased();
    }
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
