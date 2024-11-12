<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $attending = $_POST["attending"];
  $stay = isset($_POST["stay"]) ? $_POST["stay"] : null;
  $nights = isset($_POST["nights"]) ? implode(", ", $_POST["nights"]) : null;

  // Aquí puedes manejar la lógica para guardar en la base de datos o enviar un email
  echo "Formulario enviado exitosamente. Gracias, $name!";
}
?>
