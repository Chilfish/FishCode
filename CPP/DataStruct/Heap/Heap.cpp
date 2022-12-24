#pragma once

#include <vector>
#include <algorithm>
#include <functional>
using std::vector, std::swap;
using std::less, std::greater;

// 有关堆的算法
namespace Heap {
template<class T, class Compare = greater<int>>
void adjust(vector<T> &arr, size_t len, size_t pos,
  Compare cmp = Compare()) {
  size_t l = pos * 2 + 1,
    r = pos * 2 + 2;
  size_t maxPos = pos;

  if (l < len && cmp(arr[l], arr[maxPos]))
    maxPos = l;
  if (r < len && cmp(arr[r], arr[maxPos]))
    maxPos = r;

  if (maxPos != pos) {
    swap(arr[pos], arr[maxPos]);
    adjust(arr, len, maxPos);
  }
}

template<class T>
void build(vector<T> &arr) {
  size_t len = arr.size();

  for (int i = len / 2 - 1; i >= 0; --i) {
    adjust(arr, len, i);
  }
}

template<class T>
void push(vector<T> &arr, const T &x) {
  arr.push_back(x);
  size_t len = arr.size(),
    cur = len - 1,
    par = (cur - 1) / 2;

  while (arr[cur] < arr[par]) {
    swap(arr[cur], arr[par]);
    if (par == 0) break; // 上滤到根节点
    cur = par;
    par = (cur - 1) / 2;
  }
}

template<class T>
void remove(vector<T> &arr, size_t pos) {
  swap(arr.at(pos), arr.back());
  arr.pop_back();
  adjust(arr, arr.size(), pos);
}

template<class T>
void sort(vector<T> &arr) {
  build(arr);
  for (int i = arr.size() - 1; i >= 0; --i) {
    swap(arr[0], arr[i]);
    adjust(arr, i, 0);
  }
}
};