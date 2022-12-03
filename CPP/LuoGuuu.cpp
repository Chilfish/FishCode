#include <bits/stdc++.h>
#define QAQ std
#define endl "\n"
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

void solve() {
  string s;
  cin >> s;
  cout << dec2any(bin2dec(s), 2) << endl;
}

int main() {
  ios::sync_with_stdio(0), cin.tie(nullptr), cout.tie(nullptr);
  ll T = 1;
  // cin >> T; //
  while (T--) solve();
  return 0;
}
