#pragma once

#include "../Error.hpp" 
#include <iostream>
using std::cout;
using std::endl;

/**
* @brief 重写 std::list 类，基本的为单链表
*/
template<class T> class List {
private:
  struct Node {
    T data;
    Node *next;

    Node(const T &x, Node *p = nullptr) :
      data{x}, next{p} {};
    Node(Node *p = nullptr) :
      data{T()}, next{p} {};
  };

  Node *head; // 头节点，链式地在 next 中存剩余的节点
  Node *tail; // 尾节点
  int curLength;

  /**
* @brief 查找节点
* @param index 要查找节点的位置
* @return 返回第 index 的前一个节点
*/
  Node *getNode(int index) const {
    if (index < 0 or index > curLength) {
      throw outOfRange();
    }
    int i = 0; Node *p = head;
    while (p and i++ < index)
      p = p->next;
    return p;
  }

public:
  List() {
    head = tail = new Node;
    curLength = 0;
  }
  ~List() {
    clear();
    delete head, tail;
  }

  /**
  * @brief 查找元素下标，找不到则返回 -1
  */
  int search(const T &x) const {
    int index = 0;
    Node *p = head->next;
    while (p and p->data != x)
      p = p->next, ++index;
    if (index >= size())
      return -1;
    return index;
  }

  /**
  * @brief 在 index 前插入 x
  */
  void insert(int index, const T &x) {
    Node *p = getNode(index);
    Node *newNode = new Node(x, p);
    newNode->next = p->next;
    p->next = newNode;
    ++curLength;
  }

  /**
  * @brief 删除第 index 个节点
  */
  void remove(int index) {
    Node *prev = getNode(index),
      *p = prev->next;
    if (p == tail) {
      tail = prev;
      prev->next = nullptr;
    } else {
      prev->next = p->next;
    }
    delete p;
    p = nullptr;
    --curLength;
  }

  /**
  * @brief 查找下标数据
  * @param index 下标
  * @return 该下标的数据
  */
  T find(int index) {
    return getNode(index + 1)->data;
  }

  // 尾插 x
  void push_back(const T &x) {
    Node *p = new Node(x);
    tail->next = p;
    tail = p;
    ++curLength;
  }
  // 首插 x
  void push_front(const T &x) {
    Node *p = new Node(x, head->next);
    if (!head->next) tail = p;
    head->next = p;
    ++curLength;
  }
  // 删除尾元素
  void pop_back() {
    remove(curLength - 1);
  }
  // 删除首元素
  void pop_front() {
    remove(0);
  }

  T front() const {
    return head->next->data;
  }
  T back() const {
    return tail->data;
  }

  // 返回当前链表长度
  int size() const {
    return curLength;
  }
  // 判断是否为空链表
  bool empty() const {
    return size() == 0 ||
      head->next == nullptr;
  }

  /**
  * @brief 清空链表
  */
  void clear() {
    Node *p = head->next;
    while (p != tail) {
      pop_front();
      p = p->next;
    }
    head->next = nullptr;
    tail = head;
    curLength = 0;
  }

  // 逆置链表
  void reverse() {
    Node *p = head->next, *tmp;
    head->next = nullptr;
    if (p) tail = p;

    while (p) {
      tmp = p->next;
      p->next = head->next;
      head->next = p;
      p = tmp;
      // push_front(p->data);
      // p = p->next;
    }
  }

  // 合并两个单链表
  void merge(const List<T> &a) {
    this->tail->next = a.head->next;
    this->tail = a.tail;
    curLength += a.size();
  }

  // 暂时的输出链表
  void print() const {
    cout << "Length: " << curLength << "\ndata: ";
    // 从头遍历到尾
    Node *p = head;
    while (p != tail) {
      p = p->next;
      cout << p->data << " ";
    } cout << endl;
  }
};
