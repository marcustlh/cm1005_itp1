function Platform(x, y, length, x_range)
{
    this.x = x;
    this.y = y;
    this.length = length;
    this.x_range = x_range;
    
    this.currentX = x;
    this.inc = 1.5;
    
    this.update = function()
    {
        this.currentX += this.inc;
        
        if(this.currentX >= this.x + this.x_range)
        {
            this.inc = -1.5;
        }
        
        else if(this.currentX < this.x)
        {
            this.inc = 1.5;
        }
    }

    this.draw = function()
    {
        this.update();
        fill(160,82,45);
        rect(this.currentX,this.y,this.length, 20);
        fill(255,250,250);
        strokeWeight(3);
        rect(this.currentX,this.y,this.length,5);
    }

    this.checkContact = function(gc_x,gc_y)
    {
        var d = this.y - gc_y;
        if(gc_x > this.currentX && gc_x < this.currentX + this.length)
        {
            if(d >= 0 && d < 5)
            {
                gc_x += this.inc;
                if(this.currentX >= this.x + this.x_range)
                {
                    this.inc = -1.5;
                }
                else if(this.currentX < this.x)
                {
                    this.inc = 1.5;
                }
                return true;
            }
        }
        return false;
    }
}

//Initialise the platforms 
function setupPlatforms()
{
    platforms = [];
    var platform1 = new Platform(-300,floorPos_y - 75, 100, 0);
    var platform2 = new Platform(-250,floorPos_y - 175,200,150);
    var platform3 = new Platform(50,floorPos_y - 100,125,0);
    
    var platform4 = new Platform(1250,floorPos_y - 100,200,100);
    var platform5 = new Platform(1475,floorPos_y - 175,100,0);
    var platform6 = new Platform(1300, floorPos_y - 250, 175,0);
    var platform7 = new Platform(1550,floorPos_y - 75, 75, 250);
    
    var platform8 = new Platform(3150,floorPos_y - 75, 125, 225);
    var platform9 = new Platform(3450,floorPos_y - 150, 200,0);
    var platform10 = new Platform(2200,floorPos_y - 200, 800,0);
    var platform11 = new Platform(3050,floorPos_y - 175, 150,0);
    
    platforms.push(platform1,
                   platform2,
                   platform3,
                   platform4,
                   platform5,
                   platform6,
                   platform7,
                   platform8,
                   platform9,
                   platform10,
                   platform11);
}

// Check whether the game character is on top of each platform 
function checkPlatform()
{
    if(isFalling)
    {
        var isContact = false;
        onPlatform = false;
        for (var i = 0; i < platforms.length; i++)
        {
            isContact = platforms[i].checkContact(gameChar_world_x,gameChar_y)
            if(isContact)
            {
                onPlatform = true;
                isFalling = false;
                break;
            }
            
        }

        if(!isContact)
        {
            gameChar_y += 2;
        } 
    }
}
