<?php

$lat = $_POST['latitude'];
$long = $_POST['longitude'];
$lati = $_GET['lati'];
$latis = (string) $lati;
$longi = $_GET['longi'];
$longis = (string) $longi;

$key = (string) "AIzaSyC0GUd7gFoVVt03p9-hR1dLfsjmrUm9pTM";


$url = sprintf("https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&key=%s", $latis, $longis, $key);

$json = file_get_contents($url);
$data = json_decode($json);

echo $components = $data->results[0]->address_components[3]->long_name;
?>