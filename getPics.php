<?php
require 'database.php';

header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

$picsSoFar = (int)htmlentities($_POST['pageIndex']);

$stmt = $mysqli->prepare(
        sprintf("select name, rating, fileName, timeCreated from pics order by timeCreated ASC LIMIT %s,1", $picsSoFar));
if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    echo json_encode(array(
        'success' => False,
        'message' => 'DB query fail'
        ));
    exit;
}
$stmt->execute();
$stmt->bind_result($name, $rating, $fileName, $timeCreated);
$data = array();
while($stmt->fetch()) {
    $element = array(
        'name' => $name,
        'rating' => $rating,
        'fileName' => $fileName,
        'timestamp' => $timeCreated
        );
    array_push($data, $element);
}
$stmt->close();
echo json_encode(array(
    'success' => True,
    'data' => $data
    ));
exit;
?>
