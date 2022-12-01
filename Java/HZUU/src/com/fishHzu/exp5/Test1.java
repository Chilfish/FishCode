package com.fishHzu.exp5;
public class Test1 {
  public static void main(String[] arg) {
    Student s = new Student("fish", "fi", "2114100328");
    System.out.println(s.getName());
    System.out.println(s.getSex());
    System.out.println(s.getID());
  }
}

class Person {
  private String name, sex;

  public Person(String name, String sex) {
    this.name = name;
    this.sex = sex;
  }

  public Person() { }

  public String getName() {
    return name;
  }

  public String getSex() {
    return sex;
  }
};

class Student extends Person {
  private String ID;

  public Student(String name, String sex, String ID) {
    super(name, sex);
    this.ID = ID;
  }

  public Student(String ID) {
    this.ID = ID;
  }

  public Student() {
  }

  public String getID() {
    return ID;
  }
};


