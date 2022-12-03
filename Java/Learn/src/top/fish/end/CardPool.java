package top.fish.end;

import javafx.util.Pair;

import java.util.*;

/**
 * 随机发牌的类，得到的是派发排的路径
 */
public class CardPool {
  /**
   * 卡牌的类型
   */
  static final String[] cardType = new String[]{"fang", "mei", "hong", "hei"};
  /**
   * 卡牌类型的权重值，1 ~ 4
   */
  static final HashMap<String, Integer> TypeWeight = new HashMap<>();
  /**
   * 标记派发过的牌，以免重复发牌
   */
  private final HashMap<String, List<Integer>> usedCard = new HashMap<>();

  public void init() {
    for (int i = 0; i < 4; ++i) {
      TypeWeight.put(cardType[i], i + 1);
      usedCard.put(cardType[i], new ArrayList<>());
    }
  }

  /**
   * @return 派发卡牌的路径
   */
  public LinkedList<Pair<String, Integer>> getCards() {
    Random rand = new Random();
    final int len = 13;
    var cards = new LinkedList<Pair<String, Integer>>();

    for (int i = 0; i < len; i++) {
      int num, type;
      while (true) {
        num = rand.nextInt(1, len + 1);
        type = rand.nextInt(4);

        if (!usedCard.get(cardType[type]).contains(num)) {
          usedCard.get(cardType[type]).add(num);
          break;
        }
      }
      cards.push(new Pair<>(cardType[type], num));
    }
    return cards;
  }

//  public display()
}

class Card {
  private int num, weight, position;
  private boolean bigger;

  public Card(int weight, int num, int position) {
    this.num = num;
    this.weight = weight;
    this.position = position;
    this.bigger = true;
  }

  public boolean Comparator(Card card) {
    if (this.weight < card.weight) return false;
    if (this.weight > card.weight) return true;
    return this.num > card.num;
  }

  public void Playing() {
//    boolean ans = COmparator
  }

  public String toString() {
    return weight + " " + num + " " + position + "\n";
  }
}