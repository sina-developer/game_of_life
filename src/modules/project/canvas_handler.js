import {global} from "../canvas_handler/global_vars";
import {Random} from "../canvas_handler/methods";

var g = new global();

g.mousePressed = (e)=>{ 
    let x = g.mouseXPress;
    let y = g.mouseYPress;
    if(e.target.tagName == "CANVAS"){
        let w = g.width / cols;
        let h = g.height / rows;
        x = parseInt(x / w);
        y = parseInt(y / h);
        grid[y][x] = 1;
    }
    
    
}

g.keyPressed = (e)=>{

}

var grid ;
var new_grid ;
var cols = 200;
var rows = 100;
var start = (ctx)=>{
    grid = makeGrid(cols , rows)
    new_grid = makeGrid(cols , rows)
    fillRandomGrid(grid);
}

var update = (ctx) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,g.width , g.height);
    let w = g.width / cols;
    let h = g.height / rows;
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let cell = grid[i][j];
            let x = j * w;
            let y = i * h;
            ctx.fillStyle = cell ? "#000" : "#fff";
            ctx.fillRect(x , y - 1 , w - 1 , h - 1);
            let count = getNeighbors(grid , i , j);
            // ctx.fillStyle = cell ? "#fff" : "#000" ;
            // ctx.fillText(count , x + w / 2 - 5 , y + h / 2 )
            fillNewGrid(i , j , count);
        }
    }
    
    grid = new_grid.map(k => {
        return [...k]
    });
}

function makeGrid(_cols , _rows){
    let arr = new Array(_rows);
    for (let i = 0; i < arr.length; i++) {        
        arr[i] = new Array(_cols);
    }
    return arr;
}

function fillRandomGrid(grid){
    for (let i = 0; i < grid.length; i++) {
        let row = grid[i];
        for (let j = 0; j < row.length; j++) {            
            row[j] = Random(0,1);
        }
    }
}

function getNeighbors(grid , y , x){
    let sum = 0;
    let w = g.width / cols;
    let h = g.height / rows;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let nY = ( i + y + rows) % rows;
            let nX = ( j + x + cols) % cols;
            sum += grid[nY][nX];
        }
    }
    
    sum -= grid[y][x];
    return sum;
}

function fillNewGrid(i , j , count){
    let state = grid[i][j];
    if(state == 0 && count == 3){
        state = 1;
    }else  if(state == 1 && (count == 2 || count == 3)){
        state = 1;
    }else{
        state = 0;
    }
    new_grid[i][j] = state;
}

export {start , update};