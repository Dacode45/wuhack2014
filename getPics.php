<?php
require 'database.php';

switch ($_SERVER['HTTP_ORIGIN']) {
    case 'http://from.com': case 'https://from.com':
    header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    break;
}

$pageIndex = (int)htmlentities($_POST['pageIndex']);
$startingPicIndex = 1 * $pageIndex;

$stmt = $mysqli->prepare(
        sprintf("select name, rating, fileName, timeCreated from pics order by timeCreated LIMIT %s,1", $startingPicIndex));
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
