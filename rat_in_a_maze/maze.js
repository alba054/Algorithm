
// queue structure for BFS
class Queue {
    constructor() {
        this.els = new Array();
        // this.head = 0;
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
        const taken = this.els.shift();
        this.size--;
        // this.head++;
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
        this.start = {row:null, col:null};
        this.goal = {row:null, col:null};

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
                    this.start.row = i;
                    this.start.col = j;
                }
                else if(this.encodedMaze[i][j] === 'B') {
                    this.maze[i][j].style.backgroundColor = "green";
                    this.goal.row = i;
                    this.goal.col = j;
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
            if(i.pos.row === pos.row && i.pos.col === pos.col) contained = true;
            
        })

        return contained;
    }

    solveIDS(start, goal, algo, maxDepth) {
        for(let i = 0; i <= maxDepth; i++) {
            const solution = this.solve(start, goal, algo, i);
            if(solution != "no solution") {
                return [solution, i];
            }
        }

        return "no solution"
;    }
    
    solve(start, goal, algo, limit) {
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
            this.visited.add(node);
            // console.log(node.pos)
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

    solveBDS(start, goal) {
        // keep track of number of grids visited
        this.numVisited = 0;

        // create start 
        const startNode = new Node(start, null, null);
        // create goal
        const goalNode = new Node(goal, null, null);

        // create start frontier
        const startFrontier = new Stack();
        // create goal frontier
        const goalFrontier = new Stack();

        // create startNode visited set
        const startVisited = new Set();
        // create goalNode visited set
        const goalVisited = new Set();

        // add startNode to startFrontier
        startFrontier.add(startNode);
        // add goalNode to goalFrontier
        goalFrontier.add(goalNode);

        while(true) {
            // if either startFrontier or goalFrontier empty
            // means there is no path from startNode to goalNode
            if(startFrontier.isEmpty() || goalFrontier.isEmpty()) {
                return "no solution";
            }
            
            // choose any possible moves from start 
            let sNode = startFrontier.remove();
            // choose any possible moves from goal
            let gNode = goalFrontier.remove();

            // check intersection startVisited and goalVisited
            const intersection = this.intersection(startVisited, goalVisited);
            if(intersection.length > 0) {
                const actions = new Array();
                const grids = new Array();
                sNode = intersection[0];
                this.maze[sNode.pos.row][sNode.pos.col].style.backgroundColor = "purple";
                while(sNode.par != null) {
                    actions.push(sNode.action);
                    grids.push(sNode.pos);
                    sNode = sNode.par;
                }
                gNode = intersection[1];
                // this.maze[gNode.pos.row][gNode.pos.col].style.backgroundColor = "purple";
                while(gNode.par != null) {
                    actions.push(gNode.action);
                    grids.push(gNode.pos);
                    gNode = gNode.par;
                }

                return {actions:actions, grids:grids};
            }

            // mark grid as visited
            startVisited.add(sNode);
            goalVisited.add(gNode);
            
            if(sNode.pos.row !== start.row && sNode.pos.col !== start.col) {
                this.maze[sNode.pos.row][sNode.pos.col].style.backgroundColor = "pink";
                this.maze[gNode.pos.row][gNode.pos.col].style.backgroundColor = "blue";
            }

            // possible moves relative to start
            const sNeighbors = this.neighbors(sNode.pos);
            // possible moves relative to goal
            const gNeighbors = this.neighbors(gNode.pos);
            
            // check all moves relative to start
            for(let i = 0; i < sNeighbors.length; i++) {
                const pos = sNeighbors[i].pos;
                const action = sNeighbors[i].action;
                if(!startFrontier.containState(pos) && !this.setContains(startVisited, pos)) {
                    const newNode = new Node(pos, sNode, action);
                    startFrontier.add(newNode);
                }
            }

            // check all moves relative to goal
            for(let i = 0; i < gNeighbors.length; i++) {
                const pos = gNeighbors[i].pos;
                const action = gNeighbors[i].action;
                if(!goalFrontier.containState(pos) && !this.setContains(goalVisited, pos)) {
                    const newNode = new Node(pos, gNode, action);
                    goalFrontier.add(newNode);
                }
            }

        }

    }

    intersection(set0, set1) {
        for(const i of set0) {
            for(const j of set1) {
                if(i.pos.row == j.pos.row && i.pos.col == j.pos.col) {
                    return [i, j];
                }
            }
        }

        return []
    }

    drawSolution(algo, limit) {
        this.colorGrid();
        const start = this.start;
        const goal = this.goal;
        let solution;
        if(algo == "ids") {
            solution = this.solveIDS(start, goal, algo, limit)[0].grids;
            // the minimum depth to explore
            console.log(this.solveIDS(start, goal, algo, limit)[1]);
        }
        else if(algo == "bds") {
            // console.log(start);
            solution = this.solveBDS(start, goal).grids;
            // console.log(solution);
        }
        else {
            solution = this.solve(start, goal, algo, limit).grids;
        }
        for(let i = 0; i < solution.length; i++) {
            const row = solution[i].row;
            const col = solution[i].col;
            if((row == goal.row && col == goal.col)) continue;
            this.maze[solution[i].row][solution[i].col].style.backgroundColor = "yellow";
        }
    }

}