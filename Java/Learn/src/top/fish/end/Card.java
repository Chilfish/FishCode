package top.fish.end;

import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

import java.util.*;

/**
 * 指定每张牌的属性
 */
public class Card {
  /**
   * 某张牌的值、权重、在玩家手中的位置、牌的类型、路径名、内嵌的按钮
   */
  int num, weight, position;
  String name, path;
  Button btn;

  public Card(String name, int num, int position) {
    this.num = num;
    this.position = position;
    this.name = name;

    if (name.equals("")) {
      this.weight = 0;
      this.path = CardPool.backImg;
    } else {
      this.weight = CardPool.TypeWeight.get(name);
      this.path = "img/" + name + num + ".jpg";
    }

    this.btn = setImg(path);
  }

  public Card() {
    this("", 0, 0);
  }

  /**
   * 将图片填充到新建的 Button 里
   */
  private Button setImg(String path) {
    ImageView imgView = new ImageView();
    imgView.setFitHeight(127); imgView.setFitWidth(79);
    imgView.setImage(new Image(path));
    return new Button("", imgView);
  }

  /**
   * 按权重及数值比较两张牌的大小
   *
   * @return this 比 参数 card 大则返回 true
   */
  public boolean Comparator(Card card) {
    if (this.weight < card.weight) return false;
    if (this.weight > card.weight) return true;
    return this.num > card.num;
  }

  public String toString() {
    return "weight: " + weight + " num: " + num + " pos: " + position + "\n";
  }
}

/**
 * 每局游戏的卡牌池，每开一场游戏就重新洗牌
 */
class CardPool {
  /**
   * 卡牌的类型
   */
  static final String[] cardType = new String[]{"fang", "mei", "hong", "hei"};
  /**
   * 每组牌的数量
   */
  static final int len = 13;
  /**
   * 牌的背面的路径
   */
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
   * @return 派发的卡牌组
   */
  public LinkedList<Card> getCards() {
    Random rand = new Random();
    var cards = new LinkedList<Card>(); // 发给玩家的牌

    for (int i = 0; i < len; i++) {
      int num, type;

      // 随机生成牌，且检查是否发过
      while (true) {
        num = rand.nextInt(1, len + 1);
        type = rand.nextInt(4);

        var typeArr = usedCard.get(cardType[type]);
        if (!typeArr.contains(num)) {
          typeArr.add(num); break;
        }
      }
      cards.add(new Card(cardType[type], num, i));
    }
    return cards;
  }
}
