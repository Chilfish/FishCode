#include <bits/stdc++.h>
using namespace std;

#define all(s) s.begin(), s.end()
using Arr = vector<int>;
using adjArr = vector<Arr>;
using visArr = vector<bool>;

// 当表中只有-1时，表示该顶点没有出度
#define NON_OUT -1

class Graph {
protected:
  int E, V;
  int index; // 总共添加了多少顶点
  adjArr adj;

  void init(int V) {
    this->V = V;
    this->E = 0;
    this->index = V;
    for (int i = 0; i < V; ++i)
      this->adj.push_back(Arr{NON_OUT});
  }

  void popFront(Arr &arr) {
    if (arr[0] == NON_OUT)
      arr.clear();
  }

public:
  Graph(int V) { init(V); }
  Graph() { init(0); }

  Graph(istream &in) {
    int V, E;
    in >> V >> E;
    init(V);

    for (int i = 0; i < E; ++i) {
      int v, w;
      in >> v >> w;
      addEdge(v, w);
    }
  }

  void addEdge(int v, int w) {
    assert(hasV(v)), assert(hasV(w));

    // 不允许有平行边和自环
    if (v == w ||
      adj[v].end() != find(all(adj[v]), w))
      return;

    popFront(adj[v]), popFront(adj[w]);

    adj[v].push_back(w);
    adj[w].push_back(v);
    ++E;
  }

  void removeEdge(int v, int w) {
    assert(hasE(v, w));

    adj[v].erase(find(all(adj[v]), w));
    adj[w].erase(find(all(adj[w]), v));
    --E;
  }

  void addVertex() {
    adj.push_back(Arr{-1});
    ++V, ++index;
  }

  void removeVertex(int v) {
    assert(hasV(v));
    for (int i = 0; i < V; ++i) {
      auto it = find(all(adj[i]), v);
      if (it != adj[i].end()) {
        if (adj[i].size() == 1)
          adj[i][0] = NON_OUT; // 只有一个出度时，置为-1即可
        else
          adj[i].erase(it);
      }
    }
    adj[v].clear();
    --V;
  }

  bool hasV(int v) const {
    if ((v < 0 || v >= index) || !adj[v].size()) {
      cerr << "\033[31m" << "\nerror! " << "\033[0m"
        << "Do not have vertex " << v << " !\n";
      return false;
    }
    return true;
  }

  bool hasE(int v, int w) const {
    assert(hasV(v)), assert(hasV(w));

    return find(all(adj[v]), w) != adj[v].end();
  }

  Arr getAdj(int v) const {
    assert(hasV(v));
    if (adj[v][0] == NON_OUT)
      return Arr();
    return adj[v];
  }

  int getE() const { return E; }
  int getV() const { return V; }
  int getIndex() const { return index; }

  friend ostream &operator<<(ostream &out, const Graph &g) {
    out << g.V << " vertices, " << g.E << " edges\n";

    for (int v = 0; v < g.index; ++v) {
      out << v << ": ";
      for (int w : g.adj[v])
        out << w << " ";
      out << endl;
    }
    return out;
  }
};

class Digraph:public Graph {
public:
  Digraph(istream &in) {
    int V, E; in >> V >> E;
    init(V);

    for (int i = 0; i < E; ++i) {
      int v, w; in >> v >> w;
      addEdge(v, w);
    }
  }

  void addEdge(int v, int w) {
    assert(hasV(v)), assert(hasV(w));

    popFront(adj[v]);
    adj[v].push_back(w);
    ++E;
  }

  void removeEdge(int v, int w) {
    assert(hasE(v, w));
    adj[v].erase(find(all(adj[v]), w));
    --E;
  }

};

class Path {
protected:
  visArr vis;
  Arr edgeTo;
  int s;

public:
  Path(const Graph &g, int s) {
    vis.resize(g.getV());
    edgeTo.resize(g.getV());
    this->s = s;
  }
  bool hasPathTo(int v) { return vis[v]; }

  Arr pathTo(int v) {
    Arr path;
    if (!hasPathTo(v)) return path;

    while (v != s) {
      path.push_back(v);
      v = edgeTo[v];
    } path.push_back(s);

    reverse(all(path));
    return path;
  }

  void printAllPath(const Graph &g) {
    for (int i = 0; i < g.getIndex(); ++i) {
      if (hasPathTo(i)) {
        cout << "0 to " << i << ": ";
        for (int x : pathTo(i))
          if (x == 0) cout << x;
          else cout << "-" << x;
      } else {
        cout << "no path to vertex " << i << ", or it's non-existent";
      }
      cout << endl;
    }
  }
};

class DfsPath:public Path {
private:
  void dfs(const Graph &g, int v) {
    vis[v] = true;
    for (int w : g.getAdj(v))
      if (!vis[w]) {
        edgeTo[w] = v;
        dfs(g, w);
      }
  }

public:
  DfsPath(const Graph &g, int s): Path{g, s} {
    dfs(g, s);
  }
};

class BFSPath:public Path {
private:
  void bfs(const Graph &g) {
    queue<int> q;
    q.push(s); vis[s] = true;

    while (!q.empty()) {
      int front = q.front(); q.pop();

      for (int i : g.getAdj(front))
        if (!vis[i]) {
          edgeTo[i] = front;
          vis[i] = true;
          q.push(i);
        }
    }
  }

public:
  BFSPath(const Graph &g, int s):Path{g, s} {
    bfs(g);
  }
};

int main() {
  ifstream fin("D:/Gits/FishCode/CPP/graph.txt");
  Digraph g(fin);

  // g.addVertex();
  // g.addEdge(5, 8);
  g.removeVertex(4);
  // g.removeEdge(5, 6);

  cout << g;

  // cout << boolalpha << g.hasE(5, 6) << " ";

  cout << "\nthe path from 0 to other (use DFS):\n";
  DfsPath path(g, 0);
  path.printAllPath(g);

  cout << "\nthe path from 0 to other (use BFS):\n";
  BFSPath bp(g, 0);
  bp.printAllPath(g);
}
