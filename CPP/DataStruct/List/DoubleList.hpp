#pragma once

#include <iostream>
#include <algorithm>
#include <initializer_list>
#include <cassert>
#include "../Error.hpp"

using std::cout;
using std::endl;
using std::swap;

template<class T> class DoubleList {
private:
  struct Node {
    T data;
    Node *next;
    Node *prev;

    Node(const T &x = T{}, Node *p = nullptr, Node *n = nullptr) :
      data{x}, prev{p}, next{n} {};
  };

  Node *head; // 头节点
  Node *tail; // 尾节点
  int curLength;

  // 构造函数的初始化
  void init() {
    tail = new Node;
    head = new Node;
    assert(head), assert(tail);

    tail->prev = head;
    head->next = tail;
    curLength = 0;
  }

public:
  // 只读迭代器，不能改写指向元素的值
  class const_iterator {
  protected:
    Node *cur; // 指迭代器当前指向的元素
    int index; // 记录迭代器当前指向的线性结构的“下标”
    const DoubleList<T> *thisList; // 指向迭代器本身的对象的指针
    friend class DoubleList<T>; // 向本对象声明友元

    const_iterator(const DoubleList<T> &l, Node *p)
      :thisList{&l}, cur{p}, index{0} {}

    // 判断迭代器是否失效
    void assertValid() const {
      if (cur == nullptr || thisList == nullptr
        || cur == thisList->head)
        throw IteratorError();
    }

    // 返回当前迭代器指向元素的值
    T &getData() const {
      assertValid();
      return cur->data;
    }

  public:
    // 重载 *以访问值
    const T &operator*() { return getData(); }
    // 向前推进迭代器
    const_iterator &operator++() {
      if (cur->next == nullptr) {
        throw IteratorError();
      }
      cur = cur->next;
      ++index;
      return *this;
    }
    const_iterator operator++(int) {
      const_iterator old = *this;
      ++(*this);
      return old;
    }
    // 向后推进迭代器
    const_iterator &operator--() {
      if (cur->prev == nullptr) {
        throw IteratorError();
      }
      cur = cur->prev;
      --index;
      return *this;
    }
    const_iterator &operator--(int) {
      const_iterator old = *this;
      --(*this);
      return old;
    }
    // 迭代器向前推进x位
    const_iterator &operator+(int x) {
      while (x--) ++(*this);
      return *this;
    }
    // 迭代器向后推进x位
    const_iterator &operator-(int x) {
      while (x--) --(*this);
      return *this;
    }
    // 返回两个迭代器之间的距离
    int operator-(const const_iterator &x) {
      return index - x.index;
    }
    // 判断两个迭代器是否相等
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
    iterator(const DoubleList<T> &l, Node *p)
      : const_iterator{l, p} {}
    friend class DoubleList<T>;

  public:
    T &operator*() { return const_iterator::getData(); }
    iterator &operator++() {
      if (this->cur->next == nullptr) {
        throw IteratorError();
      }
      this->cur = this->cur->next;
      ++this->index;
      return *this;
    }
    iterator &operator++(int) {
      iterator old = *this;
      ++(*this);
      return old;
    }
    iterator &operator--() {
      if (this->cur->prev == nullptr) {
        throw IteratorError();
      }
      --this->index;
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
    int operator-(const iterator &x) {
      return this->index - x.index;
    }
  };

public:
  // 无参构造函数
  DoubleList() { init(); }
  // 析构函数，要先逐层释放内存
  ~DoubleList() {
    clear();
    delete head;
    delete tail;
  }
  // 参数列表构造函数
  DoubleList(const std::initializer_list<T> &l) noexcept {
    init();
    for (auto &x : l) push_back(x);
  }
  // 深拷贝构造函数
  DoubleList(const DoubleList &rhs) noexcept {
    init();
    for (auto &x : rhs) push_back(x);
  }
  // 移动构造函数
  DoubleList(DoubleList &&rhs) noexcept
    : curLength{rhs.curLength}, head{rhs.head}, tail{rhs.tail} {
    rhs.curLength = 0;
    rhs.head = rhs.tail = nullptr;
  }
  // 深拷贝赋值
  DoubleList &operator=(const DoubleList &rhs) noexcept {
    DoubleList copy = rhs;
    // 会调用地址的移动交换
    swap(*this, copy);
    return *this;
  }
  // 移动拷贝
  DoubleList &operator=(DoubleList &&rhs) noexcept {
    swap(curLength, rhs.curLength);
    swap(head, rhs.head);
    swap(tail, rhs.tail);
    return *this;
  }

public:
  // 指向首元结点的迭代器
  iterator begin() {
    return iterator{*this, head->next};
  }
  const_iterator begin() const {
    return const_iterator{*this, head->next};
  };

  // 指向尾指针的迭代器
  iterator end() {
    return iterator{*this, tail};
  }
  const_iterator end() const {
    return const_iterator{*this, tail};
  }

  // 返回首元元素
  T &front() { return *begin(); }
  const T &front() const { return *begin(); }
  // 返回尾节点元素
  T &back() { return *(end() - 1); }
  const T &back() const { return *(end() - 1); }
  // 返回链表大小
  int size() const { return curLength; }
  // 判空
  bool empty() const { return size() == 0; }

  /**
  * @brief 在指定迭代器前插入元素
  * @param position 链表的迭代器
  * @param x 要插入的元素
  * @returns 指向被插入元素的迭代器
  */
  iterator insert(const_iterator position, const T &x) {
    position.assertValid();
    if (position.thisList != this) {
      throw IteratorError();
    }

    Node *p = position.cur,
      *newNode = new Node{x, p->prev, p};

    p->prev = p->prev->next = newNode;
    ++curLength;
    return iterator{*this, newNode};
  }

  /**
  * @brief 在指定位置前插入元素
  * @param index 要插入的位置
  * @param x 要插入的元素
  * @returns 指向被插入元素的迭代器
  */
  iterator insert(int index, const T &x) {
    if (index < 0 || index >= size())
      throw outOfRange();

    // 折半遍历
    const_iterator it = (index <= size() >> 1)
      ? begin() + index
      : end() - index - 1;
    return insert(it, x);
  }

  // 尾插法
  void push_back(const T &x) { insert(end(), x); }
  // 头插法
  void push_front(const T &x) { insert(begin(), x); }

  /**
  * @brief 删除指定位置迭代器的元素
  * @param position 指向被删元素的迭代器
  * @returns 指向被删元素的下一个节点的迭代器
  */
  iterator erase(const_iterator position) {
    position.assertValid();
    if (position.thisList != this) {
      throw IteratorError();
    }

    Node *p = position.cur;
    iterator nextE{*this, p->next};

    p->prev->next = p->next;
    p->next->prev = p->prev;
    delete p; p = nullptr;
    --curLength;
    return nextE;
  }

  /**
  * @brief 删除范围内的元素，左闭右开
  * @param front 开始的迭代器
  * @param to 结束的迭代器
  * @returns 指向 to 的迭代器
  */
  iterator erase(const_iterator from, const_iterator to) {
    while (from != to) erase(from++);
    return iterator{*this, to.cur};
  }

  // 尾删除
  void pop_back() { erase(end() - 1); }
  // 首删除
  void pop_front() { erase(begin()); }

  /**
  * @brief 查找节点值
  * @param x 要找的值
  * @returns 找到值的迭代器，否则返回 end()
  */
  iterator find(const T &x) {
    for (iterator i = begin(); i != end(); ++i) {
      if (*i == x) return i;
    }
    return end();
  }

  // 清空链表
  void clear() {
    while (!empty()) pop_front();
  }

  // 正序输出链表
  void print() const {
    cout << "length: " << curLength << "\ndata: ";
    Node *p = head->next;
    while (p != tail) {
      cout << p->data << " ";
      p = p->next;
    } cout << endl;
  }

  // 逆序输出
  void reprint() const {
    cout << "length: " << curLength << "\ndata: ";
    Node *p = tail->prev;
    while (p != head) {
      cout << p->data << " ";
      p = p->prev;
    } cout << endl;
  }
};