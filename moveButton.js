// class for the move button for the progress bar move button
class MoveButton{
    
    constructor(){
        this.x = null;
        this.y = null;
        this.size = 12;
    }
    
    draw(x,y){
        this.x = x;
        this.y = y;
        stroke(255);
        strokeWeight(1);
        fill(180);
        rectMode(CORNER);
        rect(this.x, this.y, this.size, this.size, 2);
    }

    hitCheck(){
        if(mouseX > this.x && mouseX < this.x+this.size &&
        mouseY > this.y && mouseY < this.y+this.size){

            return true;
        }
    }
}
