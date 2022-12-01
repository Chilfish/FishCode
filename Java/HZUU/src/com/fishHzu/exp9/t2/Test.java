package com.fishHzu.exp9.t2;

public class Test {
  public static void main(String[] args) {
    Student[] student = new Student[]{
        new Student("2114100328", "杨锦营", "计算机类", 233, 123
            , 89, 133),
        new Student("2114100233", "杨锦营2", "计算机类1", 2233, 1323
            , 89, 143),
        new Student("2114100338", "杨锦营3", "计算机类", 13, 123
            , 89, 193),
        new Student("2114100323", "杨锦营4", "计算机类2", 33, 123
            , 49, 173),
        new Student("2114100318", "杨锦营5", "计算机类", 233, 1263
            , 99, 132),
    };

    for (Student s : student) {
      System.out.println(s);
    }
  }
}
