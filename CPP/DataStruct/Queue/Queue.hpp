#pragma once 

#include <initializer_list>
#include <algorithm>
#include <cassert>
#include <iostream>
using std::cout;
using std::endl;
using std::swap;
using std::initializer_list;

/**
* @brief 重写 std::queue，循环队列，
* 但与 Vector 不同的是，并不支持迭代器和随机访问，不允许初始化长度之类的
*/
template<class T> class Queue {
private:
  T *arr;
  int Front; // 记录队首的下标
  int Back;
  int Capacity; // 队列的当前容量

  // 初始的默认容量
  static const int INIT_CAPACITY = 16;

  // 扩充队列容量
  void reserve() {
    T *temp = new T[Capacity << 1];
    for (int i = 0; i < size(); ++i) {
      temp[i] = arr[i + (Front + 1) % Capacity];
    }
    swap(temp, arr);
    delete[] temp;

    Back = size() - 1, Front = -1;
    Capacity <<= 1;
  }

public:
  explicit Queue() :
    Front{-1}, Back(-1), Capacity(INIT_CAPACITY) {
    arr = new T[Capacity];
    assert(arr);
  }

  // 左值引用的深拷贝构造函数
  Queue(const Queue &q) : Capacity{q.Capacity},
    Front{q.Front}, Back{q.Back} {
    arr = new T[Capacity];
    for (int i = 0; i < Capacity; ++i) {
      arr[i] = q.arr[i];
    }
  }

  // 右值引用的移动构造函数
  Queue(Queue &&q) :Capacity{q.Capacity},
    Front{q.Front}, Back{q.Back}, arr{q.arr} {
    q.arr = nullptr;
    q.clear();
  }

  // 列表初始化的构造函数
  Queue(initializer_list<T> l) :
    Front{-1}, Back(l.size() - 1), Capacity(l.size() + INIT_CAPACITY) {
    arr = new T[Capacity];
    int i = 0;
    for (auto e : l) {
      arr[i++] = e;
    }
  }

  ~Queue() {
    clear();
    delete[] arr;
  }

  // 左值深拷贝赋值
  Queue &operator=(const Queue &q) {
    Queue copy = q;
    swap(*this, copy);
    return *this;
  }

  // 右值深拷贝赋值
  Queue &operator=(Queue &&q) {
    swap(arr, q.arr);
    swap(Front, q.Front);
    swap(Back, q.Back);
    swap(Capacity, q.Capacity);
    return *this;
  }

  // 判断是否为空，即首尾指针的位置是否重叠
  bool empty() const {
    return Front == Back;
  }

  // 判断队列是否满
  bool full() const {
    return size() + 1 == Capacity;
  }

  // 队列长度
  int size() const {
    return (Back - Front + Capacity) % Capacity;
  }

  // 返回队列容量
  int capacity() const {
    return Capacity;
  }

  // 清空队列
  void clear() {
    Front = Back = -1;
  }

// 入队
void push(const T &x) {
  if (full()) reserve();

  Back = (Back + 1) % Capacity;
  arr[Back] = x;
}

// 出队
void pop() {
  assert(empty() == false);
  Front = (Front + 1) % Capacity;
}

  // 返回队首元素
  T front() {
    return arr[(Front + 1) % Capacity];
  }

  // 返回队尾元素
  T back() {
    return arr[Back];
  }

// 输出队列
void print() const {
  Queue t = *this;
  cout << "Length: " << t.size() << "\ndata: ";
  while (!t.empty()) {
    cout << t.front() << " ";
    t.pop();
  } cout << endl;
}
};


#include "../List/DoubleList.hpp"

//使用双链表实现队列
template<class T> class LinkedQueue {
private:
  DoubleList<T> l;
public:
  LinkedQueue() {}
  LinkedQueue(const DoubleList<T> &a) : l{a} {}
  LinkedQueue(const LinkedQueue &a) {
    for (auto i : a.l) push(i);
  }
  LinkedQueue(LinkedQueue &&a) :l{a.l} {}
  LinkedQueue &operator=(const LinkedQueue &a) {
    LinkedQueue copy = a;
    swap(*this, copy);
    return *this;
  }
  LinkedQueue &operator=(LinkedQueue &&a) {
    swap(a.l, l);
    return *this;
  }

  void push(const T &x) {
    l.push_back(x);
  }
  void pop() {
    l.pop_front();
  }
  T front() {
    return l.front();
  }
  T back() {
    return l.back();
  }
  int size() const {
    return l.size();
  }
  bool empty() const {
    return l.empty();
  }
  void print() const {
    LinkedQueue t = *this;
    cout << "Length: " << t.size() << "\ndata: ";
    while (!t.empty()) {
      cout << t.front() << " ";
      t.pop();
    } cout << endl;
  }
};