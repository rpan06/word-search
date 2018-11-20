$(document).ready(start);

function start(){
    // generateWordArray();
    createWordPuzzle();
    makeBoard();
    makeList();
    clickHandlers();

    var canvases = document.getElementsByTagName("canvas");
    for(var i=0; i<canvases.length; i++){
        canvas = canvases[i];
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
};
