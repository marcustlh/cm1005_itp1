function collectablesFound()
{
    if (game_score == 7 && flagpole.isReached == false)
    {
        fill(0);
        textSize(28);
        text ("All diamonds have been found. Hurry!",width*1/3 - 50,100);
    }
};

function drawScoreandLives()
{
    noStroke();
    fill(0);
    textSize(18);
    textStyle(BOLD);
    text("score : " + game_score + " / 7" ,30,30);
    text("lives : ",30,60);
}