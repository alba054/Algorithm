
// queue structure for BFS
class Queue {
    constructor() {
        this.els = new Array();
        this.head = 0;
        this.size = 0;
    }

    add(el) {
        this.els.push(el);
        this.size++;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        // return this.els.length == 0;
        return this.size == 0;
    }

    remove() {
        if(this.isEmpty()){
            return -1;
        }
        const taken = this.els[this.head];
        this.size--;
        this.head++;
        return taken;
    }

    containState(state) {
        for(let i = 0; i < this.size; i++) {
            if(this.els[i].pos.row === state.row && this.els[i].pos.col === state.col) {
                return true;
            }
        }

        return false;
    }

}

class Stack extends Queue {
    remove() {
        if(this.isEmpty()) return -1;
        const taken = this.els.pop();
        this.size--;
        return taken;
    }
}

class Node {
    constructor(pos, par, action) {
        this.pos = pos;
        this.par = par;
        this.action = action
    }
}

class Node2 extends Node{
    constructor(pos, par, action, depth) {
        super(pos, par, action);
        this.depth = depth;
    }
}

// create maze in the browser
class Maze {
    // construct Maze
    constructor(strMaze, canvas) {
        this.canvas = canvas;
        this.mazePerLn = strMaze.split('\n');
        this.encodedMaze = new Array(this.mazePerLn.length);
        this.maze = new Array(this.encodedMaze.length);

        // encode maze from string to array
        this.encodeMaze();
        // create grid in the browser
        this.createGrid();
        // color every grid
        this.colorGrid();
        // draw maze in the browser
        this.draw();
    }
    
    encodeMaze() {
        for(let i = 0; i < this.encodedMaze.length; i++) {
            this.encodedMaze[i] = this.mazePerLn[i].split("");
        }
    }

    createGrid() {
        for(let i = 0; i < this.encodedMaze.length; i++) {
            this.maze[i] = new Array(this.encodedMaze[0].length);
        }

        for(let i = 0; i < this.maze.length; i++) {
            for(let j = 0; j < this.maze[0].length; j++) {
                this.maze[i][j] = document.createElement("button");
                this.maze[i][j].style.padding = "10px 10px"
            }
        }
    }

    // * red for start
    // * green for goal
    // * black for walls
    // * white for unblocked path
    colorGrid() {
        for(let i = 0; i < this.maze.length; i++) {
            for(let j = 0; j < this.maze[0].length; j++) {
                if(this.encodedMaze[i][j] === 'A') {
                    this.maze[i][j].style.backgroundColor = "red";
                }
                else if(this.encodedMaze[i][j] === 'B') {
                    this.maze[i][j].style.backgroundColor = "green";
                }
                else if(this.encodedMaze[i][j] === '#') {
                    this.maze[i][j].style.backgroundColor = "black";
                }
                else if(this.encodedMaze[i][j] === " ") {
                    this.maze[i][j].style.backgroundColor = "white";
                }
                
            }
        }
    }

    draw() {
        const divRow = new Array(this.encodedMaze.length);
        for(let i = 0; i < this.maze.length; i++) {
            divRow[i] = document.createElement('div');
            for(let j = 0; j < this.maze[0].length; j++) {
                divRow[i].appendChild(this.maze[i][j]);
            }
            this.canvas.appendChild(divRow[i]);
        }
    }

    neighbors(pos) {
        const row = pos.row;
        const col = pos.col;
        const candidates = {
            up:[row - 1, col],
            down:[row + 1, col],
            left:[row, col - 1],
            right:[row, col + 1],
            upLeft:[row - 1, col - 1],
            upRight:[row - 1, col + 1],
            downLeft:[row + 1, col - 1],
            downRight:[row + 1, col + 1],

        }

        const result = [];
        for(const candidate in candidates) {
            const r = candidates[candidate][0];
            const c = candidates[candidate][1];
            if((r >= 0 && r < this.encodedMaze.length) && (c >= 0 && c < this.encodedMaze[0].length)) {
                if(this.encodedMaze[r][c] !== '#') {
                    result.push({action:candidate, pos:{row:r, col:c}});
                }
            }
        }

        return result;
    }

    setContains(visited, pos) {
        let contained = false
        visited.forEach((i) => {
            if(i.row === pos.row && i.col === pos.col) contained = true;
            
        })

        return contained;
    }

    solve(start, goal, algo) {
        // keep track of number of grids visited
        this.numVisited = 0;

        // initialize frontier (either stack or queue) with starting pos
        const startNode = new Node(start, null, null);
        const frontier = (algo === "bfs") ? new Queue():new Stack();
        frontier.add(startNode);

        // initialize empty set for tracking visited grid
        this.visited = new Set();

        while(true) {
            // console.log(frontier.size);
            if(frontier.isEmpty()) {
                return "no solution";
            }
            // choose any possible moves from one grid
            let node = frontier.remove();
            // console.log(frontier.getSize());
            // console.log(node.pos);
            // console.log(node.pos.row);
            this.numVisited++;
            // console.log(node.pos);
            // if grid is the goal
            if(node.pos.row == goal.row && node.pos.col == goal.col) {
                const actions = new Array();
                const grids = new Array();
                
                while(node.par != null) {
                    actions.push(node.action);
                    grids.push(node.pos);
                    node = node.par;
                }

                actions.reverse();
                grids.reverse();
                return {actions:actions, grids:grids};
            }

            // mark grid as visited
            this.visited.add(node.pos);
            if(node.pos.row != start.row && node.pos.col != start.col) {
                this.maze[node.pos.row][node.pos.col].style.backgroundColor = "pink";
            }
            // add any possible moves from one grid to frontier
            const neighbors = this.neighbors(node.pos);
            // console.log(neighbors)
            for(let i = 0; i < neighbors.length; i++) {
                const pos = neighbors[i].pos;
                const action = neighbors[i].action;
                // console.log(pos);
                // console.log(action);
                if(!frontier.containState(pos) && !this.setContains(this.visited, pos)) {
                    // console.log("hai");
                    // const parentNode = node;
                    const newNode = new Node(pos, node, action);
                    // console.log(newNode.par);
                    frontier.add(newNode);
                    // console.log(frontier.getSize());
                    // frontier.els;
                }
                // console.log(frontier.getSize());
            }
            // console.log(frontier.getSize());

        }
    }

    solveDLS(start, goal, algo, limit) {
        // limit variable
        const maxDepth = limit != -1 ? limit:-1;

        // keep track of number of grids visited
        this.numVisited = 0;

        // initialize frontier (either stack or queue) with starting pos
        const startNode = new Node2(start, null, null, maxDepth != -1 ? 0:-1);
        const frontier = algo == "bfs" ? new Queue():new Stack();
        frontier.add(startNode);

        // initialize empty set for tracking visited grid
        this.visited = new Set();

        while(true) {
            if(frontier.isEmpty()) {
                return "no solution";
            }

            // choose any possible moves from one grid
            let node = frontier.remove();
            this.numVisited++;

            // if grid is the goal
            if(node.pos.row == goal.row && node.pos.col == goal.col) {
                const actions = new Array();
                const grids = new Array();
                
                while(node.par != null) {
                    actions.push(node.action);
                    grids.push(node.pos);
                    node = node.par;
                }

                actions.reverse();
                grids.reverse();
                return {actions:actions, grids:grids};
            }
            
            // mark grid as visited
            this.visited.add(node.pos);
            if(node.pos.row !== start.row && node.pos.col !== start.col) {
                this.maze[node.pos.row][node.pos.col].style.backgroundColor = "pink";
            }
            
            // skip if next node is beyond limit depth
            if(maxDepth != -1) {
                if(node.depth + 1 > limit) continue;
            }

            // add any possible moves from one grid to frontier
            const neighbors = this.neighbors(node.pos);

            for(let i = 0; i < neighbors.length; i++) {
                const pos = neighbors[i].pos;
                const action = neighbors[i].action;
                if(!frontier.containState(pos) && !this.setContains(this.visited, pos)) {
                    const newNode = new Node2(pos, node, action, node.depth+1);
                    frontier.add(newNode);
                }
            }

        }
    }

    drawSolution(algo, limit) {
        this.colorGrid();
        const start = {row:15, col:0};
        const goal = {row:8, col:13};
        const solution = this.solveDLS(start, goal, algo, limit).grids;
        for(let i = 0; i < solution.length; i++) {
            const row = solution[i].row;
            const col = solution[i].col;
            // if((row == start.row && col == start.col) || (row == goal.row && goal.col)) continue;
            this.maze[solution[i].row][solution[i].col].style.backgroundColor = "yellow";
        }
    }

}