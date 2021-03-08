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

const strMaze4 = `#####################################
#       # # #           #   #     # #
# ####### # ### # ### ### ####### # #
#       #       # #     #     # #   #
##### ##### ### # # # ### ##### # ###
#   # # # #   # # # #   # #   # #   #
# ### # # # ### ##### ### # ### ### #
#       #     #   #   #     # # #   #
### ######### ####### ### ### # # # #
#             #       # #   #     # #
# # ##### # ### # # ### # ### ### # #
# # #     # # # # #     #   # # # # #
# # # ####### # ######### ### # ### #
# # # #     #   #     #     #   #   #
### ### # ##### ##### ### ### ##### #
#     # # #     # #     # #   # # # #
# # # # # ### ### ### ### # # # # # #
# # # # #                 # # #     #
### ####### # # ##### ### # ### #####
#       # # # #     #   #     # #   #
##### # # ######### ########### # ###
#   # #           # #     #   # #   #
# ### ##### ######### ##### # # ### #
# #   #      #        #     #       #
# # # ##### ### # # # # #############
# # #   #     # # # #       #   # # #
# # ### ### # # # ######### ### # # #
# #   # #   # # #   # #   # # #     #
# ### ### ##### ### # # ##### # #####
#       #   #     # #     #   # #   #
### # ##### ##### ### ### # ### # ###
# # # # # # # #     # #   # #   # # #
# # ### # # # # ######### # # # # # #
#   #   #   #                 #     #
# # # # ### ### ####### ### ### ### #
#A# # #       #   #       #   # #  B#
#####################################`

const strMaze5 = `##########################
#          # #       #####
# ##### ## # # ##### #####
#     # #  #   #   # #####
####### ######## # #    ##
#                # #  # ##
# ######## ##### #    # ##
# ######## ##### #### # ##
# ##     #     # #    # ##
# ## ### # ### # # #### ##
# ## # # #A#B# # # #    ##
# ## # # ### # # ###### ##
# ## #       # #        ##
# ## ######### # #########
# ##                 #   #
# ## ########### ### ### #
#  # #           #       #
##########################`

const maze = new Maze(strMaze3, canvas);
const bfsBtn = document.querySelector(".bfs")
const dfsBtn = document.querySelector(".dfs")
const dlsBtn = document.querySelector(".dls")
const idsBtn = document.querySelector(".ids")
const bdsBtn = document.querySelector(".bds")


bfsBtn.onclick = function() { 
     let t0 = performance.now();
     maze.drawSolution("bfs", -1);
     let t1 = performance.now();
     const h3 = document.querySelector('.performance');
     h3.innerHTML = "time to run bfs : " + (t1 - t0) + " ms";
};
dfsBtn.onclick = function() { 
     let t0 = performance.now();
     maze.drawSolution("dfs", -1); 
     let t1 = performance.now();
     const h3 = document.querySelector('.performance');
     h3.innerHTML = "time to run dfs : " + (t1 - t0) + " ms";
     
};
dlsBtn.onclick = function() { 
     let t0 = performance.now();
     maze.drawSolution("dls", 156); 
     let t1 = performance.now();
     const h3 = document.querySelector('.performance');
     h3.innerHTML = "time to run dls : " + (t1 - t0) + " ms";
};
idsBtn.onclick = function() { 
     let t0 = performance.now();
     maze.drawSolution("ids", 100); 
     let t1 = performance.now();
     const h3 = document.querySelector('.performance');
     h3.innerHTML = "time to run ids : " + (t1 - t0) + " ms";
     
};
bdsBtn.onclick = function() {
     let t0 = performance.now();
     maze.drawSolution("bds", -1); 
     let t1 = performance.now();
     const h3 = document.querySelector('.performance');
     h3.innerHTML = "time to run bds : " + (t1 - t0) + " ms";
};
