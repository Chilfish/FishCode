#pragma once

#include <algorithm>
#include <initializer_list>
#include <cassert>
#include "../Error.hpp" 

using std::swap;
using std::initializer_list;

/**
* @brief 重写 std::vector 类，动态数组
*/
template <class T>
class Vector {
private:
  T *arr;
  int curLength; // 当前数组长度
  int curCapacity; // 当前数组容量

public:
  /**
  * @brief 定义数组长度的构造函数
  * @param initLen 数组初始化的长度
  */
  explicit Vector(int initLen = 0)
    :curLength{initLen}, curCapacity{initLen} {
    arr = new T[capacity()];
    assert(arr);
  }

  /**
  * @brief 定义 len 个为 x 的数组
  * @param len 数组长度
  * @param x 数组填充的值
  */
  Vector(int len, const T &x)
    :curLength{len}, curCapacity{len} {
    arr = new T[capacity()];
    for (int i = 0; i < len; ++i) {
      arr[i] = x;
    }
  }

  /**
  * @brief 使用参数列表构造函数
  */
  Vector(initializer_list<T> l) {
    curCapacity = curLength = l.size();
    arr = new T[capacity()];
    int i = 0;
    for (auto ele : l) {
      arr[i++] = ele;
    }
  }

  /**
  * @brief 深拷贝构造函数
  */
  Vector(const Vector &a) : arr{nullptr},
    curLength{a.curLength}, curCapacity{a.curCapacity} {
    arr = new T[capacity()];
    for (int i = 0; i < size(); ++i)
      arr[i] = a.arr[i];
  }
  /**
  * @brief 右值引用的移动构造函数
  */
  Vector(Vector &&a) : arr{a.arr},
    curLength{a.curLength}, curCapacity{a.curCapacity} {
    a.arr = nullptr;
    a.curCapacity = a.curLength = 0;
  }
  // 析构释放内存
  ~Vector() {
    delete arr;
  };

  /**
  * @brief 左值深拷贝赋值
  */
  Vector &operator=(const Vector &a) {
    Vector copy = a;
    swap(*this, copy);
    return *this;
  }

  /**
  * @brief 右值深拷贝赋值
  */
  Vector &operator=(Vector &&a) {
    swap(curCapacity, a.curCapacity);
    swap(curLength, a.curLength);
    swap(arr, a.arr);
    return *this;
  }

  // 下标的直接访问
  T operator[] (int index) const {
    return arr[index];
  }

  /**
  * @brief 带范围检验的下标访问
  */
  T at(int index) const {
    if (index < 0 || index >= curLength) {
      throw outOfRange();
    } else {
      return arr[index];
    }
  }


  /**
  * @brief 改变数组的长度，如果大于当前长度，则填充默认值 0 或 x；否则将数组缩减至新长度
  * @param newLen 改变后的长度
  * @param x 要填充的值，默认为 0 或类型的默认值
  */
  void resize(int newLen, const T &x = T()) {
    if (newLen < 0) throw outOfRange();
    if (newLen <= curLength) {
      curLength = newLen;
      return;
    }

    T *temp = new T[newLen];
    for (int i = 0; i < size(); ++i) {
      temp[i] = arr[i];
    }
    for (int i = curLength; i < newLen; ++i) {
      temp[i] = x;
    }

    curLength = curCapacity = newLen;
    swap(arr, temp);
    delete[] temp;
  }

  /**
  * @brief 重新分配数组容量，当新容量小于当前时，让当前容量=当前长度，否则才重新分配内存
  */
  void reserve(int newCapacity) {
    if (newCapacity < curLength) {
      curCapacity = curLength;
      return;
    }

    T *temp = new T[newCapacity];
    for (int i = 0; i < size(); ++i) {
      temp[i] = arr[i];
    }

    curCapacity = newCapacity;
    swap(arr, temp);
    delete[] temp;
  }

  /**
  * @brief 判断是否为空数组
  */
  bool empty() const { return size() == 0; }
  /**
  * @brief 返回数组长度
  */
  int size() const { return curLength; }
  /**
  * @brief 返回数组容量
  */
  int capacity() const { return curCapacity; }


  /**
  * @brief 在 index 前插入元素
  * @param index 要插入的下标
  * @param x 要插入的元素
  */
  void insert(int index, const T &x) {
    if (index < 0 or index > curLength) {
      throw outOfRange();
    }
    if (curLength == curCapacity)
      reserve(2 * curCapacity);

    for (int i = curLength - 1; i > index; --i) {
      arr[i] = arr[i - 1];
    }
    arr[index] = x;
  }

  /**
  * @brief 删除范围内的元素，闭区间
  * @param begin 起始
  * @param end 末尾
  */
  void erase(int begin, int end) {
    if (begin > end || end >= size()) {
      throw outOfRange();
    }
    if (end == size() - 1) {
      curLength = begin; // 省时之只是标记
      return;
    }
    const int len = end - begin + 1;
    for (int i = 0; i < len; ++i) {
      arr[i + begin] = arr[i + end + 1];
    }
    curLength -= len;
  }

  /**
  * @brief 删除下标为 index 的元素
  * @param index 要删除的下标
  */
  void remove(int index) {
    erase(index, index);
  }

  /**
  * @brief 清空数组，但如标准库而言，就只是把长度置零而已
  */
  void clear() {
    curLength = 0;
  }

  /**
   * @brief 往数组尾添加元素
   * @param x 要添加的元素
   */
  void push_back(const T &x) {
    if (capacity() == 0) {
      reserve(1);
    } else if (size() == capacity())
      reserve(2 * capacity());

    arr[curLength++] = x;
  }
  /**
  * @brief 删除数组尾部元素
  */
  void pop_back() {
    // 所以这时候用 [] 下标还是访问到数据，直到重新分配容量）标准库也是如此
    assert(empty() == false);
    curLength--;
  }
  /**
  * @brief 返回数组尾部元素
  * @return 数组尾
  */
  T &back() const {
    return arr[size() - 1];
  }
  /**
  * @brief 返回数组首部元素
  * @return 数组首
  */
  T &front() const {
    return arr[0];
  }
  /**
  * @brief 赋值 n 个 x 到数组
  * @param n 个数
  * @param x 值
  */
  void assign(int n, const T &x) {
    if (n < 0) throw outOfRange();
    else if (n > capacity()) {
      curCapacity = n;
    }
    T *temp = new T[capacity()];
    for (int i = 0; i < n; ++i) {
      temp[i] = x;
    }
    curLength = n;
    swap(arr, temp);
    delete[] temp;
  }

  /**
  * @brief 赋值 初始化列表 到数组
  * @param l 列表
  */
  void assign(initializer_list<T> l) {
    int len = l.size(), i = 0;
    if (len > capacity()) {
      curCapacity = len;
    }
    curLength = len;
    T *temp = new T[capacity()];
    for (auto ele : l) {
      temp[i++] = ele;
    }
    swap(arr, temp);
    delete[] temp;
  }


  /**
  * @brief 反转数组
  */
  void reverse() {
    Vector<T> temp(*this);
    for (int i = 0; i < size(); ++i) {
      arr[i] = temp[size() - i - 1];
    }
  }

  int find(const T &x) {
    for (int i = 0; i < size(); ++i) {
      if (arr[i] == x)
        return i;
    }
    return -1;
  }

  void print() {
    for (int i = 0; i < size(); ++i) {
      std::cout << arr[i] << " ";
    } std::cout << std::endl;
  }

  // 迭代器，但又不迭代
  typedef T *iterator;
  typedef const T *const_iterator;

  /**
  * @brief 返回数组首的迭代器
  */
  iterator begin() { return &arr[0]; }
  const_iterator begin() const { return &arr[0]; }
  /**
  * @brief 返回数组尾的迭代器
  */
  iterator end() { return &arr[size()]; }
  const_iterator end() const { return &arr[size()]; }
};