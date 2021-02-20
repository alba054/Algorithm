
class RatMaze:
    def __init__(self, maze):
        self.maze = maze
        self.solution = []
        
    def is_valid(self, rat_pos):
        x_rat, y_rat = rat_pos

        if (0 <= x_rat < len(self.maze)) and (0 <= y_rat < len(self.maze[0])) and self.maze[x_rat][y_rat] != "#":
            return True
        
        return False
    
    def solve(self, rat_pos, visited=set()):
        if rat_pos == (len(self.maze) - 1, len(self.maze[0]) - 1):
            return True
        
        actions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        visited.add(rat_pos)
        for action in actions:
            x_act, y_act = action
            x_rat, y_rat = rat_pos
            print(rat_pos)
            rat_pos = (x_act+x_rat, y_act+y_rat)
            print(rat_pos)
            print(self.is_valid(rat_pos))
            print()
            self.solution.append(rat_pos)
            if self.is_valid(rat_pos) and rat_pos not in visited:
                if self.solve(rat_pos, visited):
                    return True
            
            self.solution.pop()
            rat_pos = (x_rat, y_rat)
        
        return False
    
    def print_solution(self):
        if self.solve((0, 0)):
            s = ""
            for x, y in self.solution:
                self.maze[x][y] = 1
            
            for i in range(len(self.maze)):
                for j in range(len(self.maze[0])):
                    s += str(self.maze[i][j]) + " "
                s += "\n"
            
            return s
        return "no solution"
    
if __name__ == "__main__":
    maze = [
        ['A', 0, "#"],
        [0, "#", "#"],
        [0, 0, 'B']   
    ]

    problem = RatMaze(maze)
    print(problem.print_solution())