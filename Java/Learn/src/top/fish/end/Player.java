package top.fish.end;
import javafx.scene.layout.GridPane;
import javafx.util.Pair;

import java.util.LinkedList;

public class Player {
  final GridPane player;
  final String name;
  int len;
  int score;

  LinkedList<Pair<String, Integer>> cards;

  public Player(GridPane player, String name) {
    this.player = player;
    this.name = name;
    this.len = 13;
    this.score = 0;
  }

  public void set(LinkedList<Pair<String, Integer>> cards) {
    this.cards = cards;
  }

  public Card getCard(int position) {
    var cardData = cards.get(position);
    int weight = CardPool.TypeWeight.get(cardData.getKey());
    int num = cardData.getValue();
    return new Card(weight, num, position);
  }
}
