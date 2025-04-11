function Enemy (x, y, range)
{
    this.x = x;
    this.y = y;
    this. range = range;
    
    this.currentX = x;
    this.inc = 1.5;
    this.direction = 1;
    
    this.update = function()
    {
        this.currentX += this.inc;
        
        if (this.currentX >= this.x + this.range)
        {
            this.inc = -1.5;
            this.direction = -1;
        }
        
        else if (this.currentX < this.x)
        {
            this.inc = 1.5;
            this.direction = 1;
        }
    }
    
    this.draw = function()
    {
        this.update();
        fill(218,165,32);
        ellipse(this.currentX - (this.direction*10), this.y - 25, 27.5, 10);
        ellipse(this.currentX - (this.direction*12), this.y - 10, 5, 20);
        ellipse(this.currentX - (this.direction*18), this.y - 10, 5, 20);
        
        fill(205,133,63);
        ellipse(this.currentX - (this.direction*15), this.y - 30, 20, 40);
        triangle(this.currentX, this.y - 45, this.currentX - (this.direction*5), this.y - 65, this.currentX - (this.direction*10), this.y - 45);
        triangle(this.currentX - (this.direction*10), this.y - 45, this.currentX - (this.direction*15), this.y - 65, this.currentX - (this.direction*20), this.y - 45);
        
        fill(218,165,32);
        ellipse(this.currentX, this.y - 45, 40,20);
        
        fill(0);
        ellipse(this.currentX - (this.direction*5), this.y - 50,6,4);
    }
    
    this.checkContact = function(gc_x,gc_y)
    {
        var d = dist(gc_x,gc_y,this.currentX,this.y);
        if (d < 35)
        {
            return true;
        }
        
        return false;
    }
}

function setupEnemies()
{
    enemies = [];
    
    var enemy1 = new Enemy(-800, floorPos_y, 175);
    var enemy2 = new Enemy(-500,floorPos_y,100);
    
    var enemy3 = new Enemy(250,floorPos_y,100);
    var enemy4 = new Enemy(800,floorPos_y,200);
    
    var enemy5 = new Enemy(1375,floorPos_y - 100,50);
    
    var enemy6 = new Enemy(2500,floorPos_y - 200, 150);
    var enemy7 = new Enemy(2750,floorPos_y - 200, 125);
    var enemy8 = new Enemy(3550,floorPos_y - 150, 75);
    
    var enemy9 = new Enemy(4550,floorPos_y, 150);
    
    enemies.push(enemy1, 
                 enemy2, 
                 enemy3, 
                 enemy4, 
                 enemy5, 
                 enemy6, 
                 enemy7, 
                 enemy8, 
                 enemy9);
}

function createEnemies()
{
    for (var i = 0; i < enemies.length; i ++)
    {
        enemies[i].draw();
        var isContact = enemies[i].checkContact(gameChar_world_x,gameChar_y);
        
        if (isContact && lives >= 1)
        {
            lives -= 1;
            enemySound.play();
            startGame();
        }
    }
}