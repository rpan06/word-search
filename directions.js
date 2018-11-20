//Taken from
//https://github.com/bunkat/wordfind/blob/master/wordfind.js



// The list of all the possible directions
const allDirections = ['horizontal','vertical','diagonal','diagonalUp','verticalUp'];
// 'horizontalBack','diagonalBack','diagonalUpBack'


// The definition of the direction, calculates the next square given a
// starting square (x,y) and distance (i) from that square.
const directionsObj = {
horizontal:     function(x,y,i) { return {x: x+i, y: y  }; },
horizontalBack: function(x,y,i) { return {x: x-i, y: y  }; },
vertical:       function(x,y,i) { return {x: x,   y: y+i}; },
verticalUp:     function(x,y,i) { return {x: x,   y: y-i}; },
diagonal:       function(x,y,i) { return {x: x+i, y: y+i}; },
diagonalBack:   function(x,y,i) { return {x: x-i, y: y+i}; },
diagonalUp:     function(x,y,i) { return {x: x+i, y: y-i}; },
diagonalUpBack: function(x,y,i) { return {x: x-i, y: y-i}; }
};

// Determines if an direction is possible given the starting square (x,y),
// the height (h) and width (w) of the puzzle, and the length of the word (l).
// Returns true if the word will fit starting at the square provided using
// the specified direction.
const checkDirections = {
horizontal:     function(x,y,h,w,l) { return w >= x + l; },
horizontalBack: function(x,y,h,w,l) { return x + 1 >= l; },
vertical:       function(x,y,h,w,l) { return h >= y + l; },
verticalUp:     function(x,y,h,w,l) { return y + 1 >= l; },
diagonal:       function(x,y,h,w,l) { return (w >= x + l) && (h >= y + l); },
diagonalBack:   function(x,y,h,w,l) { return (x + 1 >= l) && (h >= y + l); },
diagonalUp:     function(x,y,h,w,l) { return (w >= x + l) && (y + 1 >= l); },
diagonalUpBack: function(x,y,h,w,l) { return (x + 1 >= l) && (y + 1 >= l); }
};
