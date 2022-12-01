package com.fishHzu.exp9.t3;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;

public class Main extends Application {
  public static void main(String[] args) {
    launch(args);
  }

  @Override
  public void start(Stage stage) throws Exception {
    FXMLLoader fxml = new FXMLLoader(getClass().getResource("Main.fxml"));
    Scene scene = new Scene(fxml.load());

    stage.setResizable(false);
    stage.setTitle("学生信息");
    stage.getIcons().add(new Image("img/logo.jpg"));
    stage.setScene(scene);
    stage.show();
  }
}
