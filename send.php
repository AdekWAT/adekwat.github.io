<?php
$name = $_POST['name'];
$id = $_POST['delivery-id'];
$fio = $_POST['fio'];
$kolvo = $_POST['kolvo'];
$tel = $_POST['tel'];
$comment = $_POST['comment'];
$time = $_POST['delivery-time'];
$method = $_POST['pay-method'];
$total = $_POST['total'];

echo "Наименование: ", $name;
echo "<br>";
if ($id == "Доставка до дома"){
	$region = $_POST['region'];
	$street = $_POST['street'];
	echo "Регион доставки: ", $region;
	echo "<br>";
	echo "Адрес: ", $street;
	echo "<br>";
}
echo "Метод доставки: ", $id;
echo "<br>";
echo "Фамилия, имя: ", $fio;
echo "<br>";
echo "Телефон: ", $tel;
echo "<br>";
echo "Кол-во персон: ", $kolvo;
echo "<br>";
echo "Комментарий: ", $comment;
echo "<br>";
echo "Начало готовки: ", $time;
echo "<br>";
if ($time == "Начать готовить в указанное время"){
	$when = $_POST['when'];
	$timeValue = $_POST['time-value'];
	echo "Когда: ", $when;
	echo "<br>";
	echo "Время: ", $timeValue;
	echo "<br>";
}
echo "Метод оплаты: ", $method;
echo "<br>";
echo "Сумма к оплате: ", $total, " " ,"руб.";
?>