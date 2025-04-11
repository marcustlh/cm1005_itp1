var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var mountains;
var trees;
var clouds;
var canyons;
var collectables;


var game_score;
var flagpole;
var lives;

var enemies;

var platforms;
var onPlatform;

const drops = [];

var BGMsound;
var collectSound;
var fallSound;
var enemySound;
var jumpSound;

var soundReady;
var soundLoadCounter;

function preload()
{
    soundReady = false;
    soundLoadCounter = 0;
    
    soundFormats("mp3","wav");
    //BGM sound from https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=6756
    BGMsound = loadSound("assets/bgm-snow.mp3",soundLoaded);
    BGMsound.setVolume(0.1);
    // Sound effects from https://mixkit.co/free-sound-effects/
    jumpSound = loadSound("assets/jumping.mp3",soundLoaded);
    jumpSound.setVolume(0.5);
    collectSound = loadSound("assets/diamond.mp3",soundLoaded);
    collectSound.setVolume(0.5);
    enemySound = loadSound("assets/enemy.mp3",soundLoaded);
    fallSound = loadSound("assets/falloffCanyon.mp3",soundLoaded);
    fallSound.setVolume(0.1);
}

function soundLoaded()
{
    soundLoadCounter++;
    if(soundLoadCounter == 5)
    {
        soundReady = true;
    }
}

function setup()
{
    BGMsound.play();
    BGMsound.loop();
	createCanvas(1024, 576);
    
    //Initialise the ground level 
	floorPos_y = height * 0.55;
    
    // Initialise the number of lives for the character
    lives = 3;
    
    //Initialise the falling snow
    for (var x = 0; x < width*2; x++)
    {
        drops[x] = random(height);
    };
    
    //Initialise all background scrolling, game character posiitons and the boolean variables
    startGame();
}


function draw()
{
    // Ensure that all sounds are loaded before the game starts
    if(!soundReady)
    {
        return;
    }
    
    // Fill up the sky
	background(225, 222, 173);
    
    // Draw the ground 
	noStroke();
	fill(160,82,45);
	rect(0, floorPos_y, width, height - floorPos_y);
    fill(255,250,250);
    rect(0,floorPos_y,width,20);
    
    push();
    translate(scrollPos, 0);
    
    // Draw the left-end and right-end boundaries 
    stroke(0);
    fill(119,136,153);
    strokeWeight(3);
    rect(-1500,0,450,height);
    rect(5200,0,450,height);
    
    noStroke();
    
    //Draw the house for the game character
    fill(139,69,19);
    rect(flagpole.x_pos + 100, floorPos_y - 150, 100,150);
    fill(178,34,34);
    triangle(flagpole.x_pos + 75, floorPos_y - 150, flagpole.x_pos + 150, floorPos_y - 250, flagpole.x_pos + 225, floorPos_y - 150);
    rect(flagpole.x_pos + 140, floorPos_y - 60, 20,60);
    fill(255,225,0);
    ellipse(flagpole.x_pos + 155, floorPos_y - 30, 5);
    
    
	// Draw clouds
    drawClouds();
    animateClouds();

	// Draw mountains
    drawMountains();

	// Draw trees
    drawTrees();

    // Draw moving and stationary platforms
    for (var i = 0; i < platforms.length; i ++)
    {
        platforms[i].draw();
        
    }
    
	// Draw canyons
    for (var i = 0; i < canyons.length; i ++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }
    

	// Draw collectables/diamonds
    for (var i = 0; i < collectables.length; i ++)
    {
        if(collectables[i].isFound == false)
        {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }
    
    // Draw the flagpole 
    renderFlagpole();
    
    // Call checkPlatform
    checkPlatform();
    
    // Draw the enemies 
    createEnemies();
    pop();
    
    // Draw the snow drops
    for (let x = 0; x < drops.length; x++)
    {
        stroke(255);
        strokeWeight(3);
        drops[x] += random(5);
        if (drops[x] > height)
        {
            drops[x] = 0;
        }
        point(x, drops[x]);
    }
    
    
    // Score and life count
    drawScoreandLives();
    
    // Notice when all collectables are found
    collectablesFound();
    
    // Implement life count for the character
    checkPlayerDie();	
    
    // Variable to store the real position of the gameChar in the game world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
    
    
    // Logic for game over and level completion
    if (lives < 1)
    {
        fill(0);
        textSize(28);
        text ("Game over. Press space to continue.", width*1/3 - 50,100);
        fallSound.stop();
        BGMsound.stop();
        return;
        
    }

    if (flagpole.isReached == true)
    {
        fill(random(0,255),random(0,255),random(0,255));
        textSize(28);
        text ("Level complete. Press space to continue.",width*1/3 - 50,100);
        BGMsound.stop(0);
        return; 
        
    }
    
    // Logic for reaching the flagpole
    if (flagpole.isReached == false);
    {
        checkFlagpole();
    };
    
    // Draw the game character
	drawGameChar();
    
    // Logic to make the game character move or the background scroll
	if(isLeft && gameChar_world_x > -1000)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 3.5;
		}    
    	else
		{
			scrollPos += 3.5;
		}
        
	}
	if(isRight && gameChar_world_x < 5150)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 3.5;
		}
		else
		{
			scrollPos -= 3.5; // Negative for moving against the background
		}
	}
    
    // Logic to make the game character rise and fall
    if(gameChar_y < floorPos_y)
    {
        isFalling = true;
    }
    else
    {
        isFalling = false;
    }    

 
}

// Function to check if character has fallen to the bottom of canvas
function checkPlayerDie()
{
    if (gameChar_y >= height)
        {
            lives -= 1;
            startGame();
        }
    
    for (var i = 0 ; i < lives; i ++)
        {
            fill(220,20,60);
            triangle(100 + i*25,62,90 + i*25,52,110 + i*25,52);
            ellipse(95.5 + i*25,50,11,11);
            ellipse (104.5 + i*25,50,11,11);
        }
    
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for (var i = 0; i < clouds.length; i ++)
        {
            fill(250,240,230);
    
            ellipse(clouds[i].x_pos,
            clouds[i].y_pos,
            70*clouds[i].size,
            40*clouds[i].size);

            ellipse(clouds[i].x_pos + 5*clouds[i].size,
            clouds[i].y_pos + 10*clouds[i].size,
            70*clouds[i].size,
            30*clouds[i].size);

            ellipse(clouds[i].x_pos + 25*clouds[i].size,
            clouds[i].y_pos,
            70*clouds[i].size,
            30*clouds[i].size);

            ellipse(clouds[i].x_pos - 30*clouds[i].size,
            clouds[i].y_pos + 5*clouds[i].size,
            60*clouds[i].size,
            30*clouds[i].size);
        }
}

// Function to animate the clouds
function animateClouds()
{
    for(i in clouds)
    {
        clouds[i].x_pos += 1.5;
        
        if(clouds[i].x_pos > 4700)
        {
           clouds[i].x_pos = -750;
        }
    }
}

// Function to draw mountains objects.
function drawMountains()
{
    for (var i = 0; i < mountains.length; i ++)
        {
            fill(112,128,144);
            triangle(mountains[i].x_pos - 150*mountains[i].size, mountains[i].y_pos,
                     mountains[i].x_pos + 70*mountains[i].size,mountains[i].y_pos - 132*mountains[i].size,
                     mountains[i].x_pos + 170*mountains[i].size,mountains[i].y_pos);
    
            fill(119,136,153);
            triangle(mountains[i].x_pos, mountains[i].y_pos,
                     mountains[i].x_pos + 125*mountains[i].size,mountains[i].y_pos,
                     mountains[i].x_pos, mountains[i].y_pos - 232*mountains[i].size);
            triangle(mountains[i].x_pos, mountains[i].y_pos,
                     mountains[i].x_pos - 125*mountains[i].size, mountains[i].y_pos,
                     mountains[i].x_pos, mountains[i].y_pos - 232*mountains[i].size);

            fill(105,105,105);
            triangle(mountains[i].x_pos - 165*mountains[i].size,mountains[i].y_pos,
                     mountains[i].x_pos - 90*mountains[i].size,mountains[i].y_pos - 82*mountains[i].size,
                     mountains[i].x_pos - 5*mountains[i].size,mountains[i].y_pos);

            fill(255);
            triangle(mountains[i].x_pos,mountains[i].y_pos - 232*mountains[i].size,
                     mountains[i].x_pos - 10*mountains[i].size,mountains[i].y_pos - 213.5*mountains[i].size,
                     mountains[i].x_pos + 10*mountains[i].size,mountains[i].y_pos - 213.5*mountains[i].size);
    
            beginShape()
            curveVertex(mountains[i].x_pos - 11*mountains[i].size,
                        mountains[i].y_pos - 214*mountains[i].size);
            curveVertex(mountains[i].x_pos - 10*mountains[i].size,
                        mountains[i].y_pos - 214*mountains[i].size);
            curveVertex(mountains[i].x_pos - 5*mountains[i].size,
                        mountains[i].y_pos - 197*mountains[i].size);
            curveVertex(mountains[i].x_pos,
                        mountains[i].y_pos - 204.5*mountains[i].size);
            curveVertex(mountains[i].x_pos + 5*mountains[i].size,
                        mountains[i].y_pos - 202*mountains[i].size);
            curveVertex(mountains[i].x_pos + 10*mountains[i].size,
                        mountains[i].y_pos - 214*mountains[i].size);
            curveVertex(mountains[i].x_pos + 11*mountains[i].size,
                        mountains[i].y_pos - 214*mountains[i].size);
            endShape();
        }
}

// Function to draw trees objects.
function drawTrees()
{
    
    for (var i = 0; i < trees.length; i ++)
    {
            fill(139,69,19);
            rect(trees[i].x_pos, floorPos_y - 82 - trees[i].height, 7.5*trees[i].width_size, 82 + trees[i].height);
            rect(trees[i].x_pos - 7.5*trees[i].width_size, floorPos_y - 82 - trees[i].height, 7.5*trees[i].width_size, 82 + trees[i].height);
            fill(34,trees[i].color,34);
            ellipse(trees[i].x_pos, floorPos_y - 42 - trees[i].height,100*trees[i].size,35*trees[i].size); 
            ellipse(trees[i].x_pos, floorPos_y - 57 - trees[i].height,75*trees[i].size,30*trees[i].size);
            ellipse(trees[i].x_pos, floorPos_y - 72 - trees[i].height,50*trees[i].size,25*trees[i].size);
    }
    
    
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    fill(225, 222, 173);
    rect(t_canyon.x_pos,floorPos_y,t_canyon.width, height - floorPos_y);
    
    fill(160,82,45);
    triangle(t_canyon.x_pos,floorPos_y + 20, t_canyon.x_pos, height, t_canyon.x_pos + 15,height);
    triangle(t_canyon.x_pos + t_canyon.width,floorPos_y + 20,t_canyon.x_pos + t_canyon.width,height,t_canyon.x_pos + t_canyon.width - 15,height);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if((gameChar_world_x - 10 > t_canyon.x_pos && gameChar_world_x + 10 < t_canyon.x_pos + t_canyon.width) && gameChar_y >= floorPos_y)
    {
        isPlummeting = true;
        
    }
    else if (gameChar_y + 3 <= floorPos_y)
    {
        isPlummeting = false;
    }
    
    if (isPlummeting == true)
    {
        gameChar_y += 5;
        fallSound.play();
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    stroke(0,30);
    fill(219,112,147);
    triangle(t_collectable.x_pos, t_collectable.y_pos,
             t_collectable.x_pos - 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size,
             t_collectable.x_pos + 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size);
    
    triangle(t_collectable.x_pos - 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size,
             t_collectable.x_pos - 15*t_collectable.size,t_collectable.y_pos - 27*t_collectable.size,
             t_collectable.x_pos,t_collectable.y_pos - 27*t_collectable.size);
    
    triangle(t_collectable.x_pos + 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size,
             t_collectable.x_pos + 15*t_collectable.size,t_collectable.y_pos - 27*t_collectable.size,
             t_collectable.x_pos, t_collectable.y_pos - 27*t_collectable.size);
    
    fill(255,192,203);
    triangle(t_collectable.x_pos,t_collectable.y_pos,
             t_collectable.x_pos - 20*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size,
             t_collectable.x_pos - 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size);
    
    triangle(t_collectable.x_pos,t_collectable.y_pos,
             t_collectable.x_pos + 20*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size,
             t_collectable.x_pos + 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size);
    
    triangle(t_collectable.x_pos - 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size,
             t_collectable.x_pos,t_collectable.y_pos - 27*t_collectable.size,
             t_collectable.x_pos + 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size);
    
    triangle(t_collectable.x_pos + 20*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size,
             t_collectable.x_pos + 15*t_collectable.size,t_collectable.y_pos - 27*t_collectable.size,
             t_collectable.x_pos + 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size);
    
    triangle(t_collectable.x_pos - 20*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size,
             t_collectable.x_pos - 15*t_collectable.size,t_collectable.y_pos - 27*t_collectable.size,
             t_collectable.x_pos - 10*t_collectable.size,t_collectable.y_pos - 17*t_collectable.size);
    
    ellipse(t_collectable.x_pos,
            t_collectable.y_pos - 27*t_collectable.size,
            30*t_collectable.size,
            5*t_collectable.size);
}

// Function to check character has collected an item.
function checkCollectable(t_collectable)
{
   if (dist(gameChar_world_x,gameChar_y,t_collectable.x_pos,t_collectable.y_pos) < 25)
    {
        t_collectable.isFound = true;
        game_score += 1;
        collectSound.play();
    }
}