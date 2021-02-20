
class NQuenn:
    def __init__(self, n):
        self.n = n
        self.board = [[False for j in range(n)] for i in range(n)]
    
    def is_valid(self):
        # row check
        for i in range(self.n):
            num_of_node = 0
            for j in range(self.n):
                num_of_node += 1 if self.board[i][j] else 0
                # print(num_of_node)
            if num_of_node > 1:
                return False
        
        # col check
        for j in range(self.n):
            num_of_node = 0
            for i in range(self.n):
                num_of_node += 1 if self.board[i][j] else 0
            if num_of_node > 1:
                return False

        # left diagonal check
        num_of_node = 0
        for i in range(self.n):
            num_of_node += 1 if self.board[i][i] else 0
        if num_of_node > 1:
            return False
        
        # right diagonal check
        num_of_node = 0
        for i in range(self.n):
            num_of_node += 1 if self.board[i][(self.n - 1) - i] else 0
        if num_of_node > 1:
            return False

        # right cross check 
        for i in range(self.n - 1):
            for j in range(self.n - 1):
                if self.board[i][j] and self.board[i+1][j+1]:
                    return False

        # left cross check
        for i in range(self.n - 1):
            for j in range(self.n - 1, 0, -1):
                if self.board[i][j] and self.board[i+1][j-1]:
                    return False
        
        return True

    
    def solve(self, row):
        if row >= self.n:
            return True
        
        for col in range(self.n):
            self.board[row][col] = True
            if self.is_valid():
                if self.solve(row + 1):
                    return True
            
            self.board[row][col] = False

        return False

    def print_solution(self):
        if self.solve(0):
            s = ""
            for i in range(self.n):
                for j in range(self.n):
                    s += (str(1) if self.board[i][j] else str(0)) + " "
                s += "\n"
            return s

        return "no solution"

    
if __name__ == "__main__":
    problem = NQuenn(5)
    print(problem.print_solution())
    





        
    
