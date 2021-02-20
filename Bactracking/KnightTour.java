
class KnightTour {
    int n;
    int board[][];
    KnightTour(int n) {
        this.n = n;
        this.board = new int[this.n][this.n];
        for(int i = 0; i < this.n; i++) {
            for(int j = 0; j < this.n; j++) {
                this.board[i][j] = -1;
            }
        }
        this.board[0][0] = 0;
    }

    boolean isValid(int[] knightMove) {
        int x_knight = knightMove[0];
        int y_knight = knightMove[1];

        if((x_knight >= 0 && x_knight < this.n) && (y_knight >= 0 && y_knight < this.n)) {
            if(this.board[x_knight][y_knight] == -1) {
                return true;
            }
        }
        return false;
    }

    boolean solve(int[] knightMove, int num, int[][] actions) {
        if(num >= this.n * this.n) {
            return true;
        }
        
        

        for(int i = 0; i < actions.length; i++) {
            int x_knight = knightMove[0];
            int y_knight = knightMove[1];
            int x_act = actions[i][0];
            int y_act = actions[i][1];
            // System.out.printf("(%d, %d) %d\n", knightMove[0], knightMove[1], num);
            int[] newMove = {x_knight + x_act, y_knight + y_act};

            // System.out.printf("(%d, %d)\n", newMove[0], newMove[1]);
            // System.out.println(this.isValid(newMove));
            // System.out.println();
            if(this.isValid(newMove)) {
                this.board[newMove[0]][newMove[1]] = num;
                if(this.solve(newMove, num + 1, actions)) {
                    return true;
                }
                else {
                this.board[newMove[0]][newMove[1]] = -1;}
            }
            // knightMove[0] = x_knight;
            // knightMove[1] = y_knight;
        }

        return false;
    }
    
    String printSolution() {
        int[] knightMove = {0, 0};
        int [][] actions = {{1, 2}, {2, 1}, {-1, -2}, {-2, -1}, {-1, 2}, {-2, 1}, {2, -1}, {1, -2}};
        this.solve(knightMove, 1, actions);
            String s = "";
            for(int i = 0; i < this.n; i++) {
                for(int j = 0; j < this.n; j++) {
                    s += String.valueOf(this.board[i][j]) + " ";
                }
                s += "\n";
            }

            return s;
        

        // return "no solution";
    }

    public static void main(String[] args) {
        KnightTour problem = new KnightTour(7);
        System.out.println(problem.printSolution());
    }
}

// // Java program for Knight Tour problem
// class KnightTour {
// 	static int N = 4;

// 	/* A utility function to check if i,j are
// 	valid indexes for N*N chessboard */
// 	static boolean isSafe(int x, int y, int sol[][])
// 	{
// 		return (x >= 0 && x < N && y >= 0 && y < N
// 				&& sol[x][y] == -1);
// 	}

// 	/* A utility function to print solution
// 	matrix sol[N][N] */
// 	static void printSolution(int sol[][])
// 	{
// 		for (int x = 0; x < N; x++) {
// 			for (int y = 0; y < N; y++)
// 				System.out.print(sol[x][y] + " ");
// 			System.out.println();
// 		}
// 	}

// 	/* This function solves the Knight Tour problem
// 	using Backtracking. This function mainly
// 	uses solveKTUtil() to solve the problem. It
// 	returns false if no complete tour is possible,
// 	otherwise return true and prints the tour.
// 	Please note that there may be more than one
// 	solutions, this function prints one of the
// 	feasible solutions. */
// 	static boolean solveKT()
// 	{
// 		int sol[][] = new int[N][N];

// 		/* Initialization of solution matrix */
// 		for (int x = 0; x < N; x++)
// 			for (int y = 0; y < N; y++)
// 				sol[x][y] = -1;

// 		/* xMove[] and yMove[] define next move of Knight.
// 		xMove[] is for next value of x coordinate
// 		yMove[] is for next value of y coordinate */
// 		int xMove[] = { 2, 1, -1, -2, -2, -1, 1, 2 };
// 		int yMove[] = { 1, 2, 2, 1, -1, -2, -2, -1 };

// 		// Since the Knight is initially at the first block
// 		sol[0][0] = 0;

// 		/* Start from 0,0 and explore all tours using
// 		solveKTUtil() */
// 		if (!solveKTUtil(0, 0, 1, sol, xMove, yMove)) {
// 			System.out.println("Solution does not exist");
// 			return false;
// 		}
// 		else
// 			printSolution(sol);

// 		return true;
// 	}

// 	/* A recursive utility function to solve Knight
// 	Tour problem */
// 	static boolean solveKTUtil(int x, int y, int movei,
// 							int sol[][], int xMove[],
// 							int yMove[])
// 	{
// 		int k, next_x, next_y;
// 		if (movei == N * N)
// 			return true;

// 		/* Try all next moves from the current coordinate
// 			x, y */
// 		for (k = 0; k < 8; k++) {
// 			next_x = x + xMove[k];
// 			next_y = y + yMove[k];
// 			if (isSafe(next_x, next_y, sol)) {
// 				sol[next_x][next_y] = movei;
// 				if (solveKTUtil(next_x, next_y, movei + 1,
// 								sol, xMove, yMove))
// 					return true;
// 				else
// 					sol[next_x][next_y]
// 						= -1; // backtracking
// 			}
// 		}

// 		return false;
// 	}

// 	/* Driver Code */
// 	public static void main(String args[])
// 	{
// 		// Function Call
// 		solveKT();
// 	}
// }
// // This code is contributed by Abhishek Shankhadhar
