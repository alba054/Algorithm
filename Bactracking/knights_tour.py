
class KnightTour:
    def __init__(self, n):
        self.n = n
        self.board = [['#' for i in range(self.n)] for j in range(self.n)]
        self.board[0][0] = 0
    
    def is_valid(self, knight_move):
        x_knight, y_knight = knight_move
        
        if (0 <= x_knight < self.n) and (0 <= y_knight < self.n) and (self.board[x_knight][y_knight] == "#"):
            return True
        
        return False
    
    def solve(self, knight_move, num=1):
        if num >= (self.n * self.n):
            return True
        actions = [(1, 2), (2, 1), (-1, -2), (-2, -1), (-1, 2), (-2, 1), (2, -1), (1, -2)]
        for action in actions:
            x_knight, y_knight = knight_move
            x_act, y_act = action
            # print(knight_move)
            # print(knight_move, self.board[x_knight][y_knight])
            new_move = (x_knight+x_act, y_knight+y_act)
            # print(knight_move)
            # print(self.is_valid(knight_move))
            # print()
            if self.is_valid(new_move):
                self.board[new_move[0]][new_move[1]] = num
                if self.solve(knight_move=new_move, num=num+1):
                    return True
                # new_move = (x_knight, y_knight)
                self.board[new_move[0]][new_move[1]] = "#"
            # knight_move = (x_knight, y_knight)

        return False
    
    def print_solution(self):
        self.solve((0, 0))
        s = ""
        for i in range(self.n):
            for j in range(self.n):
                s += str(self.board[i][j]) + " "
            s += "\n"
        return s
        # return "no solution"

        
if __name__ == "__main__":
    problem = KnightTour(6)
    print(problem.print_solution())
