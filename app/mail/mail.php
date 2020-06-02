<?php

$recepient = "web-leo@bk.ru";
$siteName = "Ajax-фома";

$name = trim($_POST["name"]);
$textarea = trim($_POST["textarea"]);
$email = trim($_POST["email"]);
$message = "Имя: $name  
Email: $email
Сообщение: $textarea";

$pagetitle = "Заявка с сайта \"$siteName\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>