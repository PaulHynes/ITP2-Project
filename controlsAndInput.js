//class to handle the onscreen menu, keyboard and mouse controls
class ControlsAndInput{
	
    constructor(){
        this.menuDisplayed = false;
    }
	
	
	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	keyPressed(keycode){
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			const visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
	};

	//draws the playback button and potentially the menu
	draw(){
		push();
        
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){    
            // draw background rectangle
            stroke(255, 150);
            strokeWeight(1);
            fill(100, 150);
            rect(80, 0, 400, 300, 5);
            
            fill(255);
            textSize(34);
            noStroke();
            textAlign(LEFT);
			text("Select a visualisation:", 100, 30);
			this.menu();
		}	
		pop();

	};

	menu(){
		//draw out menu items for each visualisation
		for(let i = 0; i < vis.visuals.length; i++){
            
            fill(255);
            textSize(34);
            noStroke();
            textAlign(LEFT);
            text((i+1) + ": " + vis.visuals[i].name, 100, 70 + i*40);
        }
	};
    
}
