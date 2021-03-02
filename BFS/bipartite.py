class Node():
    def __init__(self, state, parent, action, group):
        self.state = state
        self.parent = parent
        self.action = action
        self.group = group


class StackFrontier():
    def __init__(self):
        self.frontier = []

    def add(self, node):
        self.frontier.append(node)

    def contains_state(self, state):
        return any(node.state == state for node in self.frontier)

    def empty(self):
        return len(self.frontier) == 0

    def remove(self):
        if self.empty():
            raise Exception("empty frontier")
        else:
            node = self.frontier[-1]
            self.frontier = self.frontier[:-1]
            return node


class QueueFrontier(StackFrontier):

    def remove(self):
        if self.empty():
            raise Exception("empty frontier")
        else:
            node = self.frontier[0]
            self.frontier = self.frontier[1:]
            return node

''' checking if graph is bipartite and connected '''
class BipartiteGraph:
    ''' 
    graph represented by ke value pair
    'A' : ['B', 'C'] << A connected to B and C
    '''
    def __init__(self, graph):
        self.graph = graph
        self.groups = {"u":set(), "v":set()}
    
    def solve(self, start):
        ''' graph is represented with dictionary '''
        if type(self.graph) != dict:
            raise Exception("it is not a graph")

        ''' start with any node in graph '''
        if start not in self.graph.keys():
            raise Exception(f"there is no node {start} in graph")

        ''' initial state '''
        node = Node(start, None, None, 'u')
        frontier = QueueFrontier()
        frontier.add(node)
            

        # ''' initial state '''
        # node = Node(start, None, None, 'u')
        # frontier = QueueFrontier()
        # frontier.add(node)

        while True:
            ''' no solution if frontier empty '''
            if frontier.empty():
                raise Exception("not bipartite graph")
            
            ''' dequeue the first node in frontier '''
            node = frontier.remove()
            print(node.state)
            ''' add to spesific set (u/v) '''
            self.groups[node.group].add(node.state)
            print(f'{node.group} --> {self.groups[node.group]}')
            ''' 
            graph is connected and bipartite if sum of set u and v = the number of nodes in the graph 
            every node has been visited
            '''
            if len(self.groups['u']) + len(self.groups['v']) == len(self.graph) and frontier.empty():
                return 'bipartite graph'
            
            ''' traverse all node's neighbours '''
            for neighbours in self.graph[node.state]:
                ''' graph is not bipartite if in the same set with the adjacent node '''
                if neighbours in self.groups[node.group]:
                    return 'not bipartite graph'
                ''' don add to frontier if neighbours either in set u or set v '''
                if neighbours in self.groups['v'] or neighbours in self.groups['u']:
                    continue
                
                ''' create new node and add it to frontier '''
                new_node = Node(neighbours, None, None, 'v' if node.group == 'u' else 'u')
                frontier.add(new_node)

def main():
    graph = {"a"}
    bipartite = BipartiteGraph(graph)
    print(bipartite.solve('a'))

if __name__ == "__main__":
    main()