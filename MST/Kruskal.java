import java.util.HashSet;

public class Kruskal 
{
    Graph graph;    

    public Kruskal()
    {

    }

    public Kruskal(String nodes[], Edge edges[])
    {
        this.graph = new Graph(edges, nodes);
    }

    public int MST()
    {
        HashSet <String> Vt = new HashSet<>();
        HashSet <HashSet<String>> Et = new HashSet<>();
        int minWeight = 0;
        for(int i = 0; i < this.graph.nodes.length - 1; i++)
        {
            int weight = Integer.MAX_VALUE;
            String nodeA = "", nodeB = "";
            HashSet <String> minEdge = new HashSet<>();
            for(int j = 0; j < this.graph.edges.length ; j++)
            {
                // System.out.println(Et);
                HashSet <String> curEdge = new HashSet<>();
                if(!this.graph.isCycle(this.graph.edges[j], Vt))
                {
                    // System.out.println(this.graph.edges[j].nodeA + " " + this.graph.edges[j].nodeB);
                    curEdge.add(this.graph.edges[j].nodeA);
                    curEdge.add(this.graph.edges[j].nodeB);
                    if(!Et.contains(curEdge))
                    {
                        // System.out.println(curEdge);
                        // Vt.add(this.graph.edges[j].nodeA);
                        // Vt.add(this.graph.edges[j].nodeB);
                        // nodeA = this.graph.edges[j].nodeA;
                        // nodeB = this.graph.edges[j].nodeB;
                        
                        // minEdge = curEdge;
                        // weight = weight > this.graph.edges[j].weight ? this.graph.edges[j].weight:weight;
                        if(this.graph.edges[j].weight < weight)
                        {
                            nodeA = this.graph.edges[j].nodeA;
                            nodeB = this.graph.edges[j].nodeB;
                            weight = this.graph.edges[j].weight;
                            minEdge = curEdge;
                        }
                    }
                }

            }
            Vt.add(nodeA);
            Vt.add(nodeB);
            Et.add(minEdge);
            minWeight += weight;
        }
        System.out.println(Et);
        return minWeight;
    }

    private class Graph
    {
        Edge edges[];
        String nodes[];

        Graph(Edge edges[], String nodes[])
        {
            this.nodes = nodes;
            this.edges = edges;
        }

        boolean isCycle(Edge edge, HashSet <String> Vt)
        {
            if(Vt.contains(edge.nodeA) && Vt.contains(edge.nodeB))
            {
                return true;
            }

            return false;
        }
        
    }

    private class Edge
    {
        String nodeA, nodeB;
        int weight;

        Edge(String nodeA, String nodeB, int weight)
        {
            this.nodeA = nodeA;
            this.nodeB = nodeB;
            this.weight = weight;
        }

    }

    
    public static void main(String[] args) 
    {
        Kruskal algo = new Kruskal();
        String nodes[] = {"a", "b", "c", "d", "e", "f", "g"};
        Edge edge1 = algo.new Edge("a", "c", 1);
        Edge edge2 = algo.new Edge("a", "d", 4);
        Edge edge3 = algo.new Edge("a", "b", 5);
        Edge edge4 = algo.new Edge("b", "f", 6);
        Edge edge5 = algo.new Edge("c", "d", 3);
        Edge edge6 = algo.new Edge("d", "f", 8);
        Edge edge7 = algo.new Edge("e", "f", 7);
        Edge edge8 = algo.new Edge("e", "g", 9);
        Edge edge9 = algo.new Edge("c", "e", 2);
        Edge edges[] = {edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9};
        algo = new Kruskal(nodes, edges);
        System.out.println(algo.MST());
    }
}
