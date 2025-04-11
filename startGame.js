function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    
	// Initialise arrays of mountains
    mountains = [
                    {x_pos: -700, y_pos: floorPos_y, size: random(1,1.75)},   
                    {x_pos: 700 , y_pos: floorPos_y, size: random(1,2)},  
                    {x_pos: 2500, y_pos: floorPos_y, size: random(1,1.5)},
                    {x_pos: 3900, y_pos: floorPos_y, size: random(0.75,2.25)},
                    {x_pos: 4700, y_pos: floorPos_y, size: random(0.75 ,1)}
        
                ];
    
    // Initialise arrays of trees
    trees = [];
    
    for (var i = 0; i < 25; i ++)
    {
        tree_1 = {x_pos: -950  + 25*i , 
                  width_size: random(0.5,1.25),
                  height: random(0,150), 
                  size: random(1,1.5),
                  color:random(100,175)};
        
        trees.push(tree_1);
    }
    
    for (var i = 0; i < 30; i ++)
    {
        tree_2 = {x_pos: 350 + 25*i , 
                  width_size: random(0.75,1.5),
                  height: random(0,150), 
                  size: random(1,1.5),
                  color:random(100,175)};
        
        trees.push(tree_2);
    }
    
    for (var i = 0; i < 20; i ++)
    {
        tree_3 = {x_pos: 1975  + 45*i , 
                  width_size: random(0.75,1.75),
                  height: random(0,150), 
                  size: random(1,1.5),
                  color:random(100,175)};
        
        trees.push(tree_3);
    }
    
    for (var i = 0; i < 20; i ++)
    {
        tree_4 = {x_pos: 3500  + 40*i , 
                  width_size: random(1,1.75),
                  height: random(0,150), 
                  size: random(1,1.5),
                  color:random(100,175)};
        
        trees.push(tree_4);
    }
    
    // Initialise arrays of clouds
    clouds= [ 
                {x_pos:0, y_pos:random(45,175), size:1},
                {x_pos:800, y_pos:random(45,175), size:1.25},
                {x_pos:2000, y_pos:random(45,175), size:2},
                {x_pos:3200, y_pos:random(45,175), size:1.5}
            ];
    
    
    // Initialise arrays of canyons
    canyons = [
                {x_pos: -300, width: 450},
                {x_pos: 1100, width: 150},
                {x_pos: 1600, width:200},
                {x_pos: 2900, width: 175},
                {x_pos: 3200, width: 225},
                {x_pos: 4300, width:150},
              ];
       
    // Initialise arrays of collectables
    collectables = 
        [
            {x_pos: random(-975,-900), 
             y_pos: floorPos_y - 50,
             size: random(0.75,1.25), 
             isFound: false
            },
            {x_pos: random(600,750), 
             y_pos: floorPos_y,
             size: random(0.75,1.25), 
             isFound: false
            },
            {x_pos: random(1300, 1400), 
             y_pos: floorPos_y - 250, 
             size: random(0.75,1.25), 
             isFound: false
            },
            {x_pos: 2250,
             y_pos:floorPos_y - 200,
             size: random(0.75,1.25), 
             isFound: false
            },
            {x_pos: random(3125,3175),
             y_pos:floorPos_y,
             size: random(0.75,1.25), 
             isFound: false
            },
            {x_pos: 3500, 
             y_pos:floorPos_y - 150,
             size: random(0.75,1.25), 
             isFound: false
            },
            {x_pos: 3800, 
             y_pos:floorPos_y,
             size: random(0.75,1.25), 
             isFound: false
            }
        ];
    
    // Initilise the platforms object   
    setupPlatforms();
    
    //Initialise enemies array
    setupEnemies();

    // Initialise the game score
    game_score = 0;
    
    // Initilaise the flagpole object 
    flagpole = {isReached: false, x_pos: 5000};
}

