#pragma once
#include "Tree.hpp"

/**
* @brief Complete Binary Tree
*/
template<class T> class CBT :public Tree<T> {
private:
  using Node = BNode<T>;

  queue<Node *> q;

  Node *insert(Node *&node) {
    Node *p = q.front();
    if (p->left == nullptr) {
      p->left = node;
    } else if (p->right == nullptr) {
      p->right = node;
    } else {
      q.pop();
      insert(node);
    }
    return node;
  }

public:
  ~CBT() {
    cout << "\n----析构时的队列----\n";
    while (!q.empty()) {
      cout << q.front()->data << " ";
      q.pop();
    }
  }

  void buildArr(T arr[], int len) {
    for (int i = 0; i < len; ++i) {
      insert(arr[i]);
    }
  }
  void insert(const T &x) {
    ++this->len;
    Node *p = new Node(x);
    q.push(p);
    if (q.size() == 1) {
      this->root = p;
    } else {
      insert(p);
    }
  }
  void remove(const T &x) {
    cout << "hh";
  }
};