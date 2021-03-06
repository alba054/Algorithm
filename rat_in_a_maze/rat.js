const canvas = document.querySelector(".canvas");


const strMaze0 = 
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

const strMaze1 = `#####B#
##### #
####  #
#### ##
     ##
A######`

const strMaze2 = `##    #
## ## #
#B #  #
# ## ##
     ##
A######`

const strMaze3 = `##    #
## ## #
#B #  #
# ## ##
     ##
A######`

const maze = new Maze(strMaze0, canvas);
const bfsBtn = document.querySelector(".bfs")
const dfsBtn = document.querySelector(".dfs")
const dlsBtn = document.querySelector(".dls")
const idsBtn = document.querySelector(".ids")


bfsBtn.onclick = function() { maze.drawSolution("bfs", -1); };
dfsBtn.onclick = function() { maze.drawSolution("dfs", -1); };
dlsBtn.onclick = function() { maze.drawSolution("dls", 23); };
idsBtn.onclick = function() { maze.drawSolution("ids", 45); };
