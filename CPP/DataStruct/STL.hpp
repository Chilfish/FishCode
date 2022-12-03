#pragma once
#pragma GCC optimize(3)

#include <bits/stdc++.h>

#define all(s) s.begin(),s.end()
#define QAQ std
#define ll long long // 对于 unsigned ll 就不能用 using 了

using namespace QAQ;
using vi = vector<int>;
using vs = vector<string>;
using cs = const string &;
using PII = pair<int, int>;
using PLL = pair<ll, ll>;
using PSI = pair<string, int>;

int Random(int Min = 0, int Max = 1e2) {
  random_device seed;
  ranlux48 engine(seed());
  uniform_int_distribution<> dis(Min, Max);
  return dis(engine);
};

/**
 * 将数组转为字符串
 * @param arr 待转换的数组
 * @return string 类型
*/
template<class T>
string toString(const T &arr) {
  string ans = "{";
  for (int i = 0; i < arr.size(); ++i)
    ans += (i ? ", " : "") + to_string(arr[i]);
  return ans + "}";
}
string toString(const vector<string> &arr) {
  string ans = "{";
  for (int i = 0; i < arr.size(); ++i)
    ans += (i ? ", " : "") + arr[i];
  return ans + "}";
}

/**
* @brief 重载输出 vector
*/
template<class T>
ostream &operator<<(ostream &out, const vector<T> &arr) {
  return out << toString(arr);
}

/**
 * 为数组插入随机数
 * @param arr 目标数组
 * @param len 数组的长度
*/
template<class T>
void Push(T &arr, int len) {
  while (len--) arr.push_back(Random());
}

// 打印容器
template<class T>
void Print(const T &a) {
  for (auto ele : a)
    cout << ele << " ";
  cout << endl;
}

const char *Bool(const bool &b) {
  return b ? "true" : "false";
}
