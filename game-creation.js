const board = {
    height: 5,
    width: 5,
    numOfWords: 5,
};

let wordlist = [];
let setUp = [];

function createWordPuzzle(){
    for(let i = 0; i < board.height; i++){
        setUp.push(new Array(board.width))
    }
    let trashedWords = [];
    while (wordlist.length < board.numOfWords){
      let word = getNewWord();
      if(trashedWords.indexOf(word) === -1 && wordlist.indexOf(word) === -1){

        for(let tries = 0; tries < 20; tries++){
          const newPosition = randomPosition();
          if(placementInSetUp(newPosition.x,newPosition.y,word)){
            wordlist.push(word);
            break;
          }
        }
        trashedWords.push(word); //fails placement

      }
      if(wordlist.length + trashedWords.length === dictionary.length){
        restartCreateWordPuzzle();
        return;
      }
    }
    console.log(setUp)
    console.log(wordlist)
}

function restartCreateWordPuzzle(){
  wordlist = [];
  setUp = [];
  createWordPuzzle();
}

function getNewWord(){
    const randomNum = Math.floor(Math.random() * 77)
    return dictionary[randomNum]
}

function randomPosition(){
    const randomX = Math.floor(Math.random() * board.width)
    const randomY = Math.floor(Math.random() * board.height)
    return {x:randomX,y:randomY}
}

function placementInSetUp(x,y,word){
  for(var i = 0; i < allDirections.length; i++){
    const direction = allDirections[i];
    if(checkIfFits(direction, x,y,word.length) && checkIfEmpty(direction, x,y,word)){
      const arr = word.split("");
      let position = {x:x,y:y}
      const newDirectionFunction = directionsObj[direction];
      for(let arrI = 0; arrI < arr.length; arrI++){
        setUp[position.y][position.x] = arr[arrI]
        position = newDirectionFunction(position.x,position.y,1)
      }
      return true;
    }
  }
  return false;
}

function checkIfFits(direction, x,y,l){
    const checkFunction = checkDirections[direction];
    return checkFunction(x,y,board.height,board.width,l)
}

function checkIfEmpty(direction,x,y,word){
  let l = word.length
  var output = true;
  let position = {x:x,y:y}
  const newDirectionFunction = directionsObj[direction];
  for (var i = 0; i < l; i++){
    const distance = i===0 ? 0 : 1
    position = newDirectionFunction(position.x,position.y,distance)
    const itemInPosition = setUp[position.y][position.x]
    if(itemInPosition){
      if(itemInPosition !== word[i]){
        //check if the thing there is the same as the word item
        output = false;
      }
    }
  }
  return output;
}

function randomLetter(){
    const randomNum = Math.floor(Math.random() * (122-97 + 1)) + 97
    return String.fromCharCode(randomNum)
}



/*******
DOM CREATION
********/

function makeList(){
    wordlist.map(item=>{
        let div = $('<div>', {
            class: '',
        });
        let word = $('<p>', {
            text: item,
            class: 'word'
        });
        div.append(word);
        $('.wordlist').append(div)
    })
}

function makeBoard(){
    for(let rowI=0; rowI<board.width; rowI++){
        let row = $('<div>', {
            class: 'row',
        });
        for(let columnI=0; columnI<board.height; columnI++){
            let square = $('<div>', {
                class: 'square',
                row: rowI,
                column: columnI,
            });
            let text = $('<p>', {
                text: setUp[rowI][columnI] ? setUp[rowI][columnI] : randomLetter(),
                class: 'letter'
            });
            square.append(text);
            row.append(square);
        }
        $('.gameboard').append(row)
    }
}
