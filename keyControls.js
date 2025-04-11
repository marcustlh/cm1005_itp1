// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{

	console.log("press" + keyCode);
	console.log("press" + key);
    
    if(key == 'A' || keyCode == 37)
	{
		isLeft = true;
	}

	else if(key == 'D' || keyCode == 39)
	{
		isRight = true;
	}
    
    else if (keyCode == 32)
    {
        console.log ("spacebar");
        if (gameChar_y >= floorPos_y || onPlatform)
        {
            gameChar_y -= 100 ;
            jumpSound.play();
            
        }
    }
    
    if (keyCode == 32)
    {
       if (lives < 1 || flagpole.isReached == true)
        {
            jumpSound.stop();
            setup();
        }
    }

}

function keyReleased()
{
	console.log("release" + keyCode);
	console.log("release" + key);
    
    if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}
}
