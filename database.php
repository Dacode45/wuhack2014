<?php 
$mysqli = new mysqli('localhost', 'picaboo', 'picabooadmin1234', 'wuhack2014');
 
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>