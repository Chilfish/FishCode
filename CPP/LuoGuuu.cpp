#include <bits/stdc++.h>
#define QAQ std
// #define endl "\n"
#define ll long long
#define all(s) s.begin(), s.end()
using namespace QAQ;
using vi = vector<int>;
#pragma GCC optimize(2)

// g++ LuoGuuu.cpp -o .\out\Luo; .\out\Luo

string dec2any(int x, int radix) {
  string ans;
  while (x) {
    int t = x % radix;
    ans.push_back(t >= 10 ? t - 10 + 'A' : t + '0');
    x /= radix;
  }
  reverse(all(ans));
  return ans;
}

ll bin2dec(string x) {
  ll ans = 0, base = 1;
  while (!x.empty()) {
    ans += base * (x.back() - '0'), base <<= 1;
    x.pop_back();
  }
  return ans;
}

template <typename T>
std::vector<T> heap_sort(std::vector<T> &vec) {
  std::vector<T> result;

  // 首先，建立一个最大堆
  std::make_heap(vec.begin(), vec.end());

  // 然后，将堆顶元素（即最大的元素）放到堆的末尾，并重新调整堆的结构
  while (vec.size() > 0) {
    std::pop_heap(vec.begin(), vec.end());
    result.push_back(vec.back());
    vec.pop_back();
  }

  // 最后，返回排序的结果
  return result;
}


void solve() {
  priority_queue<int> q;
  vi arr{23, 4, 1, 12, 2113, 4, 3, 1};

  for (int i : arr) {
    q.push(i);
  }

  while (!q.empty()) {
    cout << q.top() << " ";
    q.pop();
  }

}

int main() {
  ios::sync_with_stdio(0), cin.tie(nullptr), cout.tie(nullptr);
  ll T = 1;
  // cin >> T; //
  while (T--) solve();
  return 0;
}
