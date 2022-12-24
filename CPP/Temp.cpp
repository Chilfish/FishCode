#include <bits/stdc++.h>
#define QAQ std
#define endl "\n"
#define ll long long 
#define all(s) s.begin(), s.end()
using namespace QAQ;
using vi = vector<int>;
#pragma GCC optimize(2)

// g++ Temp.cpp -o .\out\temp; .\out\temp

void solve() {
  vi arr{1, 2, 3, 1, 123, 123};
  sort(arr.begin(), arr.end(), greater<int>());

  priority_queue<int, greater<int>> q();
};

int main() {
  ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
  ll T = 1;
  // cin >> T; //
  while (T--) solve();
  return 0;
}
