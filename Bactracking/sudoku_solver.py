
class Sudoku:
    def __init__(self, board):
        self.board = board
        self.empty_cells = [(i, j) for i in range(9) for j in range(9) if self.board[i][j] == 0]

    def is_valid(self):
        # check row
        for i in range(9):
            cell_num = set()
            for j in range(9):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('row')
                    return False
                cell_num.add(self.board[i][j])
        
        # check column
        for j in range(9):
            cell_num = set()
            for i in range(9):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('column')
                    return False
                cell_num.add(self.board[i][j])
        
        # check 3 X 3 box1
        cell_num = set()
        for i in range(3):
            for j in range(3):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('box 1')
                    return False
                cell_num.add(self.board[i][j])
        # check 3 X 3 box2
        cell_num = set()
        for i in range(3):
            for j in range(3, 6):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('box 2')
                    return False
                cell_num.add(self.board[i][j])
        # check 3 X 3 box3
        cell_num = set()
        for i in range(3):
            for j in range(6, 9):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('box 3')
                    return False
                cell_num.add(self.board[i][j])
        # check 3 X 3 box4
        cell_num = set()
        for i in range(3, 6):
            for j in range(3):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('box 4')
                    return False
                cell_num.add(self.board[i][j])
        # check 3 X 3 box5
        cell_num = set()
        for i in range(3, 6):
            for j in range(3, 6):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('box 5')
                    return False
                cell_num.add(self.board[i][j])
        # check 3 X 3 box6
        cell_num = set()
        for i in range(3, 6):
            for j in range(6, 9):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('box 6')
                    return False
                cell_num.add(self.board[i][j])
        # check 3 X 3 box7
        cell_num = set()
        for i in range(6, 9):
            for j in range(3):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('box 7')
                    return False
                cell_num.add(self.board[i][j])
        # check 3 X 3 box8
        cell_num = set()
        for i in range(6, 9):
            for j in range(3, 6):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('box 8')
                    return False
                cell_num.add(self.board[i][j])
        # check 3 X 3 box9
        cell_num = set()
        for i in range(6, 9):
            for j in range(6, 9):
                if self.board[i][j] in cell_num and self.board[i][j] != 0:
                    # print('box 9')
                    return False
                cell_num.add(self.board[i][j])
        
        return True
    
    def solve(self, i):
        if i >= len(self.empty_cells):
            return True
        
        for value in range(1, 10):
            row, col = self.empty_cells[i]
            # print(self.board[row][col])
            self.board[row][col] = value
            # print(self.board[row][col])
            # print(self.is_valid())
            
            if self.is_valid():
                if self.solve(i+1):
                    return True
            
            self.board[row][col] = 0
        
        return False
    
    def print_solution(self):
        if self.solve(0):
            s = ''
            for i in range(9):
                for j in range(9):
                    s += str(self.board[i][j]) + " "
                s += '\n'
            return s
        return 'no solution'
    
if __name__ == '__main__':
    board = [
        [0, 0, 9, 4, 0, 0, 0, 6, 8],
        [8, 0, 6, 9, 0, 5, 3, 0, 2],
        [5, 0, 2, 0, 8, 3, 0, 9, 7],
        [0, 0, 0, 0, 0, 0, 6, 0, 0],
        [0, 8, 0, 7, 0, 4, 0, 0, 0],
        [6, 2, 1, 5, 9, 0, 7, 3, 0],
        [0, 0, 3, 0, 0, 1, 9, 2, 0],
        [0, 0, 0, 0, 4, 0, 8, 5, 0],
        [0, 1, 0, 0, 5, 6, 4, 0, 0]
    ]
    sudoku = Sudoku(board)
    print(sudoku.print_solution())