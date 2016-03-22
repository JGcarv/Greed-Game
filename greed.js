var boardNumbers = [];
var side = 15;
var currentRow = 7;
var currentColumn = 7;
var direction = 0;
var score = 0;

function biuldBoardArray(side) {
    for (var x = 0; x < side; x++){
        var arr = [];
        for (var y = 0; y < side; y++){
            arr.push(Math.floor(Math.random() * (9)) + 1)
        }
        boardNumbers.push(arr);
    }
}

function sumArray(arr){
    var sum = 0;
    for (var x = 0; x < arr.length; x++){
        sum += arr[x];
    }
    return sum;
}


function maxScore(){
    var sum = 0;
    for (var x = 0; x < boardNumbers.length; x++){
        sum += sumArray(boardNumbers[x]);
    }
    return sum;
}

function createTable(arr) {
    var table = "<table id='tb'>";
    for (var x = 0; x < side; x++){
        var row = "<tr>";
        for (var y = 0; y < side; y++){
            row += "<td>" + arr[x][y] + "</td>";
        }
        row += "</tr>"
        table += row;
    }
    return table + "</table>";;
}

function isGameLost(){
    if (!isMoveValid(1, getCurrentValue()) && !isMoveValid(2, getCurrentValue()) && !isMoveValid(3, getCurrentValue()) && !isMoveValid(4, getCurrentValue())){
    return true
    }  
    else{
        return false;
    }
}

function defeatChek(){
    if(isGameLost()){
        $('#tb').find('td').addClass('played');
        $('#looser').html("You Lost!");
    }
    else {
        setTimeout(defeatChek, 1000);
    }
    
}

function colorTable(){
    $( "td:contains('1')" ).css( "color", "#ff9900" );
    $( "td:contains('2')" ).css( "color", "#bb99ff" );
    $( "td:contains('2')" ).css( "color", "#cc00ff" );
    $( "td:contains('3')" ).css( "color", "#4d3319" );
    $( "td:contains('4')" ).css( "color", "#1f2e2e" );
    $( "td:contains('5')" ).css( "color", "#ff3377" );
    $( "td:contains('6')" ).css( "color", "#ffffb3" );
    $( "td:contains('7')" ).css( "color", "#ff6600" );
    $( "td:contains('8')" ).css( "color", "#000080" );
    $( "td:contains('9')" ).css( "color", "#006600" );
}

function markCurrentElement(){
    $('tr').eq(currentRow).children().eq(currentColumn).addClass("selected");
}

function markAsPlayed(){
    $('tr').eq(currentRow).children().eq(currentColumn).addClass("played");
}


function setDirection(dir){
    direction = dir;
}

function getCurrentValue(){
    return boardNumbers[currentRow][currentColumn];
}


function makeMove(jumps){
    switch(direction){
        case 1:
            while (jumps > 0) {
               
                score += getCurrentValue();
                boardNumbers[currentRow][currentColumn] = 0;
                markAsPlayed();
                
                
                if (currentRow == 0){
                    currentRow = side - 1;
                }
                else{
                 currentRow -= 1;
                }
                jumps  -= 1;
            }
            markCurrentElement();
            break;
        case 2:
            
            while (jumps > 0){
                
                score += getCurrentValue();
                boardNumbers[currentRow][currentColumn] = 0;
                markAsPlayed();
                
                
                if (currentColumn == side - 1){
                    currentColumn = 0;
                }
                else{
                    currentColumn += 1;
                }
                
                jumps -= 1;
            }
            markCurrentElement();
            break;
        case 3:
            while (jumps > 0){
                
                score += getCurrentValue();
                boardNumbers[currentRow][currentColumn] = 0
                markAsPlayed();
                
                
                if (currentRow == side - 1){
                    currentRow = 0;
                }
                else{
                    currentRow += 1;
                }
                jumps  -= 1;
            }
            markCurrentElement();
            break;
        case 4:
            
            while (jumps > 0){
                
                score += getCurrentValue();
                boardNumbers[currentRow][currentColumn] = 0;
                markAsPlayed();
                
                
                if (currentColumn == 0){
                    currentColumn = side - 1;
                }
                else{
                    currentColumn -= 1;
                }
                
                jumps -= 1;
            }
            markCurrentElement();
            break;
        }
    }
    

function isMoveValid(dir, jumps){
    var tempRow = currentRow;
    var tempColumn = currentColumn;
    
    switch (dir){
        case 1:
            while (jumps > 0) {
                
                if (tempRow == 0){
                    tempRow = side - 1;
                }
                else{
                 tempRow -= 1;
                }
                jumps  -= 1;
            }
            if (boardNumbers[tempRow][currentColumn] == 0){
                return false;
            }
            else{
                return true;
            }

        case 2:
            
            while (jumps > 0){

                if (tempColumn == side - 1){
                    tempColumn = 0;
                }
                else{
                    tempColumn += 1;
                }
                
                jumps -= 1;
            }
            if (boardNumbers[currentRow][tempColumn] == 0){
                return false;
            }
            else {
                return true;
            }
            
        case 3:
            while (jumps > 0){
                
                if (tempRow == side - 1){
                    tempRow = 0;
                }
                else{
                    tempRow += 1;
                }
                jumps  -= 1;
            }
            if (boardNumbers[tempRow][currentColumn] == 0){
                return false;
            }
            else{
                return true;
            }
            
        case 4:
            
            while (jumps > 0){
                if (tempColumn == 0){
                    tempColumn = side - 1;
                }
                else{
                    tempColumn -= 1;
                }
                
                jumps -= 1;
            }
            if (boardNumbers[currentRow][tempColumn] == 0){
                return false;
            }
            else {
                return true;
            }
    }
}

function clearAll(){
    side = 15;
    boardNumbers = [];
    currentRow = 7;
    currentColumn = 7;
    direction = 0;
    score = 0;
    $("#tb").remove();
    $('#looser').empty();
}

function setup(){
    biuldBoardArray(side);
    var table = createTable(boardNumbers);
    $('#board').append(table);    
    colorTable();
    markCurrentElement();
    score = getCurrentValue();
    $('#score').html(score);
    $("#max-score").html(maxScore());
}

function startGame(){
    setup();
    defeatChek();
}

$(document).ready(function(){

        startGame();
    
        $('#up').click(function(){
            setDirection(1);
            if (isMoveValid(1, getCurrentValue())){
                makeMove(getCurrentValue());
                $('#score').html(score);
            }
            

        });
    $('#right').click(function(){
            setDirection(2);
            if(isMoveValid(2, getCurrentValue())){
                makeMove(getCurrentValue());
                $('#score').html(score);
            }

        });
    $('#down').click(function(){
            setDirection(3);
            if(isMoveValid(3, getCurrentValue())){
                makeMove(getCurrentValue());
                $('#score').html(score);
            }
            
        });
    $('#left').click(function(){
            setDirection(4);
            if(isMoveValid(2, getCurrentValue())){
                makeMove(getCurrentValue());
                $('#score').html(score);  
            }   
        }); 
  
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                setDirection(4);
                if(isMoveValid(2, getCurrentValue())){
                    makeMove(getCurrentValue());
                    $('#score').html(score);  
                }     
            break;

            case 38: // up
                setDirection(1);
                if (isMoveValid(1, getCurrentValue())){
                    makeMove(getCurrentValue());
                    $('#score').html(score);
                }
            break;

            case 39: // right
                setDirection(2);
                if(isMoveValid(2, getCurrentValue())){
                    makeMove(getCurrentValue());
                    $('#score').html(score);
                }
            break;

            case 40: // down
                setDirection(3);
                if(isMoveValid(3, getCurrentValue())){
                    makeMove(getCurrentValue());
                    $('#score').html(score);
                }
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    
    $('#reset').click(function(){
        clearAll();
        startGame();
    });
    
    
});

