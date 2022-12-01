package com.fishHzu.exp4;
public class Test {
  public static void main(String[] args) {
    CPU cpu = new CPU();
    cpu.setSpeed(233);
    HardDisk hd = new HardDisk();
    hd.setAmount(123);

    PC pc = new PC();
    pc.setCPU(cpu);
    pc.setHD(hd);
    pc.show();
  }
}

class CPU {
  private int speed;

  public void setSpeed(int speed) {
    this.speed = speed;
  }

  public int getSpeed() {
    return speed;
  }
}

class HardDisk {
  private int amount;

  public void setAmount(int amount) {
    this.amount = amount;
  }

  public int getAmount() {
    return amount;
  }
}

class PC {
  private CPU cpu;
  private HardDisk HD;

  public void setCPU(CPU cpu) {
    this.cpu = cpu;
  }

  public void setHD(HardDisk HD) {
    this.HD = HD;
  }

  public void show() {
    System.out.println(cpu.getSpeed() + ", " + HD.getAmount());
  }
}

class Person {
  private String name;
  private int age;

  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public void display() {
    System.out.println(name + ", " + age);
  }
}