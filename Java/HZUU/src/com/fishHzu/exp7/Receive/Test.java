package com.fishHzu.exp7.Receive;
public class Test {
  public static void main(String[] args) {
    doing(new Student());
    doing(new Teacher());
    doing(new Parent());
    doing(new Leader());
    doing(new Foreign_guest());
  }

  static void doing(Person p) {
    p.sleep();
    p.eat();
    System.out.println();
  }
}

class Student implements Person {
  @Override
  public void sleep() {
    System.out.println("学生去寝室睡觉");
  }
  @Override
  public void eat() {
    System.out.println("学生去食堂吃饭");
  }
}

class Teacher implements Person {
  @Override
  public void sleep() {
    System.out.println("教师去教工餐厅吃饭");
  }
  @Override
  public void eat() {
    System.out.println("教师去公寓睡觉");
  }
}

class Parent implements Person {
  @Override
  public void sleep() {
    System.out.println("家长去招待所饭馆吃饭");
  }
  @Override
  public void eat() {
    System.out.println("家长回招待所睡觉");
  }
}

class Leader implements Person {
  @Override
  public void sleep() {
    System.out.println("领导去宾馆吃饭");
  }
  @Override
  public void eat() {
    System.out.println("领导回宾馆睡觉");
  }
}

class Foreign_guest implements Person {
  @Override
  public void sleep() {
    System.out.println("外宾去酒店吃饭");
  }
  @Override
  public void eat() {
    System.out.println("外宾回酒店睡觉");
  }
}

