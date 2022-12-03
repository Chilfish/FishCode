package top.fish.end;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;
import javafx.util.Pair;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Random;

public class Ctrl {
  @FXML
  private AnchorPane App;
  @FXML
  private GridPane UserPane;
  @FXML
  private GridPane BotPane;

  private Player user, bot;

  /**
   * 公共的卡牌池
   */
  private CardPool Cards;
  private HashMap<String, Integer> TypeWeight;

  private ImageView setImg(Pair<String, Integer> path) {
    ImageView imageView = new ImageView();
    imageView.setFitHeight(127); imageView.setFitWidth(79);
    imageView.setPreserveRatio(true); imageView.setPickOnBounds(true);

    String img = "img/" + path.getKey() + path.getValue() + ".jpg";
    imageView.setImage(new Image(img));
    return imageView;
  }


  /**
   * 生成卡牌图片到玩家牌池中
   */
  private void generateCard(Player User) {
    var cards = Cards.getCards();
    User.set(cards);

    for (int i = 0; i < 13; i++) {
      // 给玩家添加按钮事件
      if (User.player.equals(UserPane)) {
        Button btn = new Button("", setImg(cards.get(i)));
        User.player.add(btn, i, 0);
        int I = i; btn.setOnAction(e -> CardAction(User.getCard(I)));
      } else {
        User.player.add(setImg(cards.get(i)), i, 0);
      }
    }
  }

  private Card botRound() {
    Random random = new Random();
    int bound = bot.len - 1;
    int pos = random.nextInt(bound);
//    bot.cards.remove(pos); bot.len--;

    return bot.getCard(pos);
  }

  /**
   * 获取玩家点击的牌
   */
  public void CardAction(Card userCard) {
    Card botCard = botRound();
    System.out.println("\nbot: " + botCard.toString() +
        "player: " + userCard.toString() +
        "result: " + userCard.Comparator(botCard));
  }

  public void initialize() {
    App.setBackground(new Background(new BackgroundImage(
        new Image("img/bj.jpg"),
        BackgroundRepeat.NO_REPEAT, BackgroundRepeat.NO_REPEAT,
        BackgroundPosition.CENTER, BackgroundSize.DEFAULT
    )));

    Cards = new CardPool();
    Cards.init();

    user = new Player(UserPane, "有机鱼");
    bot = new Player(BotPane, "Bot");

    generateCard(user); generateCard(bot);
  }
}
