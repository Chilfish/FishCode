package com.fishHzu.exp9.t3;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class ctrl {
  @FXML
  private Label ans;

  @FXML
  private TextField name;

  @FXML
  private TextField uid;

  public void getAns() {
    ans.setText("姓名：" + name.getText() + "，学号：" + uid.getText());
  }
}
