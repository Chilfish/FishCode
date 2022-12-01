#include "List.hpp"
#include "LoopList.hpp"
#include "DoubleList.hpp"
#include "DLList.hpp"
#include <iostream>
using namespace std;

#define green "\033[32m"
#define reset "\033[0m"

// g++ main.cpp -o ..\..\out\main; ..\..\out\main

void singleList() {
  List<int> s, a;
  for (int i = 1; i <= 5; ++i) {
    s.push_back(i);
    // a.push_back(i * 2);
  }

  printf("befor:\n");
  s.print();

  s.remove(3);
  s.reverse();
  // s.merge(a);

  printf("\nafter:\n");
  // s.insert(3, 233);
  // s.insert(2, 234);
  // s.push_front(344);
  // s.pop_back(); s.remove(4); 
  // s.clear();
  s.print();

}

void loopList() {
  LoopList<int> s, a;
  for (int i = 20; i < 25; ++i) {
    s.push_back(i);
  }
  for (int i = 10; i < 15; ++i) {
    a.push_front(i);
  }
  cout << "a:\n";
  a.print();

  s.pop_front();
  s.push_back(2);
  s.clear();
  // s.merge(a);
  cout << "s:\n";
  s.print();
}

void doubleList() {
  DoubleList<int> s,
    a{12, 13, 14, 15}, // 使用参数列表构造
    b(a), // 拷贝构造
    c;
  c = a; // 深拷贝赋值

  cout << "a: "; a.reprint();
  cout
    << "is 14 found in a? " << green
    << (a.find(14) != a.end() ? "true" : "false")
    << reset << endl;

  // 如果b为a的深拷贝，那它们首元结点的地址应是不同的
  cout
    << "is a perfect equal to b? " << green
    << (b.begin() == a.begin() ? "true" : "false")
    << reset << endl;

  for (int i = 4; i <= 6; ++i) {
    s.push_front(i);
  }
  for (int i = 3; i >= 1; --i) {
    s.push_back(i);
  }

  cout << "\n----before:----\n";
  cout << "s: "; s.print();

  s.pop_back();
  s.pop_front();
  s.insert(2, 233);
  cout << "\n----after:----\n";
  s.print();

  s.erase(s.begin() + 1, s.begin() + 3);
  cout << "\n----after range erase:----\n";
  s.print();

  cout << "\nuse iterator* : "
    << *(s.begin() + 2) << endl;

  // 非法地插入
  // s.insert(s.begin() + 20, 233);
  cout << ((s.begin() + 2) - (s.begin()));
}

void doubleLoopLinkedList() {
  DLList<int> s;
  for (int i = 5; i < 10; ++i) {
    s.push_back(i);
  }
  s.print();
}

int main() {
  singleList();
  // loopList();
  // doubleList();
  // doubleLoopLinkedList();
  return 0;
}