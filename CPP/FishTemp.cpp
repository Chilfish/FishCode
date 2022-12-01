#include <bits/stdc++.h>
#define QAQ std
#define endl "\n"
#define ll long long
#define all(s) s.begin(), s.end()
using namespace QAQ;
#pragma GCC optimize(2)

// g++ FishTemp.cpp -o .\out\FishTemp; .\out\FishTemp

// 首先，要写出模板的一般形式（原型）
template <typename T> class AddFloatOrMulInt {
  static T Do(T a, T b) {
    // 在这个例子里面一般形式里面是什么内容不重要，因为用不上
    // 这里就随便给个0吧。
    return T(0);
  }
};

// 其次，我们要指定T是int时候的代码，这就是特化：
template <> class AddFloatOrMulInt<int> {
public:
  static int Do(int a, int b) {
    return a * b;
  }
};

// 再次，我们要指定T是float时候的代码：
template <> class AddFloatOrMulInt<float> {
public:
  static float Do(float a, float b) {
    return a + b;
  }
};

template <typename T> class TypeToID {
public:
  static int const ID = -1;
};

template <> class TypeToID<void *> {
public:
  static int const ID = 0x401d;
};

template <> class TypeToID<int> {
public: static int const ID = 233;
};

template <typename... T> struct DoWork;
template <>           struct DoWork<int> {};
template <>           struct DoWork<float> {};
template <>           struct DoWork<int, int> {};

DoWork<int> i;
DoWork<float> f;
// DoWork<double> d;
DoWork<int, int> ii;

int main() {

  cout << AddFloatOrMulInt<int>::Do(1, 2) << endl;

  cout << "ID of uint8_t: " << TypeToID<int>::ID << endl;
  return 0;
}