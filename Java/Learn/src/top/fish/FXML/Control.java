package top.fish.FXML;

import top.fish.utils.Tool;
import javafx.fxml.FXML;
import javafx.scene.control.TextField;

public class Control {
  @FXML
  private TextField a;
  @FXML
  private TextField res;

  public void calc() {
    if (Tool.isInteger(a.getText())) {
      Integer A = ~Integer.parseInt(a.getText());
      res.setText(String.valueOf(A));
    } else {
      res.setText("Not a Number");
    }
  }
}
