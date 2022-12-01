#include <bits/stdc++.h>
#define QAQ std
#define endl "\n"
#define ll long long
<<<<<<< HEAD
#define vi vector<int>
#define all(s) s.begin(), s.end()
=======
#define QAQ std
#define PLL pair<ll, ll>
#define all(s) s.begin(), s.end()
#define rall(s) s.rbegin(), s.rend()
#define IOS ios::sync_with_stdio(false), cin.tie(0), cout.tie(0)
>>>>>>> 72ab37fffe21e16f19efe52b68a51a3072eb45b2
using namespace QAQ;
#pragma GCC optimize(3)

<<<<<<< HEAD
struct node { int a, b; };

void solve() {
  int n, s, h, l, x, y, ans = 0;
  vector<node> arr;
  cin >> n >> s >> h >> l; h += l;
  for (int i = 0; i < n; ++i) {
    cin >> x >> y;
    arr.push_back({x, y});
  }
  sort(all(arr), [](node &a, node &b) {
    return a.b < b.b;
    });
  for (auto &i : arr) {
    if (i.a <= h) {
      s -= i.b;
      if (s < 0) break;
      else ++ans;
    }
  }
  cout << ans;
};

int main() {
  ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
  ll T = 1;
  // cin >> T; //
  while (T--) solve();
  return 0;
}
=======
int main() {

}
>>>>>>> 72ab37fffe21e16f19efe52b68a51a3072eb45b2
