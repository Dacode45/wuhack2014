<?php
require 'database.php';

$pageIndex = 1;//htmlentities($_POST['pageIndex']);
$startingPicIndex = 5 * $pageIndex;

$stmt = $mysqli->prepare(
        sprintf("select name, rating, fileName, timeCreated from pics order by timeCreated LIMIT %s,5", $startingPicIndex));
if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}

$stmt->execute();

$stmt->bind_result($name, $rating, $fileName, $timeCreated);
 
$data = array();
 
while($stmt->fetch()) {
    $element = array(
        'name' => $name,
        'rating' => $rating,
        '$fileName' => $fileName,
        'timestamp' => $timeCreated
    );
    array_push($data, $element);
}
echo json_encode($data);

$stmt->close();

//$results = array();
//while($row = mysql_fetch_array($sql))
//{
//   $results[] = array(
//      'title' => base64_decode($row['title']),
//      'price' => $row['price'],
//      'seller_user' => $row['user']
//   );
//}
//$json = json_encode($results);
?>