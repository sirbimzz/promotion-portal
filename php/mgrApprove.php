<?php 

include 'config/conn.php';

$orgUnit=$_POST['orgUnit'];
$staffCat=$_POST['staffCat'];
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
AND orgUnit='$orgUnit'
AND staffCat='$staffCat'
AND genCriteria='$genCriteria'";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>