<?php 
include 'config/conn.php';

$query = 'SELECT * FROM promData';   
$stmt = $conn->query( $query );   
$data = array();
while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){ 
  $row_array['id'] = $row['id'];
  $row_array['actionDate'] = $row['actionDate'];
  $row_array['dateRaised'] = $row['dateRaised'];
  $row_array['persName'] = $row['persName'];
  $row_array['empGroup'] = $row['empGroup'];
  $row_array['persNo'] = $row['persNo'];
  $row_array['empSubgroup'] = $row['empSubgroup'];
  $row_array['persArea'] = $row['persArea'];
  $row_array['orgUnit'] = $row['orgUnit'];
  $row_array['persPosition'] = $row['persPosition'];
  $row_array['persSubarea'] = $row['persSubarea'];
  $row_array['psGroup'] = $row['psGroup'];
  $row_array['headRoom'] = $row['headRoom'];
  $row_array['refIndic'] = $row['refIndic'];
  $row_array['jobGroup'] = $row['jobGroup'];
  $row_array['avgIPF'] = $row['avgIPF'];
  $row_array['newSG'] = $row['newSG'];
  $row_array['yr1IPF'] = $row['yr1IPF'];
  $row_array['lastCep'] = $row['lastCep'];
  $row_array['yr2IPF'] = $row['yr2IPF'];
  $row_array['headrmCriteria'] = $row['headrmCriteria'];
  $row_array['yr3IPF'] = $row['yr3IPF'];
  $row_array['genCriteria'] = $row['genCriteria'];
  $row_array['promYr'] = $row['promYr'];
  $row_array['ipfCriteria'] = $row['ipfCriteria'];
  $row_array['yrsOnSG'] = $row['yrsOnSG'];
  $row_array['promStatus'] = $row['promStatus'];
  $row_array['dateEmployed'] = $row['dateEmployed'];
  $row_array['promYrCriteria'] = $row['promYrCriteria'];
  $row_array['genderKey'] = $row['genderKey'];
  $row_array['persNation'] = $row['persNation'];
  $row_array['maritalStatus'] = $row['maritalStatus'];
  $row_array['persState'] = $row['persState'];
  $row_array['actionType'] = $row['actionType'];
  $row_array['relDenom'] = $row['relDenom'];
  $row_array['empAge'] = $row['empAge'];
  $row_array['actionReason'] = $row['actionReason'];
  $row_array['empStatus'] = $row['empStatus'];
  $row_array['annSalary'] = $row['annSalary'];
  $row_array['empYears'] = $row['empYears'];
  $row_array['birthDate'] = $row['birthDate'];
  $row_array['geoZone'] = $row['geoZone'];
  $row_array['noCh'] = $row['noCh'];
  $row_array['geoLoc'] = $row['geoLoc'];
  $row_array['salCurr'] = $row['salCurr'];
  $row_array['gtsComm'] = $row['gtsComm'];
  $row_array['lgaText'] = $row['lgaText'];
  $row_array['pArea'] = $row['pArea'];
  $row_array['costCenter'] = $row['costCenter'];
  $row_array['workRule'] = $row['workRule'];
  $row_array['costCtr'] = $row['costCtr'];
  $row_array['gmReason'] = $row['gmReason'];
  $row_array['mgrComment'] = $row['mgrComment'];
  $row_array['toPromote'] = $row['toPromote'];
  $row_array['hrtReason'] = $row['hrtReason'];
  $row_array['sbCriteria'] = $row['sbCriteria'];
  $row_array['mgrReason'] = $row['mgrReason'];
  $row_array['sortHRO'] = $row['sortHRO'];
  $row_array['sConsider'] = $row['sConsider'];
  $row_array['trackStatus'] = $row['trackStatus'];
  $row_array['staffCat'] = $row['staffCat'];
       
  array_push($data, $row_array);
}
echo json_encode($data);

?>