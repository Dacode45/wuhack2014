<html>
<head>
</head>
<body>
<?php
	$files = scandir("testImages");	
	foreach($files as $file) {
	if(!($file=="." || $file==".."))
	{
?>
	<img src="<?php echo "testImages/"; echo $file; ?>" height="800em" width="600em"/>		
	<!--  Change "testImages/" to server directory that stores images; also delete width and height when done!!-->
	<br />
<?php }} 

?>
<form enctype="multipart/form-data"  action="savePic.php" method="POST">
	<p>
		<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
		<label for="uploadfile_input">Choose a file to upload:</label> <input name="uploadedfile" type="file" id="uploadfile_input" />
	</p>
	<p>
		<input type="submit" value="Upload File" />
	</p>
</form>

</body>
</html>