#include <bits/stdc++.h>
#define QAQ std
#define endl "\n"
#define ll long long
#define vi vector<int>
#define all(s) s.begin(), s.end()
using namespace QAQ;
#pragma GCC optimize(3)

void r(istream &in = cin) {
  while (!in.eof()) {
    int t; in >> t;
    cout << t << " ";
  }
}


void solve() {
  // ifstream fin("a.in");
  // r(fin);

  // vector<bool> arr(5, true);
  vi arr(5, 233);
  // auto p = arr[0];
  int &pp = arr[0];
  pp = 0;
  for (auto i : arr)
    cout << i << " ";

};

int main() {
  ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
  ll T = 1;
  // cin >> T; //
  while (T--) solve();
  return 0;
}
