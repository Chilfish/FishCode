package top.fish.end;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;

import java.util.Random;

public class Ctrl {
  @FXML
  private AnchorPane App;
  @FXML
  private GridPane UserPane, BotPane;
  @FXML
  private ImageView PostBotCard, PostUserCard;
  @FXML
  private Button Mode;
  @FXML
  private Label p1Name, p1Score, p2Name, p2Score;
  /**
   * 玩家们
   */
  private Player user, bot;
  /**
   * 公共的卡牌池
   */
  private CardPool Cards;
  /**
   * 是比大还是比小
   */
  private boolean bigger;

  /**
   * 生成卡牌图片到玩家牌池中
   */
  private void generateCard(Player User) {
    var cards = Cards.getCards();
    User.setCards(cards);

    for (int i = 0; i < CardPool.CardLen; i++) {
      Card c = cards.get(i);
      Card card = new Card(c.name, c.num, i);
      User.playerPane.add(card.btn, i, 0);

      // 给玩家添加按钮事件
      if (User.playerPane.equals(UserPane)) {
        card.btn.setOnAction(e -> CardAction(card));
      }
    }
  }

  /**
   * 轮到 Bot 出牌了
   *
   * @return Bot 出的牌
   */
  private Card botRound() {
    int pos = new Random().nextInt(bot.count);
    return bot.getCard(pos);
  }

  /**
   * 把牌放到出牌区
   *
   * @param player 玩家
   * @param card   玩家出的牌
   */
  private void displayCard(Player player, Card card) {
    int pos = card.position;
    player.postImg.setImage(new Image(card.path));
    player.playerPane.add(new Card().btn, pos, 0);

    player.count--;
    player.cards.remove(card);
  }

  /**
   * 玩家出牌后的动作
   */
  public void CardAction(Card userCard) {
    Card botCard = botRound();
    displayCard(bot, botCard);
    displayCard(user, userCard);

    boolean res = userCard.Comparator(botCard);
    if (!bigger) res = !res;

    if (res) {
      user.score += Player.PER_SCORE;
    } else {
      bot.score += Player.PER_SCORE;
    }

    p1Score.setText(String.valueOf(user.score));
    p2Score.setText(String.valueOf(bot.score));
  }

  /**
   * 切换模式
   */
  public void ToggleMode() {
    bigger = !bigger;
    if (bigger) {
      Mode.setText("比谁大");
    } else {
      Mode.setText("比谁小");
    }
  }

  public void INIT() {
    bigger = true;
    Cards = new CardPool();
    user = new Player(UserPane, PostUserCard, "有机鱼");
    bot = new Player(BotPane, PostBotCard, "Bot");

    p1Name.setText(user.name); p2Name.setText(bot.name);
    p1Score.setText("0"); p2Score.setText("0");

    generateCard(user); generateCard(bot);
  }

  /**
   * 游戏开始前的初始化
   */
  public void initialize() {
    INIT();
  }
}
