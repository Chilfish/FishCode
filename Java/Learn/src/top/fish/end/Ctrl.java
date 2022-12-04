package top.fish.end;

import javafx.fxml.FXML;
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

  private Player user;
  private Player bot;

  /**
   * 公共的卡牌池
   */
  private CardPool Cards;

  /**
   * 生成卡牌图片到玩家牌池中
   */
  private void generateCard(Player User) {
    var cards = Cards.getCards();
    User.set(cards);

    for (int i = 0; i < CardPool.len; i++) {
      var c = cards.get(i);
      Card card = new Card(c.getKey(), c.getValue(), i);
      User.playerPane.add(card.btn, i, 0);

      // 给玩家添加按钮事件
      if (User.playerPane.equals(UserPane)) {
        card.btn.setOnAction(e -> CardAction(card));
      }
    }
  }

  private Card botRound() {
    int pos = new Random().nextInt(bot.count - 1);
    return bot.getCard(pos);
  }

  private void displayCard(Player player, Card card) {
    player.postImg.setImage(new Image(card.path));

//    int pos = card.position;
//    card.path = CardPool.backImg;
//    card.btn = new Button("", card.setImg());
//    card.btn.setDisable(true);

//    player.count--;
//    player.cards.remove(pos);
  }

  /**
   * 获取玩家点击的牌
   */
  public void CardAction(Card userCard) {
    Card botCard = botRound();
    displayCard(user, userCard);
    displayCard(bot, botCard);

    System.out.println("\nbot: " + botCard +
        "player: " + userCard +
        "result: " + userCard.Comparator(botCard));
  }

  public void INIT() {
    System.out.println("\n----Welcome!----\n");

    Cards = new CardPool();
    user = new Player(UserPane, PostUserCard, "有机鱼");
    bot = new Player(BotPane, PostBotCard, "Bot");
    generateCard(user); generateCard(bot);
  }

  /**
   * 游戏开始前的初始化
   */
  public void initialize() {
    App.setBackground(new Background(new BackgroundImage(
        new Image("img/bj.jpg"),
        BackgroundRepeat.NO_REPEAT, BackgroundRepeat.NO_REPEAT,
        BackgroundPosition.CENTER, BackgroundSize.DEFAULT
    )));

    INIT();
  }
}
