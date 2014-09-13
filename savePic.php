<?php
session_start();

// Get the filename and make sure it is valid

$filename = basename($_FILES['uploadedfile']['name']);
echo $filename;
if( !preg_match('/^[\w_\.\-]+$/', $filename) ){
	echo "Invalid filename";
	exit;
}
$info =  pathinfo($_FILES['uploadedfile']['name']);

$full_path = sprintf("testImages/%s.%s", time(), $info['extension']);	// change "testImages" to server folder
echo $full_path;

if( move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $full_path) ){
	header("Location: photo.php");
	exit;
}else{
	header("Location: upload_failure.html");
	exit;
}
 
?>