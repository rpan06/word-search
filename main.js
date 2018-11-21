$(document).ready(start);

function start(){
    // generateWordArray();
    createWordPuzzle();
    makeBoard();
    makeList();
    clickHandlers();

    //set the width and height properly
    var c = $("#myCanvas")[0];
    var ctx=c.getContext("2d");
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;

};
