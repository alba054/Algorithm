const canvas = document.querySelector(".canvas");


const strMaze = 
`###                 #########
#   ###################   # #
# ####                # # # #
# ################### # # # #
#                     # # # #
##################### # # # #
#   ##                # # # #
# # ## ### ## ######### # # #
# #    #   ##B          # # #
# # ## ################ # # #
### ##             #### # # #
### ############## ## # # # #
###             ##    # # # #
###### ######## ####### # # #
###### ####             #   #
A      ######################`;


const maze = new Maze(strMaze, canvas);
const bfsBtn = document.querySelector(".bfs")
const dfsBtn = document.querySelector(".dfs")


bfsBtn.onclick = function() {
    // maze.colorGrid();
    maze.drawSolution("bfs");
}
dfsBtn.onclick = function() { 
    // maze.colorGrid();
    maze.drawSolution("dfs");
};
// const solution = maze.solve(start, goal)
// console.log(solution);
