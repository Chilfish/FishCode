#pragma once
#include <exception>

//非法下标访问的异常抛出
class outOfRange : public std::exception {
public:
  const char *what() const throw() {
    return "Error! Out Of Range!\n";
  }
};

// 迭代器非法
class IteratorError : public std::exception {
public:
  const char *what() const throw() {
    return "Error! Iterator is invalid!\n";
  }
};