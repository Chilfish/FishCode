#include "DataStruct/STL.hpp"

void Bubble(vi &arr) {
  int len = arr.size() - 1;
  for (int i = 0; i < len; ++i)
    for (int j = 0; j < len - i; ++j) {
      if (arr[j] > arr[j + 1])
        swap(arr[j], arr[j + 1]);
    }
}

void Select(vi &arr) {
  int len = arr.size();
  for (int i = 0; i < len - 1; ++i) {
    int minn = i;
    for (int j = i + 1; j < len; ++j)
      if (arr[minn] > arr[j])
        minn = j;
    if (i != minn)
      swap(arr[i], arr[minn]);
  }
}

void Insert(vi &arr) {
  for (int i = 0; i < arr.size(); ++i) {
    int temp = arr[i], j = i;
    for (j = i; j > 0 and arr[j - 1] > temp; --j) {
      arr[j] = arr[j - 1];
      /*
      printf("i: %d\t", i);
      Print(arr);*/
    }
    arr[j] = temp;
  }
}

void Shell(vi &arr) {
  const int len = arr.size();
  for (int gap = len >> 1; gap > 0; gap >>= 1) {
    /*
    cout << "before:\t";
    Print(arr);*/
    for (int i = gap; i < len; ++i) {
      int temp = arr[i], j = i;
      while (j - gap >= 0 and arr[j - gap] > temp)
        arr[j] = arr[j - gap], j -= gap;
      arr[j] = temp;
    }
    /*
    cout << "after:\t";
    Print(arr);
    cout << endl;*/
  }
}

/**
 * 归并排序
*/
void Merge(vi &arr, int l, int m, int r) {
  // 若要合并的是 [4, 8, 5, 7]，则分一半
  // p指向临时数组，i指向左半部分[4, 5]，
  int p = 0, i = l, j = m + 1;
  // 临时数组的大小只有 [4, 8, 5, 7].len
  vi t(r - l + 1, 0);

  // 分别遍历左右部分，按顺序把字表元素移到 t[]
  // 直到某半部分遍历完
  while (i <= m && j <= r)
    if (arr[i] > arr[j])
      t[p++] = arr[j++];
    else
      t[p++] = arr[i++];

  // 此时 t[] -> [4, 5, 7]
  // 再将合并中剩下的移到 t[]
  while (i <= m) t[p++] = arr[i++];
  while (j <= r) t[p++] = arr[j++];

  // 此时 t[] => [4, 5, 7, 8]
  // 将 t[] 表覆盖到 arr[] 表
  for (i = 0; i < p; ++i)
    arr[l + i] = t[i];

  /* debug
  printf("l:%d, m:%d, r:%d\n", l, m, r);
  cout << "t[]:\t";
  for (int k = 0; k < p; ++k)
      cout << t[k] << " ";

  cout << "\narr[]:\t";
  Print(arr);
  cout << "\n";*/
}

void MergeSort(vi &arr, int l, int r) {
  if (l < r) {
    int m = (l + r) / 2;
    MergeSort(arr, l, m); //先是左半部分
    MergeSort(arr, m + 1, r); //再是右半部分
    Merge(arr, l, m, r); // 合并每半部分的每半部分...
  }
}

/**
 * 快排
*/
void Quick(vi &arr, int begin, int end) {
  // 递归，直到 start = end 为止
  if (begin > end) return;
  int base = arr[begin], i = begin, j = end;
  while (i != j) {
    // 从右向左找比基准数小的数 （要先从右边开始找）
    while (arr[j] >= base && i < j) j--;
    // 从左向右找比基准数大的数
    while (arr[i] <= base && i < j) i++;
    // 主要是找到目标数的下标，然后再交换位置
    if (i < j) swap(arr[i], arr[j]);
  }
  // 最终将基准数归位
  arr[begin] = arr[i];
  arr[i] = base;
  // 第一趟把基准数放到中间后，分左右两边依此快排
  Quick(arr, begin, i - 1); // 继续处理左边的
  Quick(arr, i + 1, end); // 继续处理右边的
}

/**
 * 计数排序
*/
void Count(vi &arr) {
  const int Max = *max_element(all(arr));
  vi box(Max + 5, 0);
  for (auto ele : arr) box[ele]++;
  for (int i = 0, j = 0; i < Max; ++i)
    while (box[i]--) arr[j++] = i;
}

/**
 * 桶排序
*/
void Bucket(vi &arr, int cnt = 3) {
  if (!arr.size() || cnt < 2) return;

  const int maxx = *max_element(all(arr)),
    minn = *min_element(all(arr)),
    len = arr.size(),
    range = (maxx - minn + cnt) / cnt;
  vector<vi> buckets(range);

  // 分配
  for (int i = 0; i < len; ++i) {
    int index = (arr[i] - minn) / range;
    buckets[index].push_back(arr[i]);
  }

  for (int i = 0, index = 0; i < len; ++i)
    if (buckets[i].size()) {
      sort(all(buckets[i])); // 桶内排序
      for (auto ele : buckets[i]) arr[index++] = ele; // 拼接
    }
}

/**
 * 基数排序
*/
void Radix(vi &arr) {
  const int len = arr.size(),
    k = int(log(*max_element(all(arr)))) + 1; // 最大位数
  // 从最低位开始
  for (int i = 0; i < k; ++i) {
    vector<vi>radix(10); // 十进制
    //分配
    for (int j = 0; j < len; ++j) {
      int index = int(arr[j] / pow(10, i)) % 10;
      radix[index].push_back(arr[j]);
    }
    //收集
    for (int j = 0, index = 0; j < radix.size(); ++j)
      for (auto ele : radix[j]) arr[index++] = ele;
  }
}

int main() {

  /**/
  const int len = 1e4;
  vi arr;
  Push(arr, len);

  // vi arr{7, 4, 5, 8, 1, 3, 6, 2};

  /*
  Print(arr);
  Radix(arr);
  Print(arr);*/

  clock_t t;
  t = clock();
  {
    // Bubble(arr);
    // Select(arr);
    // Insert(arr);
    // Count(arr);
    MergeSort(arr, 0, len - 1);
    // Quick(arr, 0, len - 1);
    // Shell(arr);
    // Bucket(arr);
    // Radix(arr);

    // Bubble > Select > Insert > Count > Quick ~ merge ~ Shell ~ Bucket ~ Radix
  }
  t = clock() - t;
  printf("\nTime cost:\t%.4f s\n", t / 1000.);

  return 0;
}