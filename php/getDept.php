<?php 
include 'config/conn.php';

$query = 'SELECT * FROM promDept';   
$stmt = $conn->query( $query );   
$data = array();
while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){ 
  $row_array['id'] = $row['id'];
  $row_array['dept'] = $row['dept'];
  $row_array['deptName'] = $row['deptName'];
  $row_array['div'] = $row['div'];
  $row_array['sortHRO'] = $row['sortHRO'];
  
  array_push($data, $row_array);
}
echo json_encode($data);


?>