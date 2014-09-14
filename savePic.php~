<?php
require 'database.php';

// Get the filename and make sure it is valid
$filename = basename($_FILES['file']['name']);
if( !preg_match('/^[\w_\.\-]+$/', $filename) ){
	echo sprintf("Invalid filename: %s", $filename);
	exit;
}

$info = pathinfo($filename);
$newName = sprintf("%s.%s", time(), $info['extension']);
$full_path = sprintf("pics/%s", $newName);
if( move_uploaded_file($_FILES['file']['tmp_name'], $full_path) ) {
	
	// save data to database.
	$stmt = $mysqli->prepare("insert into pics (name, fileName) values (?, ?)");
	if(!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
	$stmt->bind_param('ss', $newName, $newName);
	$stmt->execute();
	$stmt->close();
	header("Location: index.html");
} else {
	echo sprintf("upload failure: %s", $filename);
}
?>
