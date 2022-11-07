<?php 

include 'config/conn.php';

$sortHRO=$_POST['sortHRO'];
$genCriteria=$_POST['genCriteria'];
$promStatus1=$_POST['promStatus1'];
$promStatus=$_POST['promStatus'];
$toPromote=$_POST['toPromote'];
$trackStatus=$_POST['trackStatus'];

$sql = "UPDATE promData

SET promStatus='$promStatus',
toPromote='$toPromote',
trackStatus='$trackStatus' 
WHERE promStatus='$promStatus1'
AND sortHRO='$sortHRO'
AND genCriteria='$genCriteria'";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>