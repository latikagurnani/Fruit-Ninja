//scripting.js

var score;
var playing = false;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var trailsLeft;
var action; //var for setInterval
var step;
$(function(){
    $("#startreset").click(function(){
        if(playing == true) {
            //i want to reset
            location.reload();
        }
        else{
            //i want to play
            playing = true;
            score = 0;
            $("#scorevalue").text(score);
            trailsLeft = 3;
            $("#trialsLeft").show();
            addHearts();
            $("#gameOver").hide();
            $("#startreset").text("Reset Game");
            //start sending fruits
            startAction();
        }
    });
    
    function addHearts(){
        $("#trialsLeft").empty();
        for(i = 0; i < trailsLeft; i++){
            $("#trialsLeft").append("<img src='FruitNinjaFiles/images/heart.png' class='life'>");
        }
    }
    
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").text(score);
//        document.getElementById("slicesound").play();
        $("#slicesound")[0].play();
        stopAction();
        $("#fruit1").hide("explode", 500);
        //again strt sending other fruit!
        setTimeout(startAction, 600);
        
    });
    
    function startAction(){
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({
            'left': Math.round(Math.random() * 550),
            'top': -60,
        });
        step = 1 + Math.round(Math.random() * 5);
        action = setInterval(function(){
            $("#fruit1").css("top",$("#fruit1").position().top + step);
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                //check if trails is left or not
                if (trailsLeft > 1){
                    //genetae a fruit again and reduce the life
                    //BUG may occur here!!
                    chooseFruit();
                    $("#fruit1").css({
                        'left': Math.round(Math.random() * 550),
                        'top': -60,
                    });
                    step = 1 + Math.round(Math.random() * 5);
                    trailsLeft--;
                    addHearts();
                }
                else{
                    //game over
                    playing = false;
                    $("#startreset").text("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html("<p>Game Over</p><p>Your Score " + score + "</p>");
                    $("#trailsLeft").hide();
                    $("#scorevalue").text("");
                    stopAction();
                }
            }
        },10);
    }
    
    function chooseFruit() {
        $("#fruit1").attr("src", 'FruitNinjaFiles/images/' + fruits[Math.round(Math.random() * (fruits.length - 1))] + '.png');
    }
    
    function stopAction(){
        clearInterval(action);
    }
});