package com.fishHzu.exp7.FishMath;
public class MathClass implements IMath {
  @Override
  public int sum(int a, int b) {
    return a + b;
  }

  @Override
  public int max(int a, int b) {
    return a > b ? a : b;
  }
}

