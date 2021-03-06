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
const dlsBtn = document.querySelector(".dls")


bfsBtn.onclick = function() { maze.drawSolution("bfs", -1); };
dfsBtn.onclick = function() { maze.drawSolution("dfs", -1); };
dlsBtn.onclick = function() { maze.drawSolution("dfs", 25); };


// const solution = maze.solve(start, goal)
// console.log(solution);
