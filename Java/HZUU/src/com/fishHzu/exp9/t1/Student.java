package com.fishHzu.exp9.t1;
public class Student {
  private String id, name, pro;
  private double Math, English, Sum;

  public Student(String id, String name, String pro, double Math, double English) {
    this.id = id;
    this.name = name;
    this.pro = pro;
    this.Math = Math;
    this.English = English;
    this.Sum = Math + English;
  }

  public double getAvg() {
    return Sum / 2.;
  }

  public String toString() {
    return id + "\t" + name + "\t" + pro +
        "\t" + Math + "\t" + English + "\t" + Sum + "\t" + getAvg();
  }
}
