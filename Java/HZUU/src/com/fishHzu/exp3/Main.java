package com.fishHzu.exp3;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Cylinder C1 = new Cylinder();
    C1.Set();
    C1.Calc();
    System.out.printf("%.3f", C1.Get_Volume());
  }
}

class Cylinder {
  private double radius, height, volume;

  void Set() {
    Scanner cin = new Scanner(System.in);
    this.radius = cin.nextDouble();
    this.height = cin.nextDouble();
  }

  void Calc() {
    this.volume = Math.pow(this.radius, 2) * Math.PI * this.height;
  }

  double Get_Volume() {
    return this.volume;
  }
}

