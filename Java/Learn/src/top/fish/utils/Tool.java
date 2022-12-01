package top.fish.utils;

import javafx.event.ActionEvent;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Tool {
  public static boolean isInteger(String str) {
    Pattern pattern = Pattern.compile("^?[\\d]*$");
    return pattern.matcher(str).matches();
  }

  public static String getChar(ActionEvent e) {
    final String regex = "'([0-9\\+-×÷=])'";
    String str = e.getTarget().toString();
    Matcher p = Pattern.compile(regex).matcher(str);

    String res = "";
    if (p.find()) {
      res = p.group(1);
    }
    return res;
  }
}
