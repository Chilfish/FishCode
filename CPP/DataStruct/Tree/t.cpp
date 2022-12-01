#include "../STL.hpp"
#include "Tree.hpp"

template<class T = int> class tree :public Tree<T> {
public:
  using Node = BNode<T>;
  Node *build(int arr[], int l, int r) {
    if (r < l) return nullptr;
    int mid = l + ((r - l) >> 1);

    Node *p = new Node(arr[mid]);
    p->left = build(arr, l, mid - 1);
    p->right = build(arr, mid + 1, r);
    return p;
  }
  void build(int arr[], int len) {
    sort(arr, arr + len);
    this->root = build(arr, 0, len - 1);
    this->len = len;
  }
};

int main() {
  int arr[]{1, 3, 5, 6, 7, 8, 12, 32};
  int len = 8;

  tree t;
  t.build(arr, len);
  t.inOrder();
  cout << t.isCBT();
  return 0;
}