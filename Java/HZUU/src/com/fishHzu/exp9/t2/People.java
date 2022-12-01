package com.fishHzu.exp9.t2;

public class People {
  protected String name;
  protected double height, weight;
  public People(String name, double height, double weight) {
    this.name = name;
    this.height = height;
    this.weight = weight;
  }
}
class Student extends People {
  private String id, name, pro;
  private double Math, English, Sum;
  public Student(String id, String name, String pro, double Math, double English,
                 double height, double weight) {
    super(name, height, weight);
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
        "\t" + super.height + "\t" + super.weight +
        "\t" + Math + "\t" + English + "\t" + Sum + "\t" + getAvg();
  }
}
