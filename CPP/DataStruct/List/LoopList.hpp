#pragma once

#include <iostream>
using std::cout;

template<class T> class LoopList {
private:
  struct Node {
    T data;
    Node *next;

    Node(const T &x, Node *p = nullptr) :
      data{x}, next{p} {};
    Node(Node *p = nullptr) :
      data{T()}, next{p} {};
  };

  Node *head; // 头节点
  Node *tail; // 尾节点
  int curLength;

  void init() {
    head = tail = new Node;
    head->next = tail;
    tail->next = head->next;
    curLength = 0;
  }

public:
  LoopList() {
    init();
  }
  ~LoopList() {
    clear();
    delete head, tail;
    head = tail = nullptr;
  }

  void push_front(const T &x) {
    // p 是首元结点的前一个节点，来头插
    Node *p = new Node(x, head->next);
    // 空链表时得先初始化尾节点
    if (head->next == head) {
      tail = p;
    }
    // 将尾节点的下一个指向首元结点，来实现循环
    tail->next = p;
    // 头插地拼回来
    head->next = p;
    ++curLength;
  }

  void push_back(const T &x) {
    // 与单链表 尾节点->next为空指针 不同的是，
    // 循环链表的 尾节点->next指向了首元结点，来实现循环
    Node *p = new Node(x, head->next);
    // 尾插地拼在一起
    tail->next = p; tail = p;
    ++curLength;
  }

  // 就不写了，毕竟还是要和单链表一样遍历到尾节点的前驱
  void pop_back() {}

  void pop_front() {
    Node *p = head->next;
    // 让首元结点指向它的下一个节点
    // 同时也要让尾节点指向新的首元结点
    tail->next = head->next = p->next;
    // 最后要释放掉原先的首元结点
    delete p; p = nullptr;
    --curLength;
  }

  void reverse() {

  }

  void clear() {
    Node *p = head->next;
    while (p != tail) {
      p = p->next;
      pop_front();
    }
    init();
  }

  void merge(const LoopList &a) {
    tail->next = a.head->next;
    tail = a.tail;
    tail->next = head->next;
    curLength += a.size();
  }

  int size() const { return curLength; }

  // 从头遍历到尾地输出
  void print() const {
    cout << "Length: " << curLength << "\ndata: ";
    Node *p = head;
    while (p != tail) {
      p = p->next;
      cout << p->data << " ";
    } cout << std::endl;
  }
};