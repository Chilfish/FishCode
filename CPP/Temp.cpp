#include <bits/stdc++.h>
#define QAQ std
#define endl "\n"
#define ll long long 
#define all(s) s.begin(), s.end()
using namespace QAQ;
using vi = vector<int>;
#pragma GCC optimize(2)

// g++ Temp.cpp -o .\out\temp; .\out\temp

void adjust_heap(vi &arr, size_t len, size_t pos) {
  size_t l = pos * 2 + 1,
    r = pos * 2 + 2;
  size_t maxPos = pos;

  if (l < len && arr[l] > arr[maxPos])
    maxPos = l;
  if (r < len && arr[r] > arr[maxPos])
    maxPos = r;

  if (maxPos != pos) {
    swap(arr[pos], arr[maxPos]);
    adjust_heap(arr, len, maxPos);
  }
}

void build_maxHeap(vi &arr) {
  size_t len = arr.size();
  for (int i = len / 2 - 1; i >= 0; --i) {
    adjust_heap(arr, len, i);
  }
}

void heap_sort(vi &arr) {
  build_maxHeap(arr);
  for (int i = arr.size() - 1; i >= 0; --i) {
    swap(arr[i], arr[0]);
    adjust_heap(arr, i, 0);
  }
}

void push_heap(vi &arr, int x) {
  arr.push_back(x);
  int cur = arr.size() - 1;
  int par = (cur - 1) / 2;

  while (arr[cur] > arr[par]) {
    swap(arr[cur], arr[par]);
    cur = par;
    par = (cur - 1) / 2;
  }
}

void pop_heap(vi &arr, int pos) {
  swap(arr.at(pos), arr.back());
  arr.pop_back();
  adjust_heap(arr, arr.size(), pos);
}

void pop_heap(vi &arr) { pop_heap(arr, 0); }

void solve() {
  vi a{1, 5, 2, 3, 8, 10, 23, 11, 233};
  build_maxHeap(a);

  push_heap(a, 100);

  while (!a.empty()) {
    cout << a.front() << " ";
    pop_heap(a);
  }

  for (int i : a) cout << i << " "; cout << endl;
};

int main() {
  ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
  ll T = 1;
  // cin >> T; //
  while (T--) solve();
  return 0;
}
