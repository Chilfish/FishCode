# -*- coding: utf-8 -*-
from matplotlib import pyplot as plt
import random

LIST_SIZE = 40
PAUSE_TIME = 4 / LIST_SIZE

# 冒泡算法
def bubble_sort(nums):
  for i in range(len(nums) - 1):
    for j in range(len(nums) - i - 1):
      if nums[j] > nums[j + 1]:
        nums[j], nums[j + 1] = nums[j + 1], nums[j]
      plt.cla()  # 清除内容
      plt.bar(range(len(nums)), nums, align='center')
      plt.bar(j, nums[j], color="r", align="center")
      plt.bar(j + 1, nums[j + 1], color="r", align="center")
      plt.pause(PAUSE_TIME)
  plt.show()

def main():
  nums = []
  for i in range(LIST_SIZE):
    nums.append(random.randint(0, 1000))
  
  bubble_sort(nums)

  print(nums)

if __name__ == "__main__":
  main()
