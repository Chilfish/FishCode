#include "STL.hpp"

/*
g++ STL_Container.cpp -o ..\out\STL; ..\out\STL
*/

void Stack() {
  stack<int> s;
  for (int i = 0; i < 5; ++i) s.push(Random());

  cout << "size:\t" << s.size() << endl
    << "items:\t";

  while (!s.empty()) {
    cout << s.top() << " ", s.pop();
  }
  cout << endl;
}

void Priority_Queue() {
  struct Student {
    string name;
    int score;
  };
  struct cmp {
    bool operator()(const Student &a, const Student &b) const {
      return a.score < b.score || (
        a.score == b.score &&
        a.name + b.name > b.name + a.name);
    } // 先按 score 降序，再按 name 字典序升序
  };

  vector<Student> a{{"fish", 233}, {"mie", 123}, {"haha", 100}, {"ohh", 233}};

  // 自定义类型的优先队列要指定其中的 vector 类型
  priority_queue <Student, vector<Student>, cmp> pq;
  for (auto ele : a) pq.push(ele);

  while (!pq.empty()) {
    auto ele = pq.top();
    cout << "name: " << ele.name
      << "\tscore: " << ele.score << endl;
    pq.pop();
  }
}

void Vector() {
  vi a{4, 12, 5, 5, 6, 7};
  const auto begin = a.begin(), end = a.end();

  a.erase(begin + 1, end - 3);
  a.clear();
  // Print(a);

  vector<vi> aa(5, vi(2, 5));
  vector<vi> arr{
    {1, 2, 3, 5}, {5, 3, 1, 5}, {4, 5, 6, 7}
  };
  for (auto row : arr) {
    cout << toString(row) << endl;
  }
}

vector<PSI> a{
  {"fish", 233}, {"mie", 123}, {"haha", 100}, {"ohh", 233}
};
void Map_Key() {
  // 使用仿函数，且必须是指定 const
  struct byKeyLen {
    bool operator()(cs k1, cs k2) const {
      return k1 + k2 < k2 + k1;
    } // 按key的字典序升序
  };

  map<string, int, byKeyLen> m;
  for (auto ele : a) m.insert(ele);

  for (auto ele : m) {
    cout << "name: " << ele.first
      << "\tscore: " << ele.second << endl;
  }
}

void Map_x() {
  map<string, int> m;
  for (auto ele : a) m.insert(ele); // 构造数据

  vector<PSI> ans(all(m)); // 需要移植到vector才能排序
  sort(all(ans), [](const PSI &lhs, const PSI &rhs) {
    return lhs.second < rhs.second;
    });

  for (auto ele : ans) {
    cout << "name: " << ele.first
      << "\tscore: " << ele.second << endl;
  }
}

void Set() {
  set<int> s;
  vi arr{1, 5, 2, 88, 4, 23};
  for (int i : arr) {
    s.insert(i);
  }

  for (auto &i : s) {
    cout << i << " ";
  }
}

int main() {
  // Stack();
  // Priority_Queue();
  // Vector();
  // Map_Key();
  // Map_x();
  Set();
  return 0;
}