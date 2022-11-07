<?php 

include 'config/conn.php';

//$id=$_POST['id'];
$dateRaised=$_POST['dateRaised'];
$fUpdated=$_POST['fUpdated'];
$vUpdated=$_POST['vUpdated'];
$updatedBy=$_POST['updatedBy'];
$sUpdated=$_POST['sUpdated'];

$sql = "INSERT INTO promLog 
VALUES ('$dateRaised','$fUpdated','$vUpdated','$updatedBy','$sUpdated')";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>