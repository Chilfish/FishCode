package top.fish.end;

import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.util.Pair;

import java.util.*;

/**
 * 每局游戏的卡牌池，每开一场游戏就重新洗牌
 */
public class CardPool {
  /**
   * 卡牌的类型
   */
  static final String[] cardType = new String[]{"fang", "mei", "hong", "hei"};
  static final int len = 13;
  static final String backImg = "img/back.png";
  /**
   * 卡牌类型的权重值，1 ~ 4
   */
  static final HashMap<String, Integer> TypeWeight = new HashMap<>();
  /**
   * 标记派发过的牌，以免重复发牌
   */
  private final HashMap<String, List<Integer>> usedCard = new HashMap<>();

  public CardPool() {
    for (int i = 0; i < 4; ++i) {
      TypeWeight.put(cardType[i], i + 1);
      usedCard.put(cardType[i], new ArrayList<>());
    }
  }

  /**
   * 将牌发到玩家手中
   *
   * @return 派发卡牌的路径
   */
  public LinkedList<Pair<String, Integer>> getCards() {
    Random rand = new Random();
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
}

/**
 * 指定每张牌的属性
 */
class Card {
  /**
   * 某张牌的值、权重、在玩家手中的位置、牌的类型、路径名
   */
  int num, weight, position;
  String name, path;
  /**
   * 是比大还是比小
   */
  boolean bigger;

  Button btn;
  ImageView imgView;

  public Card(String name, int num, int position) {
    this.num = num;
    this.position = position;
    this.name = name;
    this.weight = CardPool.TypeWeight.get(name);
    this.path = "img/" + name + num + ".jpg";
    this.bigger = true;

    this.btn = new Button("", setImg());
  }

  /**
   * 将图片填充到新建的 ImageView 里
   */
  private ImageView setImg() {
    this.imgView = new ImageView();
    imgView.setFitHeight(127); imgView.setFitWidth(79);
    imgView.setImage(new Image(path));
    return this.imgView;
  }

  public boolean Comparator(Card card) {
    if (this.weight < card.weight) return false;
    if (this.weight > card.weight) return true;
    return this.num > card.num;
  }

  public String toString() {
    return "weight: " + weight + " num: " + num + " pos: " + position + "\n";
  }
}