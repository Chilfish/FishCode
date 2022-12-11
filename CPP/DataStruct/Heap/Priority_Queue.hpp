#pragma once

#include "../Heap/Heap.cpp"

template<class T> class PQueue {
private:
  vector<T> arr;

public:
  PQueue(const vector<T> &arr) {
    this->arr.assign(arr.begin(), arr.end());
    Heap::build(this->arr);
  }
  void push(const T &x) {
    Heap::push(arr, x);
  }
  void pop() {
    Heap::remove(arr, 0);
  }
  void size() const {
    return arr.size();
  }
  bool empty() const {
    return arr.empty();
  }
  T top() const {
    return arr[0];
  }
};