package com.fishHzu.exp5;
public class Test0 {
  public static void main(String[] args) {
    Square s = new Square();
    s.setSide_length(3.5F);
    System.out.println(s.getArea());
  }
}

class Rectangle {
  private float length;
  private float width;

  public void setWidth(float width) { this.width = width; }

  public void setLength(float length) { this.length = length; }

  public float getLength() { return length; }

  public float getWidth() { return width; }

  public float getArea() { return length * width; }
};

class Square extends Rectangle {
  private float side_length;

  public void setSide_length(float side_length) {
    this.side_length = side_length;
    setWidth(side_length);
    setLength(side_length);
  }
};

