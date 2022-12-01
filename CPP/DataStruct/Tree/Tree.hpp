#pragma once

#include <iostream>
#include <stack>
#include <queue>
#include <algorithm>
using std::swap;
using std::queue;
using std::stack;
using std::cin;
using std::cout;
using std::endl;

// 二叉树节点定义
template<class T> struct BNode {
  T data;
  BNode *left;
  BNode *right;

  BNode(const T &x = T{}, BNode *l = nullptr, BNode *r = nullptr) :
    data{x}, left{l}, right{r} {}
};

template<class T> class Tree {
protected:
  using Node = BNode<T>;

  Node *root;
  int len;

  void buildPreInput(Node *&tree, const T &stopNode) {
    T x;
    cin >> x;
    if (x == stopNode) {
      tree = nullptr;
      return;
    }
    ++len;
    tree = new Node(x);
    buildPreInput(tree->left);
    buildPreInput(tree->right);
  }

  void buildPreIn(T pre[], T in[], int l, int r, Node *&tree) {
    static int t = 0;

    int flag = -1;
    for (int i = l; i <= r; ++i)
      if (in[i] == pre[t]) {
        flag = i; break;
      }
    if (flag == -1) return;

    tree = new Node(pre[t++]);
    // 分治
    if (l < r) {
      buildPreIn(pre, in, l, flag - 1, tree->left);
      buildPreIn(pre, in, flag + 1, r, tree->right);
    }
  }

  void buildPostIn(T post[], T in[], int l, int r, Node *&tree) {
    static int t = this->len - 1;

    int flag = -1;
    for (int i = l; i <= r; ++i)
      if (in[i] == post[t]) {
        flag = i; break;
      }
    if (flag == -1) return;

    tree = new Node(post[t--]);
    // 反过来了，根右左
    if (l < r) {
      buildPostIn(post, in, flag + 1, r, tree->right);
      buildPostIn(post, in, l, flag - 1, tree->left);
    }
  }

  void preOrder(Node *tree) {
    if (tree == nullptr) return;
    cout << tree->data << " ";
    preOrder(tree->left);
    preOrder(tree->right);
  }

  void preStack0(Node *tree) {
    stack<Node *> s;
    Node *p = tree;
    // 直到遍历完树且栈中无节点为止
    while (!(p == nullptr && s.empty())) {
      // 向左边深入，直到左叶子
      // 入栈是为了记录深入过程中的 根节点
      while (p != nullptr) {
        // 输出根节点
        cout << p->data << " ";
        s.push(p);
        p = p->left;
      }
      // 出栈是回退到上一个节点，然后向右边深入
      if (!s.empty()) {
        p = s.top();
        s.pop();
        p = p->right;
      }
    }
  }

  void preStack1(Node *tree) {
    Node *p = tree;
    stack<Node *>s; s.push(p);
    while (!s.empty()) {
      p = s.top(); s.pop();
      cout << p->data << " ";
      // 栈的特性，先压右子树才能先访问到左子树
      if (p->right != nullptr) {
        s.push(p->right);
      }
      if (p->left != nullptr) {
        s.push(p->left);
      }
    }
  }

  void preStack(Node *tree) {
    stack<Node *> s; s.push(nullptr);
    while (!s.empty()) {
      cout << tree->data << " ";

      // 栈的特性，先将右子树压栈，才能向上回溯
      if (tree->right != nullptr) {
        s.push(tree->right);
      }
      // 向左边深入直到空
      if (tree->left != nullptr) {
        tree = tree->left;
      } else { // 左子树空则向右深入
        tree = s.top();
        s.pop();
      }
    }
  }

  void inOrder(Node *tree) {
    if (tree == nullptr) return;
    inOrder(tree->left);
    cout << tree->data << " ";
    inOrder(tree->right);
  }

  void inStack(Node *tree) {
    stack<Node *> s;
    Node *p = tree;
    while (!(p == nullptr && s.empty())) {
      // 先深入到左叶子
      // 与前序遍历不同的是，深入到左叶子再输出
      // 而不是边深入边输出根节点
      while (p != nullptr) {
        s.push(p);
        p = p->left;
      }
      if (!s.empty()) {
        // 弹出左节点或是说该叶子节点，然后向右深入
        p = s.top();
        cout << p->data << " ";
        s.pop();
        p = p->right;
      }
    }
  }

  void postOrder(Node *tree) {
    if (tree == nullptr) return;
    postOrder(tree->left);
    postOrder(tree->right);
    cout << tree->data << " ";
  }

  void postStack(Node *tree) {
    if (tree == nullptr) return;
    stack<Node *> s;
    Node *cur, *pre = nullptr;
    s.push(tree);

    while (!s.empty()) {
      cur = s.top();
      // 深入到叶子节点时就可以输出了
      if (leaf(cur)
        // 或者非叶子节点，但已访问过左节点，轮到右节点了
        // 就要记录下上一个访问的节点
        || (pre != nullptr && // 排除掉第一次
          (pre == cur->left || pre == cur->right))) {
        cout << cur->data << " ";
        s.pop();
        pre = cur;
      } else {
        // 基于栈，所以先入右边才能让左节点先被访问
        if (cur->right != nullptr)
          s.push(cur->right);
        if (cur->left != nullptr)
          s.push(cur->left);
      }
    }
  }

  void levelOrder(Node *tree) {
    if (tree == nullptr) return;
    queue<Node *> q;
    Node *p = tree;
    q.push(p);

    while (!q.empty()) {
      cout << p->data << " ";
      if (p->left != nullptr)
        q.push(p->left);
      if (p->right != nullptr)
        q.push(p->right);
      q.pop(); p = q.front();
    }
  }

  bool isCBT(Node *tree) {
    if (tree == nullptr) return true;
    queue<Node *> q;
    Node *p = tree; q.push(p);
    while (!q.empty()) {
      bool r = false;
      // 左无右有、上一个无右但当前却有左
      if ((p->left == nullptr && p->right != nullptr)
        || (r && p->left != nullptr)) {
        return false;
      }
      if (p->left != nullptr)
        q.push(p->left);
      if (p->right != nullptr)
        q.push(p->right), r = true;
      q.pop(), p = q.front();
    }
    return true;
  }

  void destroy(Node *&tree) {
    if (tree == nullptr) return;
    destroy(tree->left);
    destroy(tree->right);
    --len;
    delete tree; tree = nullptr;
  }

  Node *copy(Node *tree) {
    if (tree == nullptr)
      return nullptr;
    return new Node(tree->data, copy(tree->left), copy(tree->right));
  }

  bool equal(Node *a, Node *b) {
    if (a == nullptr && b == nullptr)
      return true;

    if (a != nullptr && b != nullptr &&
      a->data == b->data &&
      equal(a->left, b->left) &&
      equal(a->right, b->right)) {
      return true;
    }
    return false;
  }

  void reverse(Node *tree) {
    if (tree == nullptr) return;
    swap(tree->left, tree->right);
    reverse(tree->left);
    reverse(tree->right);
  }

  Node *find(Node *tree, const T &x) {
    if (tree == nullptr || tree->data == x) {
      return tree;
    }

    // for C++ 17
    if (Node *p = find(tree->left, x); p != nullptr) {
      return p;
    } else {
      return find(tree->right, x);
    }
  }

  Node *findPar(Node *tree, const T &x) {
    if (tree == nullptr ||
      (tree->left != nullptr && tree->left->data == x) ||
      (tree->right != nullptr && tree->right->data == x)) {
      return tree;
    }

    if (Node *p = findPar(tree->left, x); p != nullptr) {
      return p;
    } else {
      return findPar(tree->right, x);
    }
  }

  bool modify(Node *tree, const T &node, const T &x) {
    Node *p = find(tree, node);
    if (p == nullptr)
      return false;
    p->data = x;
    return true;
  }

  bool exist(Node *p, bool l) {
    if (p == nullptr ||
      (p->left != nullptr && l) ||
      (p->right != nullptr && !l)) {
      cout << "\n----没有这个节点，或已有左右子树----\n";
      return true;
    }
    return false;
  }

  bool insert(Node *tree, const T &node, const T &x, bool l) {
    Node *p = find(tree, node);
    if (exist(p, l)) {
      return false;
    }

    Node *newNode = new Node(x);
    if (l) p->left = newNode;
    else p->right = newNode;
    return true;
  }

  bool insert(Node *tree, const T &node, Node *x, bool l) {
    Node *p = find(tree, node);
    if (exist(p, l)) {
      return false;
    }
    Node *newNode = copy(x);

    if (l) p->left = newNode;
    else p->right = newNode;
    return true;
  }

  bool remove(Node *&tree, const T &node) {
    Node *p = findPar(tree, node);
    if (p == nullptr || leaf(p)) {
      return false;
    }
    if (node == p->left->data) {
      destroy(p->left);
    } else {
      destroy(p->right);
    }
    return true;
  }

  int height(Node *tree) {
    if (tree == nullptr) { return 0; }
    int l = height(tree->left);
    int r = height(tree->right);
    return (l > r ? l : r) + 1;
  }

  bool empty(Node *tree) { return leaf(tree); }

  bool leaf(Node *tree) {
    return tree->left == nullptr &&
      tree->right == nullptr;
  }

public:
  explicit Tree() : len{0} {
    root = new Node;
  }
  Tree(const Tree &t) : len{t.len} {
    root = new Node;
    root = copy(t.root);
  }
  Tree(Tree &&t) :len{t.len}, root{t.root} {
    t.root = nullptr; t.len = 0;
  }
  Tree &operator=(const Tree &t) {
    Tree c = t;
    swap(*this, c);
    return *this;
  }
  Tree &operator=(Tree &&t) {
    swap(len, t.len);
    swap(root, t.root);
    return *this;
  }
  ~Tree() {
    destroy();
    delete root;
  }

  //树节点的个数
  int size() const { return len; }

  // 树的高度
  int height() { return height(root); }

  // 销毁整棵树
  void destroy() { destroy(root); }

  // 深拷贝一棵树
  void copy(const Tree &t) {
    this->root = copy(t.root);
    this->len = t.len;
  }

  // 反转一棵树
  void reverse() {
    cout << "\n----翻转二叉树----\n";
    reverse(root);
  }

  // 判断两棵树是否相等
  bool equal(const Tree &t) {
    return equal(this->root, t.root);
  }

  // 查找树中的节点是否存在
  bool find(const T &x) {
    if (find(this->root, x) == nullptr) {
      return false;
    }
    return true;
  }


  /**
  * @brief 将 x 修改为 value
  */
  void modify(const T &x, const T &value) {
    if (modify(root, x, value) == false) {
      cout << "\n----没有这个节点----\n";
    }
  }

  /**
  * @brief 插入值
  * @param node 被插入的节点
  * @param x 要插入的值
  * @param l 插入的位置，默认为左节点，0为右节点
  */
  void insert(const T &node, const T &x, bool l = true) {
    insert(root, node, x, l);
    ++len;
  }

  /**
  * @brief 插入子树
  * @param node 被插入的节点
  * @param x 要插入的子树
  * @param 插入的位置，默认为左节点，0为右节点
  */
  void insert(const T &node, const Tree &x, bool l = true) {
    insert(root, node, x.root, l);
    len += x.len;
  }

  // 删除节点
  void remove(const T &node) {
    if (remove(root, node) == false) {
      cout << "\n----没有这个节点----\n";
    }
  }

  // 
  bool isCBT() {
    cout << "\n----判断是否是完全二叉树----\n";
    return isCBT(root);
  }

  bool empty() {
    return empty(root);
  }

  /**
  * @brief 带空节点标记的先序遍历创建二叉树（输入流）
  * @param stopNode 必须指定空节点的条件，与树中的数据类型相同，如 #、-1
  */
  void buildPreInput(const T &stopNode) {
    cout << "\n----带空节点标记的先序遍历创建二叉树（输入流）----\n";
    buildPreInput(root, stopNode);
  }

  // 先序遍历和中序遍历构造二叉树
  void buildPreIn(T pre[], T in[], int len) {
    cout << "\n----先序遍历和中序遍历构造二叉树----\n";
    this->len = len;
    buildPreIn(pre, in, 0, len - 1, root);
  }

  // 后序遍历和中序遍历构造二叉树
  void buildPostIn(T post[], T in[], int len) {
    cout << "\n-----后序遍历和中序遍历构造二叉树----\n";
    this->len = len;
    buildPostIn(post, in, 0, len - 1, root);
  }

  // 先序遍历输出
  void preOrder() {
    cout << "\n----先序遍历输出-----\n";
    printf("node count: %d, height: %d\ndata: ", size(), height());
    preOrder(root);
    cout << endl;
  }

  // 非递归先序遍历输出
  void preStack() {
    cout << "\n----非递归先序遍历输出----\n";
    printf("node count: %d, height: %d\ndata: ", size(), height());
    preStack(root);
    cout << endl;
  }

  // 中序遍历输出
  void inOrder() {
    cout << "\n----中序遍历输出----\n";
    printf("node count: %d, height: %d\ndata: ", size(), height());
    inOrder(root);
    cout << endl;
  }

  // 非递归中序遍历输出
  void inStack() {
    cout << "\n----非递归中序遍历输出----\n";
    printf("node count: %d, height: %d\ndata: ", size(), height());
    inStack(root);
    cout << endl;
  }

  // 后序遍历输出
  void postOrder() {
    cout << "\n----后序遍历输出----\n";
    printf("node count: %d, height: %d\ndata: ", size(), height());
    postOrder(root);
    cout << endl;
  }

  // 非递归后序遍历输出
  void postStack() {
    cout << "\n----非递归后序遍历输出----\n";
    printf("node count: %d, height: %d\ndata: ", size(), height());
    postStack(root);
    cout << endl;
  }

  // 层次遍历输出
  void levelOrder() {
    cout << "\n----层次遍历输出----\n";
    printf("node count: %d, height: %d\ndata: ", size(), height());
    levelOrder(root);
    cout << endl;
  }
};
