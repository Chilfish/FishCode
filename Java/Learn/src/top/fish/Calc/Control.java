package top.fish.Calc;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.text.Text;

import top.fish.utils.Tool;

public class Control {
  @FXML
  private Text ans;
  @FXML
  private Text prevAns;

  private String num = "", prev = "", text = "";
  private String operator = "";
  private Boolean Operated = false;

  public void Clear() {
    prevAns.setText("");
    ans.setText("0");
    num = text = prev = "";
    Operated = false;
  }

  public void Calc() {
    if (num.equals("")) { return; }
    float a = Integer.parseInt(prev),
        b = Integer.parseInt(num);
    float res = 0;

    switch (operator) {
      case "+":
        res = a + b; break;
      case "-":
        res = a - b; break;
      case "×":
        res = a * b; break;
      case "÷":
        res = a / b; break;
      default:
        ;
    }
    String p = String.valueOf(res);
    if (p.indexOf(".") > 0) {
      p = p.replaceAll("0+?$", "")
           .replaceAll("[.]$", "");
    }
    prevAns.setText(text + "=");
    ans.setText(p);
    num = text = prev = "";
    Operated = false;
  }

  public void Append(ActionEvent e) {
    String c = Tool.getChar(e);

    if (Tool.isInteger(c)) {
      if (!(num.equals("") && c.equals("0"))) {
        num += c; text += c;
        ans.setText(text);
      }
    } else {
      if (!num.equals("") && !Operated) {
        text += c;
        ans.setText(text);
        prev = num; num = "";
        operator = c;
      }
      Operated = true;
    }
  }
}
