package com.fishHzu.exp1;
import java.util.Arrays;
import java.util.Scanner;

public class Hello {
  public static void main(String[] args) {
    System.out.println("I am a student. I love java");
    Student stu = new Student();
    stu.speak("I am kuku");
    Print_Max();
  }

  public static void Print_Max() {
    Scanner cin = new Scanner(System.in);
    final int n = 3;
    int[] arr = new int[n];
    System.out.println("enter " + n + " numbers to find max-mun: ");

    for (int i = 0; i < n; ++i) {
      arr[i] = cin.nextInt();
    }
    Arrays.sort(arr);
    System.out.println("max-num is: " + arr[n - 1]);
  }
}

class Student {
  public void speak(String str) {
    System.out.println(str);
  }
}
