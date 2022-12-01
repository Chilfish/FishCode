package com.fx.learn;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.scene.shape.Line;
import javafx.stage.Stage;

import java.awt.*;

public class APP extends Application {

  @Override
  public void start(Stage primaryStage) throws Exception {
    primaryStage.setTitle("My First JavaFX App");

    Label label = new Label("Hello World, JavaFX !");
    Scene scene = new Scene(label, 400, 200);
    primaryStage.setScene(scene);

    primaryStage.show();
  }

  public static void main(String[] args) {
    launch(args);
  }
}