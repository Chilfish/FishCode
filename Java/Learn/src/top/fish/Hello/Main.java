package top.fish.Hello;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.Dragboard;
import javafx.scene.input.KeyCode;
import javafx.scene.input.TransferMode;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

import java.util.Optional;

public class Main extends Application {
  public static void main(String[] args) {
    launch(args);
  }

  void sureExit(Stage stage) {
    Platform.setImplicitExit(false);
    stage.setOnCloseRequest(e -> {
      e.consume();
      Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
      alert.setTitle("exit the app");
      alert.setHeaderText(null);
      alert.setContentText("Are you sure to exit?");

      Optional<ButtonType> result = alert.showAndWait();
      if (result.isPresent()) {
        if (result.get() == ButtonType.OK) {
          Platform.exit();
        } else if (result.get() == ButtonType.CANCEL) {
          stage.close();
        }
      }
    });
  }

  void jumpScene(Stage stage, Scene root, Button btn) {
    Label label = new Label("Hello Chill Fish!");
    Button button = new Button("back");
    button.setLayoutX(100); button.setLayoutY(100);

    AnchorPane pane1 = new AnchorPane();
    pane1.getChildren().addAll(label, button);
    Scene scene = new Scene(pane1, 300, 200);

    btn.setOnAction(e -> stage.setScene(scene));
    button.setOnAction(e -> stage.setScene(root));
    eventHandle(scene, button, label);
  }

  void eventHandle(Scene scene, Button button, Label label) {
    button.setOnAction(actionEvent -> label.setLayoutY(label.getLayoutY() - 5));

    scene.setOnKeyReleased(e -> {
      KeyCode key = e.getCode();
      if (key.equals(KeyCode.DOWN)) {
        label.setLayoutY(label.getLayoutY() + 5);
      }
    });
  }

  TextField textField() {
    TextField textField = new TextField();
    textField.setLayoutX(100); textField.setLayoutY(200);

    textField.setOnDragOver(e -> e.acceptTransferModes(TransferMode.ANY));
    textField.setOnDragDropped(e -> {
      Dragboard d = e.getDragboard();
      if (d.hasFiles()) {
        String path = d.getFiles().get(0).getAbsolutePath();
        System.out.println(path);
      }
    });

    textField.setOnKeyTyped(e -> System.out.println(e.getCharacter()));
    return textField;
  }

  @Override
  public void start(Stage stage) throws Exception {
    Label label = new Label("Hello Fish!");
    label.setLayoutX(100); label.setLayoutY(100);

    Button button = new Button("click!");
    button.setLayoutX(200); button.setLayoutY(100);

//    TextField textField = textField();

    ImageView img = new ImageView();
    img.setImage(new Image("img/logo.png"));
    img.setLayoutX(10); img.setLayoutY(200);
    img.fitHeightProperty().set(200);
    img.fitWidthProperty().set(200);
    img.autosize();

    AnchorPane pane = new AnchorPane();
    pane.getChildren().addAll(label, button, img);

    Scene scene = new Scene(pane, 800, 600);

    eventHandle(scene, button, label);
//    jumpScene(stage, scene, button);
//    sureExit(stage);

    stage.getIcons().add(new Image("img/logo.png"));
    stage.setScene(scene);
    stage.setTitle("Fish");
    stage.show();
  }
}
