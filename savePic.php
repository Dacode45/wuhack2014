<?php
// Get the filename and make sure it is valid
$filename = basename($_FILES['uploadedfile']['name']);
if( !preg_match('/^[\w_\.\-]+$/', $filename) ){
	echo sprintf("Invalid filename: %s", $filename);
	exit;
}

$full_path = sprintf("pics/%s", $filename);
if( move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $full_path) ){
	header("Location: photo.php");
	exit;
}else{
	echo sprintf("upload failure:", $filename);
	exit;
}
?>
