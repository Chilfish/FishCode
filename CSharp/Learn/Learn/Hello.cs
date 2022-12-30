using System;

class Hello {
  record Person(string Name, int Age);

  interface IHello {
    void Helloo() { }
  }

  class H : IHello {
    Person P { get; set; }

    public H(Person p) {
      P = p;
    }

    public void Helloo() {
      Console.WriteLine(P.Name);
    }
  }

  static void Swap<T>(ref T t1, ref T t2) {
    (t1, t2) = (t2, t1);
  }

  delegate bool Cmp(int x, int y);

  static void Compare(int x, int y, Cmp cmp) {
    Console.WriteLine(cmp(x, y));
  }

  static void Main() {
    int n = 5;
    Random random = new();
    string? ans = null;

    int[] a = new int[n];

    for (int i = 0; i < n; i++) {
      int t = random.Next(0, 100);
      a[i] = t;
      ans += ($"{i}: {t}\n");
    }

    var f = (string? s) => s.Length + 5;

    Console.WriteLine(ans + f(ans));

    var v = new {
      name = "fish",
      data = new int[] { 1, 2, 2 }
    };

    Person p = new("fish", 13);
    Console.WriteLine(p);

    H h = new(p);
    h.Helloo();

    Compare(1, 3, (int x, int y) => {
      return x < y;
    });
  }
}