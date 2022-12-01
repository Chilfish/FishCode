#include "STL.hpp"

// 一些查找搜索
void find_algo(const vi &arr) {
  const int num = 233, cnt = 1;
  vi t{1, 2}, temp = arr;
  const char *ts = toString(t).c_str();

  auto fun = [](const int &x) { return x >= 100; };

  /*************/

  sort(all(temp));
  auto begin0 = temp.begin();
  auto range = equal_range(all(temp), num);

  cout << "after sorted:\t";
  Print(temp);

  const char *form0 = "\
  binary_search(%d):\t %s \n\
  lower_bound(%d):\t pos: %d \n\
  upper_bound(%d):\t pos: %d \n\
  equal_range(%d):\t in [%d, %d) \n\
  \n\
";

  printf(form0,
    num, Bool(binary_search(all(temp), num)),
    num, lower_bound(all(temp), num) - begin0,
    num, upper_bound(all(temp), num) - begin0,
    num, range.first - begin0, range.second - begin0
  );

  /**************/
  auto begin = arr.begin(), end = arr.end();

  cout << "before sort:\t";
  Print(arr);

  const char *form = "\
  count(%d):\t\t %d times \n\
  count_if(x >= 100):\t %d times \n\
  \n\
  find(%d):\t\t pos: %d \n\
  find_if(x >= 100):\t pos: %d \n\
  find_end(%s):\t pos: %d \n\
  find_first_of(%s): pos: %d \n\
  search(%s):\t pos: %d \n\
  search_n(2, 234):\t pos: %d \n\
";

  printf(form,
    cnt, count(all(arr), cnt),
    count_if(all(arr), fun),

    num, find(all(arr), num) - begin,
    find_if(all(arr), fun) - begin,
    ts, find_end(all(arr), all(t)) - begin,
    ts, find_first_of(all(arr), all(t)) - begin,
    ts, search(all(arr), all(t)) - begin,
    search_n(all(arr), 2, 234) - begin
  );
}

// 元素的排序策略
void move_algo(vi &arr) {
  const vi temp = arr;
  fill(all(arr), 233);
  Print(arr);
}

int main() {
  vi arr{1, 2, 20, 233, 1, 2, 234, 234};
  find_algo(arr);
  move_algo(arr);
}