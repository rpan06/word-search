let startPoint = null;
let highlightLine = [];
let endPoint = null;

function clickHandlers(isThisPlayAgain = false){
    $('.square').mousedown(mouseDownHandler)
    $('.square').mouseenter(mouseEnterHandler)
    $('.square').mouseleave(mouseLeaveHandler)
    $('.square').mouseup(mouseUpHandler)
    $('body').click(handler)
    if(!isThisPlayAgain){
        $('#play-again').click(playAgain)
    }
}

function handler(e) {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;

    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    console.log('mouse is here:', pageX, pageY);
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
    endPoint = event.target
    // console.log('Final Point', endPoint)

    let lettersPicked = [];
    highlightLine.map(item => lettersPicked.push($(item).children().text()))
    checkWord(lettersPicked.join(""))
    checkWord(lettersPicked.reverse().join("")) //sometimes registers backwards

    mouseLeaveHandler();
    $(startPoint).css('background-color', 'white');
    startPoint = null;
    endPoint = null;
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
    drawLine();
    // console.log('match', str, wordlist);
    if(wordlist.length === 0){
        winner();
    }
}

function drawLine(){
    const start = getCenter(startPoint)
    const stop = getCenter(endPoint)
    console.log(start,stop)

    var c = $("#myCanvas")[0];
    var ctx=c.getContext("2d");
    ctx.lineCap="round";
    ctx.lineWidth = 30;
    ctx.strokeStyle = `rgb(${randomNumber()},${randomNumber()},${randomNumber()}, 0.25)`;
    ctx.beginPath();
    ctx.moveTo(start.x,start.y);
    ctx.lineTo(stop.x,stop.y);
    ctx.stroke();
}

function randomNumber(){
    return Math.floor(Math.random() * 256)
}

function getCenter(point){
    var $this = $(point);
    var offset = $this.offset();
    var width = $this.width();
    var height = $this.height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;

    //Getting base coordinates to subtract from original
    //Gets relative
    const cornerGameBoard = $('[column=0][row=0]').offset();
    centerX -= cornerGameBoard.left
    centerY -= cornerGameBoard.top

    return {x : centerX, y : centerY}
}

function winner(){
    var c = $("#myCanvas")[0];
    var ctx=c.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
