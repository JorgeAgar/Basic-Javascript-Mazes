//var button = document.getElementById("button");

var canvas = document.getElementById("lab_canvas");
var continue_loop = true;

//copied from https://github.com/professor-l/mazes
function drawMaze(maze, canvasId) {
    //console.log("drawing");
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    
    var rectWidth = Math.floor(canvas.width / maze[0].length);
    var rectHeight = Math.floor(canvas.height / maze.length);
    
    for (var i = 0; i < maze.length; i++) {
        for (var j = 0; j < maze[i].length; j++) {
            if (maze[i][j]) {
                ctx.fillRect(rectWidth * i, rectHeight * j,
                             rectWidth, rectHeight);
            }
            else {
                ctx.clearRect(rectWidth * i, rectHeight * j,
                              rectWidth, rectHeight);
            }
        }
    }
}

function backtracking(){
    backtrackingMaze(29, 29);
}
/*
    5   2   6
    1   -   3
    7   4   8
*/
function backtrackingMaze(width, height){
    //copied from https://github.com/professor-l/mazes
    var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            maze[i].push(1);
        }
    }

    var current_cell = []
    do{
        current_cell[0] = Math.floor(Math.random() * width);
    } while(current_cell[0] % 2 == 0);
    do{
        current_cell[1] = Math.floor(Math.random() * height);
    } while(current_cell[1] % 2 == 0);

    console.log("started at " + current_cell);

    var available_cells = Math.floor(width/2)*Math.floor(height/2)-1;
    var tried_directions = [0, 0, 0, 0];
    var pos_stack = [current_cell];

    Loop:
    while(available_cells > 0 && continue_loop){
        //console.log("");
        maze[current_cell[0]][current_cell[1]] = 0;
        //console.log("av cells " + available_cells);
        //console.log(tried_directions);
        if(tried_directions[0] == 1 && tried_directions[1] == 1 && tried_directions[2] == 1 && tried_directions[3] == 1){
            tried_directions = [0, 0, 0, 0];
            //console.log(pos_stack.pop());
            //current_cell = shufflePos(maze, pos_stack);
            //pos_stack.pop();
            current_cell = pos_stack.pop();
            //console.log("shuffled to: " + current_cell);
        }

        var direction = Math.floor(Math.random() * 4);
        var possible = [0, 0, 0, 0];
        //console.log(maze);
        //console.log("current cell " + current_cell[0] + ", " + current_cell[1]);
        if(current_cell[0] > 2 && maze[current_cell[0]-2][current_cell[1]] == 1)
            possible[0] = 1;
        if(current_cell[1] > 2 && maze[current_cell[0]][current_cell[1]-2] == 1)
            possible[1] = 1;
        if(current_cell[0]+2 < width && maze[current_cell[0]+2][current_cell[1]] == 1)
            possible[2] = 1;
        if(current_cell[1]+2 < height && maze[current_cell[0]][current_cell[1]+2] == 1)
            possible[3] = 1;

        //console.log("posible " + possible);
        //console.log(direction);

        switch(direction){
            case 0:
                //console.log("cell: " + current_cell);
                //console.log("possible " + possible[0]);
                if(current_cell[0] <= 1 || possible[0] != 1){
                    tried_directions[0] = 1;
                    continue Loop;
                }
                tried_directions = [0, 0, 0, 0];
                var print = current_cell.map((x) => x);
                //console.log("previous pos: " + print);
                pos_stack.push(print);
                current_cell[0] -= 2;
                maze[current_cell[0]][current_cell[1]] = 0;
                maze[current_cell[0]+1][current_cell[1]] = 0;
                //printMaze(maze);
                //available_cells--;
                //console.log("hello");
                break;
            case 1:
                if(current_cell[1] <= 1 || possible[1] != 1){
                    tried_directions[1] = 1;
                    continue Loop;
                }
                tried_directions = [0, 0, 0, 0];
                var print = current_cell.map((x) => x);
                //console.log("previous pos: " + print);
                pos_stack.push(print);
                current_cell[1] -= 2;
                maze[current_cell[0]][current_cell[1]] = 0;
                maze[current_cell[0]][current_cell[1]+1] = 0;
                //available_cells--;
                //printMaze(maze);
                break;
            case 2:
                if(current_cell[0] >= width-1 || possible[2] != 1){
                    tried_directions[2] = 1;
                    continue Loop;
                }
                tried_directions = [0, 0, 0, 0];
                var print = current_cell.map((x) => x);
                //console.log("previous pos: " + print);
                pos_stack.push(print);
                current_cell[0] += 2;
                maze[current_cell[0]][current_cell[1]] = 0;
                maze[current_cell[0]-1][current_cell[1]] = 0;
                //available_cells--;
                //printMaze(maze);
                break;
            case 3:
                if(current_cell[1] >= height-1 || possible[3] != 1){
                    tried_directions[3] = 1;
                    continue Loop;
                }
                tried_directions = [0, 0, 0, 0];
                var print = current_cell.map((x) => x);
                //console.log("previous pos: " + print);
                pos_stack.push(print);
                current_cell[1] += 2;
                maze[current_cell[0]][current_cell[1]] = 0;
                maze[current_cell[0]][current_cell[1]-1] = 0;
                //available_cells--;
                //printMaze(maze);
                break;
            default:
                console.log("something happened");
                break;
        }
        available_cells--;
        //drawMaze(maze, "lab_canvas");
    }
    console.log("finish maze gen");
    maze[1][0] = 0;
    maze[maze.length-2][maze.length-1] = 0;
    drawMaze(maze, "lab_canvas");
    //console.log(maze);
    //printMaze(maze);
}

function shufflePos(maze, pos_stack){
    return pos_stack.pop();
}

function printMaze(maze){
    for(let i = 0; i < maze.length; i++){
        var line = "";
        for(let j = 0; j < maze[0].length; j++){
            line += maze[j][i] + "   ";
            //console.log(i + ", " + j);
        }
        console.log(line);
    }
    //console.log(maze.length + "x" + maze[0].length);
}