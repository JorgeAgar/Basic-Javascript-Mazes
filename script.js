var canvas = document.getElementById("lab_canvas");
var ctx = canvas.getContext("2d");

const maze_width = 43;
const maze_height = 43;
const cell_width = Math.floor(canvas.width/maze_width);
const cell_height = Math.floor(canvas.height/maze_height);

var maze = [];

canvas.onclick = canvasClick;
canvas.onkeydown = canvasKeyDown;

var key_solving_pos = [1, 0];
function canvasKeyDown(event){
    console.log(key_solving_pos);
    if(key_solving_pos[1] > 1 && (event.code == "ArrowUp" || event.code == "KeyW") && maze[key_solving_pos[0]][key_solving_pos[1]-1] != 1){
        key_solving_pos[1]--;
    }
    else if((key_solving_pos[1] < maze_height-2 || (key_solving_pos[0] == maze_width-2 && key_solving_pos[1] == maze_height-2)) && (event.code == "ArrowDown" || event.code == "KeyS") && maze[key_solving_pos[0]][key_solving_pos[1]+1] != 1){
        key_solving_pos[1]++;
    }
    else if(key_solving_pos[0] > 1 && (event.code == "ArrowLeft" || event.code == "KeyA") && maze[key_solving_pos[0]-1][key_solving_pos[1]] != 1){
        key_solving_pos[0]--;
    }
    else if(key_solving_pos[0] < maze_width-2 && (event.code == "ArrowRight" || event.code == "KeyD") && maze[key_solving_pos[0]+1][key_solving_pos[1]] != 1){
        key_solving_pos[0]++;
    }
    
    userSolveCell(key_solving_pos[0], key_solving_pos[1]);
}

function canvasClick(event){
    canvas.focus();
    var mazeX = Math.ceil(event.offsetX/cell_width)-1;
    var mazeY = Math.ceil(event.offsetY/cell_height)-1;

    //starting cell
    maze[1][0] = 2;
    ctx.fillStyle = "green";
    ctx.fillRect(cell_width, 0,
        cell_width, cell_height);

    userSolveCell(mazeX, mazeY);
}

function userSolveCell(x, y){
    //console.log(x + "," + y); 
    if(maze[x][y] == 0 && (maze[x-1][y] == 2 || maze[x][y-1] == 2 || maze[x+1][y] == 2 || maze[x][y+1] == 2)){
        maze[x][y] = 2;
        userSolveDraw(x, y, 1);
        return;
    }
    if(maze[x][y] == 2){
        maze[x][y] = 0;
        userSolveDraw(x, y, 2);
    }
}

function userSolveDraw(mazeX, mazeY, action){
    //console.log("drawing " + mazeX + "," + mazeY);
    if(action == 1){
        //console.log("action 1")
        ctx.fillStyle = "green";
        ctx.fillRect(cell_width * mazeX, cell_height * mazeY,
            cell_width, cell_height);
    } else if(action == 2){
        //console.log("action 2")
        ctx.fillStyle = "white";
        ctx.fillRect(cell_width * mazeX, cell_height * mazeY,
            cell_width, cell_height);
    }
    ctx.fillStyle = "black";
}

//modified from https://github.com/professor-l/mazes
function drawMaze() {
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
    backtrackingMaze(maze_width, maze_height);
}

/*
       1  
    0  -  2
       3
*/
function backtrackingMaze(width, height){
    maze = [];
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
    while(available_cells > 0){

        maze[current_cell[0]][current_cell[1]] = 0;
        
        if(tried_directions[0] == 1 && tried_directions[1] == 1 && tried_directions[2] == 1 && tried_directions[3] == 1){
            tried_directions = [0, 0, 0, 0];
            current_cell = pos_stack.pop();
        }

        var possible = [0, 0, 0, 0];

        if(current_cell[0] > 2 && maze[current_cell[0]-2][current_cell[1]] == 1)
            possible[0] = 1;
        if(current_cell[1] > 2 && maze[current_cell[0]][current_cell[1]-2] == 1)
            possible[1] = 1;
        if(current_cell[0]+2 < width && maze[current_cell[0]+2][current_cell[1]] == 1)
            possible[2] = 1;
        if(current_cell[1]+2 < height && maze[current_cell[0]][current_cell[1]+2] == 1)
            possible[3] = 1;

        var direction = Math.floor(Math.random() * 4);

        switch(direction){
            case 0:
                if(current_cell[0] <= 1 || possible[0] != 1){
                    tried_directions[0] = 1;
                    continue Loop;
                }
                tried_directions = [0, 0, 0, 0];
                var print = current_cell.map((x) => x);
                pos_stack.push(print);
                current_cell[0] -= 2;
                maze[current_cell[0]][current_cell[1]] = 0;
                maze[current_cell[0]+1][current_cell[1]] = 0;
                break;
            case 1:
                if(current_cell[1] <= 1 || possible[1] != 1){
                    tried_directions[1] = 1;
                    continue Loop;
                }
                tried_directions = [0, 0, 0, 0];
                var print = current_cell.map((x) => x);
                pos_stack.push(print);
                current_cell[1] -= 2;
                maze[current_cell[0]][current_cell[1]] = 0;
                maze[current_cell[0]][current_cell[1]+1] = 0;
                break;
            case 2:
                if(current_cell[0] >= width-1 || possible[2] != 1){
                    tried_directions[2] = 1;
                    continue Loop;
                }
                tried_directions = [0, 0, 0, 0];
                var print = current_cell.map((x) => x);
                pos_stack.push(print);
                current_cell[0] += 2;
                maze[current_cell[0]][current_cell[1]] = 0;
                maze[current_cell[0]-1][current_cell[1]] = 0;
                break;
            case 3:
                if(current_cell[1] >= height-1 || possible[3] != 1){
                    tried_directions[3] = 1;
                    continue Loop;
                }
                tried_directions = [0, 0, 0, 0];
                var print = current_cell.map((x) => x);
                pos_stack.push(print);
                current_cell[1] += 2;
                maze[current_cell[0]][current_cell[1]] = 0;
                maze[current_cell[0]][current_cell[1]-1] = 0;
                break;
            default:
                console.log("something happened");
                break;
        }
        available_cells--;
    }
    console.log("finish maze gen");
    
    //open start and finish
    maze[1][0] = 0;
    maze[maze.length-2][maze.length-1] = 0;

    drawMaze();
    //printMaze(maze);
}

function printMaze(){
    for(let i = 0; i < maze.length; i++){
        var line = "";
        for(let j = 0; j < maze[0].length; j++){
            line += maze[j][i] + "   ";
        }
        console.log(line);
    }
}