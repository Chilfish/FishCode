#include <iostream>
#include "Queue.hpp"
using namespace std;

// g++ main.cpp -o ..\..\out\main; ..\..\out\main

int main() {
  cout << "----线性队列----\n";
  Queue<int> q;
  for (int i = 5; i < 10; ++i) {
    q.push(i);
  }
  q.print();

  q.push(233); q.push(123);
  q.pop(); q.pop();
  q.print();

  cout << "\n----链式队列----\n";
  LinkedQueue<int> lq;
  for (int i = 5; i < 10; ++i) {
    lq.push(i);
  }
  lq.print();

  lq.push(233); lq.push(123);
  lq.pop(); lq.pop();
  lq.print();
  return 0;
}
