package com.fishHzu.exp6;
import java.util.Scanner;

public class Test2 {
  public static void main(String[] args) {
    Scanner cin = new Scanner(System.in);

    System.out.println("请输入正方形的边长：");
    Square square = new Square(cin.nextDouble());
    System.out.printf("这个正方形的面积为：%.3f\n", square.getArea());

    System.out.println("请输入圆的半径：");
    Circle circle = new Circle(cin.nextDouble());
    System.out.printf("这个圆的面积为：%.4f\n", circle.getArea());

    System.out.println("请输入正四棱锥的底边长和高：");
    Geogebra geogebra = new Geogebra(cin.nextDouble(), cin.nextDouble());
    System.out.printf("这个正四棱锥的体积为：%.3f\n", geogebra.getArea());
  }
}

class Geometry {
  double getArea() { return 0; }
}

class Rectangle extends Geometry {
  private double length, width;

  public Rectangle(double length, double width) {
    this.length = length; this.width = width;
  }

  public void setLength(double length) {
    this.length = length;
  }

  public void setWidth(double width) {
    this.width = width;
  }

  public double getLength() {
    return length;
  }

  public double getWidth() {
    return width;
  }

  @Override
  double getArea() {
    return getLength() * getWidth();
  }
}

class Square extends Rectangle {
  private double sideLength;

  public Square(double sideLength) {
    super(sideLength, sideLength);
  }

  @Override
  double getArea() {
    return super.getArea();
  }
}

class Circle extends Geometry {
  private double r;

  public Circle(double r) {
    this.r = r;
  }

  public void setR(double r) {
    this.r = r;
  }

  public double getR() {
    return r;
  }

  @Override
  double getArea() {
    return Math.PI * r * r;
  }
}

class Geogebra extends Geometry {
  private final double height;
  private final Square bottom;

  public Geogebra(double length, double height) {
    this.height = height; this.bottom = new Square(length);
  }

  @Override
  double getArea() {
    return 1. / 3. * bottom.getArea() * height;
  }
}

