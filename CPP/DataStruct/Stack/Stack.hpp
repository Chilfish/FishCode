#pragma once
#include "../Vector/Vector.hpp"

/**
* @brief 用 Vector 重写 std::stack
*/
template<class T> class ArrayStack {
private:
  Vector<T> s;
public:
  explicit ArrayStack() {};
  explicit ArrayStack(const Vector<T> &a) : s{a} {}

  T top() const {
    return s.back();
  }
  void pop() {
    s.pop_back();
  }
  void push(const T &x) {
    s.push_back(x);
  }
  int size() const {
    return s.size();
  }
  bool empty() const {
    return s.empty();
  }
};

#include "../List/List.hpp"
/**
* @brief 使用单链表表示栈
*/
template<class T> class LinkedStack {
private:
  List<T> l;
public:
  LinkedStack() {}
  LinkedStack(const List<T> &L) : l{L} {}

  void push(const T &x) {
    l.push_back(x);
  }
  void pop() {
    l.pop_back();
  }
  int size() const {
    return l.size();
  }
  bool empty() const {
    return size() == 0;
  }
  T top() const {
    return l.back();
  }
};