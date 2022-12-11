#include <iostream>
#include "Heap.cpp"
#include "Priority_Queue.hpp"
using namespace std;

int main() {
  vector<int> arr{3, 1, 123, 4, 12, 4, 10, 1234, 2, 5, 6, 7};
  PQueue<int> q(arr);

  q.push(12), q.push(0);

  while (!q.empty()) {
    cout << q.top() << " ";
    q.pop();
  }cout << endl;


  Heap::sort(arr);
  for (int i : arr)
    cout << i << " "; cout << endl;

  return 0;
}