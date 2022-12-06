package top.fish.end;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.GridPane;

import java.util.LinkedList;

/**
 * 玩家的信息类
 */
public class Player {
  /**
   * 玩家的位置
   */
  GridPane playerPane;
  /**
   * 玩家的出牌区
   */
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
   * 玩家每次获胜加的分数
   */
  static final int PER_SCORE = 10;
  /**
   * 玩家手中的牌
   */
  LinkedList<Card> cards;

  public Player(GridPane player, ImageView postImg, String name) {
    this.playerPane = player;
    this.postImg = postImg;
    this.postImg.setImage(new Image(CardPool.backImg));
    this.name = name;
    this.count = CardPool.CardLen;
    this.score = 0;
  }

  /**
   * 设置玩家的手牌
   */
  public void setCards(LinkedList<Card> cards) {
    this.cards = cards;
  }

  /**
   * 返回玩家手中指定位置卡牌的数据
   */
  public Card getCard(int position) { return cards.get(position); }
}
