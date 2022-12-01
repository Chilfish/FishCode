package com.fishHzu.exp2;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Narcissus_num();
    Factorial(10);
//        Array(10);
//        StringArr(5);
  }

  static void Narcissus_num() {
    for (int i = 100; i <= 999; ++i) {
      if (i == Math.pow(i % 10, 3) + Math.pow(i / 10 % 10, 3) +
          Math.pow(i / 100, 3)) {
        System.out.println(i); // 153, 370, 371, 407
      }
    }
  }

  static void Factorial(int n) {
    long[] fact = new long[n];
    fact[0] = 1;
    for (int i = 1; i < n; ++i) {
      fact[i] = fact[i - 1] * (i + 1); // DP
    }
    System.out.println(Arrays.stream(fact).sum());
  }

  static void Array(int len) {
    int[] arr = new int[len];
    Scanner cin = new Scanner(System.in);
    for (int i = 0; i < len; ++i) {
      arr[i] = cin.nextInt();
    }
    Arrays.sort(arr);
    System.out.println(Arrays.toString(arr));
  }

  static void StringArr(int len) {
    String[] arr = new String[len];
    Scanner cin = new Scanner(System.in);
    for (int i = 0; i < len; ++i) {
      arr[i] = cin.next();
    }
    Arrays.sort(arr, new Comparator<String>() {
      @Override
      public int compare(String o1, String o2) {
        return o1.length() - o2.length();
      }
    });
    System.out.println("longest:\t" + arr[len - 1] +
        "\nshortest:\t" + arr[0]);
  }
}
