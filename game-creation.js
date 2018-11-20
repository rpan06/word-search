const board = {
    height: 5,
    width: 5,
    numOfWords: 5,
};

let wordArray = [];
let setUp = [];

// The list of all the possible orientations
const allOrientations = ['horizontal','horizontalBack','vertical','verticalUp',
 'diagonal','diagonalUp','diagonalBack','diagonalUpBack'];

// The definition of the orientation, calculates the next square given a
// starting square (x,y) and distance (i) from that square.
const orientations = {
horizontal:     function(x,y,i) { return {x: x+i, y: y  }; },
horizontalBack: function(x,y,i) { return {x: x-i, y: y  }; },
vertical:       function(x,y,i) { return {x: x,   y: y+i}; },
verticalUp:     function(x,y,i) { return {x: x,   y: y-i}; },
diagonal:       function(x,y,i) { return {x: x+i, y: y+i}; },
diagonalBack:   function(x,y,i) { return {x: x-i, y: y+i}; },
diagonalUp:     function(x,y,i) { return {x: x+i, y: y-i}; },
diagonalUpBack: function(x,y,i) { return {x: x-i, y: y-i}; }
};

// Determines if an orientation is possible given the starting square (x,y),
// the height (h) and width (w) of the puzzle, and the length of the word (l).
// Returns true if the word will fit starting at the square provided using
// the specified orientation.
const checkOrientations = {
horizontal:     function(x,y,h,w,l) { return w >= x + l; },
horizontalBack: function(x,y,h,w,l) { return x + 1 >= l; },
vertical:       function(x,y,h,w,l) { return h >= y + l; },
verticalUp:     function(x,y,h,w,l) { return y + 1 >= l; },
diagonal:       function(x,y,h,w,l) { return (w >= x + l) && (h >= y + l); },
diagonalBack:   function(x,y,h,w,l) { return (x + 1 >= l) && (h >= y + l); },
diagonalUp:     function(x,y,h,w,l) { return (w >= x + l) && (y + 1 >= l); },
diagonalUpBack: function(x,y,h,w,l) { return (x + 1 >= l) && (y + 1 >= l); }
};


function generateWordArray(){
    // for(let i = 0; i < board.numOfWords; i++){
    //     const randomNum = Math.floor(Math.random() * 77)
    //     wordArray.push(list[randomNum])
    // }    
    wordArray = ['beat','top','trap','bat','rat','air']
}

function createWordPuzzle(){
    setUp = [
        ['b','e','a','t',''],
        ['a','','','o',''],
        ['t','r','a','p',''],
        ['','','i','',''],
        ['','','r','a','t']
    ]
    // for(let i = 0; i < board.height; i++){
    //     setUp.push(new Array(board.width))
    // }
}


//Place word down on board (while wordlength < num of words)
    //Randomly generate word, newWord, make sure its not in array already

    //check if any previous words in wordArray have the same letters as newWord (regex)
        //if yes, then CheckIfFit
        //if CheckIfFit true, CheckIfEmpty. If not empty, check if the letter matches newWord letter
        //place in array if all good, otherwise continue
    //Randomly generate position (x20)
        //check if word fits
        //if CheckIfFit true, CheckIfEmpty. If not empty, check if the letter matches newWord letter
        //place in array if all good, otherwise continue


function randomLetter(){
    const randomNum = Math.floor(Math.random() * (122-97 + 1)) + 97
    return String.fromCharCode(randomNum)
}



/*******
DOM CREATION
********/

function makeList(){
    wordArray.map(item=>{
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
