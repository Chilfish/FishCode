#pragma once
#include "Tree.hpp"

/**
* @brief Binary Search Tree
*/
template<class T> class BST : public Tree<T> {
private:
  using Node = BNode<T>;

  Node *find(Node *tree, const T &x) {
    if (tree == nullptr)
      return nullptr;
    if (x < tree->data)
      return find(tree->left, x);
    if (x > tree->data)
      return find(tree->right, x);
    return tree;
  }

  Node *find0(Node *tree, const T &x) {
    while (tree != nullptr && tree->data != x) {
      if (x < tree->data)
        tree = tree->left;
      else if (x > tree->data)
        tree = tree->right;
    }
    return tree;
  }

  Node *findPar(Node *tree, const T &x) {
    if (tree == nullptr ||
      (tree->left != nullptr && tree->left->data == x) ||
      (tree->right != nullptr && tree->right->data == x)) {
      return tree;
    }
    if (x < tree->data)
      return findPar(tree->left, x);
    if (x > tree->data)
      return findPar(tree->right, x);
    return tree;
  }

  void insert(Node *&tree, const T &x) {
    if (tree == nullptr) {
      tree = new Node(x);
    } else if (x < tree->data) {
      insert(tree->left, x);
    } else if (x > tree->data) {
      insert(tree->right, x);
    } else;
  }

  Node *remove(Node *&tree, const T &x) {
    if (tree == nullptr) return nullptr;
    if (x < tree->data) {
      remove(tree->left, x);
    } else if (x > tree->data) {
      remove(tree->right, x);
    } else if (tree->left != nullptr && tree->right != nullptr) {
      tree->data = min(tree->right)->data;
      remove(tree->right, tree->data);
    } else {
      Node *old = tree;
      tree = (tree->left != nullptr
        ? tree->left
        : tree->right);
      delete old; old = nullptr;
      --this->len;
    }
    return tree;
  }

  Node *max(Node *tree) {
    if (tree != nullptr)
      while (tree->right != nullptr) {
        tree = tree->right;
      }
    return tree;
  }

  Node *min(Node *tree) {
    if (tree != nullptr)
      while (tree->left != nullptr) {
        tree = tree->left;
      }
    return tree;
  }

  Node *next(Node *tree, const T &x) {
    if (tree->right != nullptr) {
      return min(tree->right);
    }

    return nullptr;
  }

  Node *prev(Node *tree, Node *node) {
    if (tree->left != nullptr) {
      return max(tree->left);
    }
  }

public:
  bool find(const T &x) {
    if (find0(this->root, x) == nullptr) {
      return false;
    }
    return true;
  }

  void insert(const T &x) {
    if (this->len == 0) {
      this->root->data = x;
    } else {
      insert(this->root, x);
    }
    ++this->len;
  }

  bool remove(const T &x) {
    return remove(this->root, x) == nullptr
      ? false : true;
  }

  T max() {
    return max(this->root)->data;
  }

  T min() {
    return min(this->root)->data;
  }

  bool modify(const T &node, const T &x) {
    if (remove(node) == false) {
      return false;
    }
    insert(x);
    return true;
  }

  T next(const T &x) {
    return next(this->root, x)->data;
  }

  T prev(const T &x) {
    // return prev(this->root, )
  }
};