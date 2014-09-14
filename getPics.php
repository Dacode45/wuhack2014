<?php
require 'database.php';

$pageIndex = (int)htmlentities($_POST['pageIndex']);
$startingPicIndex = 5 * $pageIndex;

$stmt = $mysqli->prepare(
        sprintf("select name, rating, fileName, timeCreated from pics order by timeCreated LIMIT %s,5", $startingPicIndex));
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