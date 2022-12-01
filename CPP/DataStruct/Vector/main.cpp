#include <iostream>
using namespace std;
#include "Vector.hpp" 

int main() {
  Vector<int> a{1, 2, 4, 6, 23}, // 参数列表的构造函数
    b(3, 5); // 构造3个5
  const int len = a.size();

  cout << "b:\t"; b.print();
  cout << "a:\t"; a.print();

  Vector<int> c;
  cout << "\n---pushing: ---\n";
  for (int i = 0; i < len; ++i) {
    c.push_back(a.at(i));
    printf("capacity of c: %d\n", c.capacity());
  }
  cout << "\nc:\t"; c.print();

  printf("\n---init of a: ---\n\
  length: %d, capacity: %d\n\
  a.back(): %d, a[2]: %d, a.at(2): %d\n\n",
    a.size(), a.capacity(),
    a.back(), a[2], a.at(2)
  );

  a.reverse(); // 23 6 4 2 1
  cout << "a after reverse:\t"; a.print();

  c.insert(3, 233); // 1 2 4 233 6 23
  c.erase(1, 2); // 1 233 6 23
  c.push_back(23); // 1 233 6 23 23
  c.resize(6); // 1 233 6 23 23 0
  cout << "c after operate:\t"; c.print();
  return 0;
}
