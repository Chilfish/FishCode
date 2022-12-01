#include <bits/stdc++.h>
using namespace std;

string add(string s) {
  if (isdigit(s[0]))
    return ("PAGE=\"" + to_string(stoi(s) - 410));
  return "Error";
}

int main() {
  ifstream fin("input.txt");
  ofstream fout("ans.txt");
  string temp;
  regex rule("PAGE=\"(\\d+)");
  smatch target;
  while (getline(fin, temp)) {
    regex_search(temp, target, rule);
    string ans = add(target[1]);
    if (ans != "Error")
      fout << regex_replace(temp, rule, ans) << endl;
  }
  return 0;
}