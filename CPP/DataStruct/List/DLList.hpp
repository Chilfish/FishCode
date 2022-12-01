#pragma once

#include <iostream>
#include <algorithm>
#include <cassert>
#include <initializer_list>
#include "../Error.hpp"

using std::cout;
using std::endl;
using std::move;
using std::swap;

// 循环双链表
template<class T> class DLList {
private:
  struct Node {
    T data;
    Node *next;
    Node *prev;

    Node(const T &x = T{}, Node *p = nullptr, Node *n = nullptr) :
      data{x}, prev{p}, next{n} {};
    Node(T &&x, Node *p = nullptr, Node *n = nullptr) :
      data{move(x)}, prev{p}, next(n) {};
  };

  Node *head; // 头节点
  Node *tail; // 尾节点
  int curLength;

  // 构造的初始化
  void init() {
    head = tail = new Node;
    assert(head), assert(tail);

    // 循环起来了
    head->prev = head->next = tail;
    tail->prev = tail->next = head;
    curLength = 0;
  }

public:
  // 只读迭代器
  class const_iterator {
  protected:
    Node *cur;
    friend class DLList<T>;

    T &get() const { return cur->data; }
    const_iterator(Node *p = nullptr) : cur{p} {}

  public:
    const T &operator*() {
      return get();
    }
    const_iterator &operator++() {
      cur = cur->next;
      return *this;
    }
    const_iterator &operator++(int) {
      const_iterator old = *this;
      ++(*this);
      return old;
    }
    const_iterator &operator--() {
      cur = cur->prev;
      return *this;
    }
    const_iterator &operator--(int) {
      const_iterator old = *this;
      --(*this);
      return old;
    }

    const_iterator &operator+(int x) {
      while (x--) ++(*this);
      return *this;
    }
    const_iterator &operator-(int x) {
      while (x--) --(*this);
      return *this;
    }

    bool operator==(const const_iterator &rhs) const {
      return cur == rhs.cur;
    }
    bool operator!=(const const_iterator &rhs) const {
      return !(*this == rhs);
    }
  };

  // 可读写迭代器
  class iterator :public const_iterator {
  protected:
    iterator(Node *p = nullptr) : const_iterator{p} {}
    friend class DLList<T>;

  public:
    T &operator*() {
      return const_iterator::get();
    }
    const T &operator*() const {
      return const_iterator::get();
    }

    iterator &operator++() {
      this->cur = this->cur->next;
      return *this;
    }
    iterator &operator++(int) {
      iterator old = *this;
      ++(*this);
      return old;
    }
    iterator &operator--() {
      this->cur = this->cur->prev;
      return *this;
    }
    iterator &operator--(int) {
      iterator old = *this;
      --(*this);
      return old;
    }
    iterator &operator+(int x) {
      while (x--) ++(*this);
      return *this;
    }
    iterator &operator-(int x) {
      while (x--) --(*this);
      return *this;
    }
  };

public:
  // 五大函数

  /**
  * @brief
  */
  DLList() {
    init();
  }
  ~DLList() {
    clear();
    delete head;
    delete tail;
  }

  /**
  * @brief
  */
  DLList(const DLList &rhs) {
    init();
    for (auto &x : rhs) {
      push_back(x);
    }
  }

  /**
  * @brief
  */
  DLList(DLList &&rhs) : curLength{rhs.curLength},
    head{rhs.head}, tail{rhs.tail} {
    rhs.~DLList();
  }

  /**
  * @brief
  */
  DLList(const std::initializer_list<T> &l) {
    init();
    for (auto &x : l) {
      push_back(x);
    }
  }

  DLList &operator=(const DLList &rhs) {
    DLList copy = rhs;
    swap(*this, copy);
    return *this;
  }
  DLList &operator=(DLList &&rhs) {
    swap(curLength, rhs.curLength);
    swap(head, rhs.head);
    swap(tail, rhs.tail);
    return *this;
  }

public:
  iterator begin() {
    return head->next;
  }
  const_iterator begin() const {
    return head->next;
  }
  iterator end() {
    return tail;
  }
  const_iterator end() const {
    return tail;
  }

  T &front() {
    return *begin();
  }
  const T &front() const {
    return *begin();
  }
  T &back() {
    return *(end() - 1);
  }
  const T &back() const {
    return *(back() - 1);
  }

  int size() const {
    return curLength;
  }
  bool empty() const {
    return size() == 0;
  }

  iterator insert(iterator it, const T &x) {
    Node *p = it.cur,
      *newNode = new Node(x, p->prev, p);

    


    // // if (head->next == tail) {
    // //   p = tail = newNode;
    // // }

    // // p->prev->next = newNode;

    // p->prev = p->prev->next = newNode;
    // if (tail->next == head) {
    //   tail = head->next;
    //   // tail->next = head->next;
    //   // head->next->prev = tail->prev;
    // }

    ++curLength;
    return iterator{newNode};
  }

  void push_back(const T &x) {
    insert(end(), x);
  }
  void push_front(const T &x) {
    insert(begin(), x);
  }

  iterator erase(iterator it) {

  }

  iterator erase(iterator from, iterator to) {

  }

  void pop_back() {
    erase(end() - 1);
  }
  void pop_front() {
    erase(begin());
  }

  void clear() {
    while (!empty()) {
      pop_front();
    }
  }

  void print() const {
    cout << "length: " << curLength << "\ndata: ";
    Node *p = head->next;
    while (p != tail) {
      cout << p->data << " ";
      p = p->next;
    } cout << endl;
  }

  void reprint() const {
    cout << "length: " << curLength << "\ndata: ";
    Node *p = tail->prev;
    while (p != head) {
      cout << p->data << " ";
      p = p->prev;
    } cout << endl;
  }
};
