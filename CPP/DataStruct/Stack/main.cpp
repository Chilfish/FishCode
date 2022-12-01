#include <iostream>
#include "Stack.hpp"
using namespace std;
// g++ main.cpp -o ..\..\out\main; ..\..\out\main

int arr[5]{1, 4, 6, 2, 12};
template<class T>
void test(T s) {
  for (int i = 0; i < 5; ++i) {
    s.push(arr[i]);
  }
  while (!s.empty()) {
    printf("size: %d, data: %d\n", s.size(), s.top());
    s.pop();
  } cout << endl;
}

const int N = 1e5;
int st[N];

void push(int x) { st[++ * st] = x; }
int top() { return st[*st]; }
void pop() { if (*st)-- *st; }
void clear() { *st = 0; }
bool empty() { return *st == 0; }

int main() {
  ArrayStack<int> as;
  LinkedStack<int> ls;

  cout << "线性栈：\n";
  test(as);
  cout << "链栈：\n";
  test(ls);
  cout << "数组栈：\n";
  for (int i = 0; i < 5; ++i) {
    push(arr[i]);
  }
  while (!empty()) {
    cout << top() << " ";
    pop();
  } cout << endl;
}

