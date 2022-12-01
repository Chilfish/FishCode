package com.fishHzu.exp6;
public class Test1 {
  public static void main(String[] args) {
    Animal an;
    an = new Dog();
    an.cry();
    an = new Cat();
    an.cry();
  }
}

class Animal {
  void cry() { }
}

class Dog extends Animal {
  @Override
  void cry() {
    System.out.println("汪汪汪");
  }
}

class Cat extends Animal {
  @Override
  void cry() {
    System.out.println("喵喵");
  }
}

