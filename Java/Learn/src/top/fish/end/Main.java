package top.fish.end;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;

public class Main extends Application {
  @Override
  public void start(Stage stage) throws Exception {
    FXMLLoader fxml = new FXMLLoader(getClass().getResource("Main.fxml"));
    Scene scene = new Scene(fxml.load());

    stage.setResizable(false);
    stage.setTitle("Card Game");
    stage.getIcons().add(new Image("img/logo.png"));
    stage.setScene(scene);
    stage.show();
  }

  public static void main(String[] args) {
    launch(args);
  }
}
