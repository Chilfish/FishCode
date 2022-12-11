#include "Graph.hpp"
#include <fstream>

int main() {
  std::ifstream fin("D:/Gits/FishCode/CPP/graph.txt");
  Graph g(fin);

  cout << "---original graph---\n" << g << endl;

  cout << "the path from 0 to other (use DFS):\n";
  DfsPath path(g, 0);
  path.printAllPath(g);

  g.addVertex();
  g.addEdge(4, 10);
  g.removeVertex(9);
  g.removeEdge(6, 7);

  cout << "\n---after modify---\n" << g << endl;

  cout << "vertex between 5 and 6 has edge? "
    << std::boolalpha << g.hasE(5, 6) << endl
    << "is there vertex 4? " << g.hasV(10) << endl;

  cout << "\nthe path from 0 to other (use BFS):\n";
  BFSPath bp(g, 0);
  bp.printAllPath(g);
}