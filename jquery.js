var playing= false;
var score;
var lives;
var fruits = ['apple', 'banana', 'cherry', 'grapes', 'orange', 'peach', 'pear', 'pineapple', 'strawberry'];
var step;
var move;
$(function (){

//Click on start reset button
$("#start-reset").click(function (){

    //If Game was Playing Before
    if(playing ==true){
        //reload page
        location.reload();
       }
    //Not Playing Before
    else{
        playing =true; //game started

        //set score to 0
        score =0;
        $("#scorevalue").html(score);

        //show lives left
        $("#livesLeft").show();
        lives =3;
        addHearts();

        //hide Game Over screen
        $("#gameOver").hide();

        //Change button text to Reset Game
        $("#start-reset").html("Reset Game");

        //Create random fruit
        startAction();
       }

});


    $("#fruit1").mouseover(function() {
        score++;
        $("#scorevalue").html(score); //update score
        $("#slice")[0].play(); //plays sound
        
        
        //stopfruit
        clearInterval(move);
        
        //hide fruit
        $("#fruit1").hide("explode", 400);//slice fruit
        
        //send a new fruit
        setTimeout(startAction, 400);
        
    });

//slice a fruit
    //play sound
    //explode fruit

    function addHearts(){
        $("#livesLeft").empty();
            for(i=0;i<lives; i++){
                $("#livesLeft").append('<img src="images/heart.png" class="lifesize">');
            }
    }

    
    function startAction(){
        //show fruit on screen
        $("#fruit1").show();
        chooseFruit(); //chooses a random fruit
    
        $('#fruit1').css({
            //sets fruits randomly horizontally
            'left': Math.round(550*Math.random()), 'top':-50
        });
    
        //Create a random step
        step=1+Math.round(5*Math.random()); //alters step
    
        //Moves fruit vertically
        move =setInterval(function(){
            $('#fruit1').css('top', $('#fruit1').position().top +step);
        
        //Check if fruit is at bottom of screen
        if( $('#fruit1').position().top > $('#fruitContainer').height()){
            //Check if there are any lives left
            if(lives > 1){
                //show fruit on screen
                $("#fruit1").show();
                chooseFruit(); //chooses a random fruit
    
                $('#fruit1').css({
                    //sets fruits randomly horizontally
                    'left': Math.round(550*Math.random()), 'top':-50
                });
    
                //Create a random step
                step=1+Math.round(5*Math.random()); //alters step
                
                //Decrease lives
                lives --;
                //Update lives on screen
                addHearts();
            }
            else{//game over
                playing = false; //No longer playing
                $("#start-reset").html("Start Game"); //Changes Reset button to Start button
                $("#livesLeft").hide();
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your Score is ' + score + '</p>');
                stopAction();
            }
        }
    }, 10);
}

    //creates a random fruit
    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(8*Math.random())] + '.png');
    }

    //Stops dropping fruit
    function stopAction() {
        clearInterval(move);
        $("#fruit1").hide();
    }
});