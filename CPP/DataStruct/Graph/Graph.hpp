#pragma once

#include <iostream>
#include <cassert>
#include <vector>
#include <queue>
#include <algorithm>

using std::cout, std::cin, std::endl;
using std::vector, std::queue;
using std::find;

#define all(s) s.begin(),s.end()
using Arr = vector<int>;
using adjArr = vector<Arr>;
using visArr = vector<bool>;

class Graph {
private:
  int E, V;
  int index;
  adjArr adj;

  void init(int V) {
    this->V = V;
    this->E = 0;
    this->index = V;
    this->adj.resize(V);
  }

public:
  Graph(int V) { init(V); }

  Graph(std::istream &in = cin) {
    int V, E;
    in >> V >> E;
    init(V);

    for (int i = 0; i < E; ++i) {
      int v, w;
      in >> v >> w;
      addEdge(v, w);
    }
  }

  Graph(Graph &&g):V{g.V}, E{g.E}, index{g.index},
    adj{g.adj} {
    g.E = g.V = g.index = 0;
    g.adj.~vector();
  }

  Graph(const Graph &g) {
    init(g.V);
    for (int v = 0; v < g.V; ++v)
      for (int w : g.adj[v])
        addEdge(v, w);
  }

  void addEdge(int v, int w) {
    assert(hasV(v, true)), assert(hasV(w, true));
    // 不允许有平行边和自环
    if (v == w ||
      adj[v].end() != find(all(adj[v]), w))
      return;

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
    adj.push_back(Arr());
    ++V, ++index;
  }

  void removeVertex(int v) {
    assert(hasV(v));
    for (int i = 0; i < V; ++i) {
      auto it = find(all(adj[i]), v);
      if (it != adj[i].end())
        adj[i].erase(it);
    }
    adj[v].clear();
    --V;
  }

  bool hasV(int v, bool add = false) const {
    if ((v < 0 || v >= index) || (!adj[v].size() && !add)) {
      cout << "\033[31m" << "\nerror! " << "\033[0m"
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
    return adj[v];
  }
  int getE() const { return E; }
  int getV() const { return V; }
  int getIndex() const { return index; }

  friend std::ostream &operator<<(std::ostream &out, const Graph &g) {
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