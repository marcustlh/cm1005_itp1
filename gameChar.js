// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    noStroke();
	fill(0);
    
	if(isLeft && isFalling)
	{
        //  My character jumping-left code
        
        ellipse(gameChar_x,gameChar_y - 60,25,25);

        rect(gameChar_x - 5,gameChar_y - 70,10,45);

        ellipse(gameChar_x - 6,gameChar_y - 27,13,6);
        triangle(gameChar_x - 15, gameChar_y - 21, gameChar_x - 10, gameChar_y - 30, gameChar_x - 6, gameChar_y - 15);

        ellipse(gameChar_x + 2, gameChar_y - 22,7,15);
        triangle(gameChar_x + 1,gameChar_y - 14,gameChar_x + 4, gameChar_y - 23, gameChar_x + 12, gameChar_y - 8);

        ellipse(gameChar_x - 13,gameChar_y - 42,15,7);
        ellipse(gameChar_x - 6,gameChar_y - 41,9,7);

        ellipse(gameChar_x + 13,gameChar_y - 41.5,15,7);
        ellipse(gameChar_x + 6,gameChar_y - 41,9,7);

	}
	else if(isRight && isFalling)
	{
		// My character jumping-right code
        
        ellipse(gameChar_x,gameChar_y - 60,25,25);

        rect(gameChar_x - 5,gameChar_y - 70,10,45);

        ellipse(gameChar_x + 6,gameChar_y - 27,13,6);
        triangle(gameChar_x + 15, gameChar_y - 21, gameChar_x + 10, gameChar_y - 30, gameChar_x + 6, gameChar_y - 15);

        ellipse(gameChar_x - 2, gameChar_y - 22,7,15);
        triangle(gameChar_x - 1,gameChar_y - 14,gameChar_x - 4, gameChar_y - 23, gameChar_x - 12, gameChar_y - 8);

        ellipse(gameChar_x - 13,gameChar_y - 41.5,15,7);
        ellipse(gameChar_x - 6,gameChar_y - 41,9,7);

        ellipse(gameChar_x + 13,gameChar_y - 42.5,15,7);
        ellipse(gameChar_x + 6,gameChar_y - 41,9,7);

	}
	else if(isLeft)
	{
		// My character walking left code
        
        ellipse(gameChar_x,gameChar_y - 40,25,25);

        rect(gameChar_x - 5,gameChar_y - 50,10,45);

        triangle(gameChar_x - 8,gameChar_y - 3,gameChar_x - 3, gameChar_y - 12, gameChar_x + 1, gameChar_y + 3);
        triangle(gameChar_x + 2,gameChar_y - 3,gameChar_x + 5, gameChar_y - 12, gameChar_x + 13, gameChar_y + 3);

        ellipse(gameChar_x - 6,gameChar_y - 20,6,13);
        ellipse(gameChar_x - 10,gameChar_y - 16,10,6);

        ellipse(gameChar_x + 9,gameChar_y - 17,7,10);
        ellipse(gameChar_x + 6,gameChar_y - 21,9,11);

	}
	else if(isRight)
	{
		// My character walking right code
        
        ellipse(gameChar_x,gameChar_y - 40,25,25);

        rect(gameChar_x - 5,gameChar_y - 50,10,45);

        triangle(gameChar_x + 8,gameChar_y - 3,gameChar_x + 3, gameChar_y - 12, gameChar_x - 1, gameChar_y + 3);
        triangle(gameChar_x - 2,gameChar_y - 3,gameChar_x - 5, gameChar_y - 12, gameChar_x - 13, gameChar_y + 3);

        ellipse(gameChar_x + 6,gameChar_y - 20,6,13);
        ellipse(gameChar_x + 10,gameChar_y - 16,10,6);

        ellipse(gameChar_x - 9,gameChar_y - 17,7,10);
        ellipse(gameChar_x - 6,gameChar_y - 21,9,11);


	}
	else if(isFalling || isPlummeting)
	{
		// My character jumping facing forwards code
        
        ellipse(gameChar_x,gameChar_y - 60,25,25);
        rect(gameChar_x - 5,gameChar_y - 70,10,45);
        triangle(gameChar_x,gameChar_y - 30,gameChar_x - 5,gameChar_y - 15,gameChar_x - 15,gameChar_y - 25);
        triangle(gameChar_x,gameChar_y - 30,gameChar_x + 5, gameChar_y - 15, gameChar_x + 15, gameChar_y - 25);

        ellipse(gameChar_x - 11,gameChar_y - 39,14,7);
        ellipse(gameChar_x - 6,gameChar_y - 41,7,10);


        ellipse(gameChar_x + 11,gameChar_y - 39,14,7);
        ellipse(gameChar_x + 6,gameChar_y - 41,7,10);

	}
	else
	{
		// My character standing front facing code
        
        ellipse(gameChar_x,gameChar_y - 40,25,25);

        rect(gameChar_x - 5,gameChar_y - 50,10,45);

        triangle(gameChar_x - 10,gameChar_y + 3,gameChar_x - 3, gameChar_y - 12, gameChar_x, gameChar_y + 3);
        triangle(gameChar_x + 10,gameChar_y + 3,gameChar_x + 3, gameChar_y - 12, gameChar_x, gameChar_y + 3);

        ellipse(gameChar_x - 7,gameChar_y - 20,7,15);
        ellipse(gameChar_x + 7,gameChar_y - 20,7,15);

	}
}
