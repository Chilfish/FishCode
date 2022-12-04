package top.fish.end;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.GridPane;
import javafx.util.Pair;

import java.util.LinkedList;

/**
 * 玩家类
 */
public class Player {
  /**
   * 玩家的位置
   */
  GridPane playerPane;

  final ImageView postImg;
  /**
   * 玩家的名称
   */
  final String name;
  /**
   * 玩家手中牌的数量及当前的得分
   */
  int count, score;
  /**
   * 玩家手中的牌
   */
  LinkedList<Pair<String, Integer>> cards;

  public Player(GridPane player, ImageView postImg, String name) {
    this.playerPane = player;
    this.postImg = postImg;
    this.postImg.setImage(new Image(CardPool.backImg));
    this.name = name;
    this.count = CardPool.len;
    this.score = 0;
  }

  public void set(LinkedList<Pair<String, Integer>> cards) {
    this.cards = cards;
  }

  /**
   * 返回玩家手中指定位置卡牌的数据
   */
  public Card getCard(int position) {
    var cardData = cards.get(position);
    String name = cardData.getKey();
    int num = cardData.getValue();
    return new Card(name, num, position);
  }
}
