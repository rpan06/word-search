let startPoint = null;
let highlightLine = [];

function clickHandlers(isThisPlayAgain = false){
    $('.square').mousedown(mouseDownHandler)
    $('.square').mouseenter(mouseEnterHandler)
    $('.square').mouseleave(mouseLeaveHandler)
    $('.square').mouseup(mouseUpHandler)
    if(!isThisPlayAgain){
        $('#play-again').click(playAgain)
    }
}

function mouseDownHandler(){
    startPoint = event.target;
    $(startPoint).css('background-color', 'steelblue');
}

function mouseEnterHandler(){
    if(!startPoint) return;
    const currentSquare = event.target
    const startCoordinates = [parseInt(startPoint.getAttribute('row')), parseInt(startPoint.getAttribute('column'))]
    const currentCoordinates = [parseInt(currentSquare.getAttribute('row')), parseInt(currentSquare.getAttribute('column'))]
    if(checkStraightOrDiagonal(startCoordinates,currentCoordinates)){
        // console.log('Highlight Line', highlightLine)
        // $(currentSquare).css('background-color', 'steelblue');
        getLineCoordinates(startCoordinates,currentCoordinates);
        highlightLine.map(item=>$(item).css('background-color', 'steelblue'))
    }
}

function mouseLeaveHandler(){
    highlightLine.map(item=>$(item).css('background-color', 'white'))
    highlightLine = [];
}

function checkStraightOrDiagonal(start, stop){
    return (
      start[0] === stop[0] && start[1] !== stop[1] ||
      start[1] === stop[1] && start[0] !== stop[0] ||
      Math.abs(start[0]-stop[0]) === Math.abs(start[1]-stop[1]) ?
      true : false
    )
}

function getLineCoordinates(start, stop){
      let biggerArr;
      let smallerArr;
      if (start[0]-stop[0] !== start[1]-stop[1] && start[0]!==stop[0] && start[1]!==stop[1]){ //TopRight to BottomLeft Only ugh
          if (start[0] > stop[0]){
            biggerArr = start;
            smallerArr = stop;
          } else {
            biggerArr = stop;
            smallerArr = start;
          }
      } else if(start[0] > stop[0] || start[1] > stop[1]){
        biggerArr = start;
        smallerArr = stop;
      } else {
        biggerArr = stop;
        smallerArr = start;
      }

      if(start[0] === stop[0]){ //Top to Bottom
        for(let i = smallerArr[1]; i <= biggerArr[1]; i++){
          highlightLine.push($(`[row=${start[0]}][column=${i}]`).get(0))
        //   highlightLine.push([start[0], i])
        }
      } else if(start[1] === stop[1]){ //Left to Right
        for(let i = smallerArr[0]; i <= biggerArr[0]; i++){
          highlightLine.push($(`[row=${i}][column=${start[1]}]`).get(0))
        //   highlightLine.push([i, start[1]])
        }
      } else if(start[0]-stop[0] === start[1]-stop[1]){ //TopLeft to BottomRight
        for(let i = smallerArr[0], k = smallerArr[1]; i <= biggerArr[0]; i++, k++){
          highlightLine.push($(`[row=${i}][column=${k}]`).get(0))
        //   highlightLine.push([i, k])
        }
      } else { //TopRight to BottomLeft
          for(let i = smallerArr[0], k = smallerArr[1]; i <= biggerArr[0]; i++, k--){
              highlightLine.push($(`[row=${i}][column=${k}]`).get(0))
            //   highlightLine.push([i, k])
          }
      }
}

function mouseUpHandler(){
    let endPoint = event.target
    // console.log('Final Point', endPoint)

    let lettersPicked = [];
    highlightLine.map(item => lettersPicked.push($(item).children().text()))
    checkWord(lettersPicked.join(""))
    checkWord(lettersPicked.reverse().join("")) //sometimes registers backwards

    mouseLeaveHandler();
    $(startPoint).css('background-color', 'white');
    startPoint = null;
}


function checkWord(str){
    wordlist.indexOf(str) === -1 ? noMatch(str) : match(str)
}

function noMatch(str){
    // console.log('No Match', str)
}

function match(str){
    $(`p:contains(${str})`).css("text-decoration", "line-through");
    wordlist.splice(wordlist.indexOf(str), 1);
    // console.log('match', str, wordlist);
    if(wordlist.length === 0){
        winner();
    }
}

function drawLine(){
    var $this = $(this);
    var offset = $this.offset();
    var width = $this.width();
    var height = $this.height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;
}

function winner(){
    $(".gameboard").empty();
    $(".wordlist").empty();
    $(".modal").show();
}

function playAgain(){
    $(".modal").hide();
    createWordPuzzle();
    makeBoard();
    makeList();
    clickHandlers(true);
}
