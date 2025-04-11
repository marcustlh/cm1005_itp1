// -----------------------------------
// Flagpole render and check functions 
// -----------------------------------

// Function to draw the flagpole
function renderFlagpole()
{
    push();
    stroke(192,192,192);
    strokeWeight(7.5);
    line (flagpole.x_pos,floorPos_y - 5,flagpole.x_pos,floorPos_y - 150);
    
    fill(178,34,34);
    noStroke();
    if (flagpole.isReached == true)
    {
        rect (flagpole.x_pos + 5, floorPos_y - 125, 70,40);
        fill(0);
        rect(flagpole.x_pos + 140, floorPos_y - 60, 20,60);  
    }
    else
    {
        rect (flagpole.x_pos + 5, floorPos_y - 50, 70,40);
    }
    pop();
}

// Function to check character has reached the flagpole 
function checkFlagpole()
{
    if (abs(gameChar_world_x - flagpole.x_pos) <= 10 &&  game_score == 7)
    {
        flagpole.isReached = true;
    }
    else if(abs(gameChar_world_x - flagpole.x_pos) <= 10 && game_score < 7)
    {
        textSize(28);
        text ("Not all diamonds have been found!",width*1/3 - 50,100);        
    }
}