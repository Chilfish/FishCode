#include "Tree.hpp"
#include "CBT.hpp"
#include "BST.hpp"
using namespace std;

// g++ main.cpp -o ..\..\out\main; ..\..\out\main

int pre[]{1, 2, 4, 7, 3, 5, 8, 9, 6};
int in[]{4, 7, 2, 1, 8, 5, 9, 3, 6};
int post[]{7, 4, 2, 8, 9, 5, 6, 3, 1};
const int len = 9;

void tree() {
  Tree<int> tt, a, p;
  // tt.buildPreIn(pre, in, len);
  tt.buildPostIn(post, in, len);
  tt.preOrder(); tt.preStack();
  tt.inOrder(); tt.inStack();
  tt.levelOrder();
  tt.postOrder(); tt.postStack();

  a.copy(tt); // a 为 tt 的深拷贝
  a.preOrder();
  cout << "\na == tt? " << a.equal(tt) << endl;

  Tree<int> bb = a, c(tt);
  bb.preOrder();

  p.buildPostIn(post, in, len);
  p.preOrder();

  a.preStack();
  a.modify(4, 44); // 将节点4的值修改为44
  a.modify(34, 233); // 将节点34的值修改为233
  a.insert(44, 233, 0); // 在节点44的右节点插入233

  Tree<int> b;
  int preB[]{10, 11, 12}, inB[]{11, 10, 12};
  b.buildPreIn(preB, inB, 3);
  // b.preOrder();

  a.insert(6, b); // 插入一棵子树
  a.remove(6); // 删除根节点为6的子树
  a.preOrder();
}

void Complete_Binary_Tree() {
  CBT<int> t;
  int arr[]{1, 2, 3, 4, 5, 6, 7};
  t.buildArr(arr, 7);

  // int pre[]{1, 2};
  // int in[]{1, 2};
  // t.buildPreIn(pre, in, 2);
  // t.buildPreInput();
  t.preStack();
  t.remove(3);
  t.inStack();
  t.levelOrder();
  cout << t.isCBT();
}

void Binary_Search_Tree() {
  BST<int> t, a;
  // t.buildPreIn(pre, in, len); 
  for (int i = 0; i < len; ++i) {
    t.insert(in[i]);
  }
  // t.insert(1);
  t.preOrder();
  // t.remove(4);
  // t.inOrder();
  // t.modify(5, 10);
  t.inOrder();

  // cout << a.empty() << endl;

  // cout << t.find(5) << endl;
  cout << t.prev(7) << endl;

  cout << "\nheight: " << t.height()
    << "\nMax data: " << t.max()
    << "\nMin data: " << t.min() << endl;
}

int main() {
  // 1 2 -1 3 -1 -1 4 5 -1 -1 -1
  // 1 2 -1 3 4 -1 -1 -1 5 -1 6 7 -1 -1 8 -1 -1
  tree();
  // Complete_Binary_Tree();
  // Binary_Search_Tree();
  return 0;
}