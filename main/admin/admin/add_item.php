<?php
// Check if the form was submitted
$itemName = $_POST["itemName"];
$itemQty = $_POST["itemQty"];




    
        include_once 'config.php';
        include 'dbConfig.php';
        

        // Insert the new item into the database
       // Insert the new item into the database
$sql = "INSERT INTO extra (item_name, quantity) VALUES ('$itemName', '$itemQty')";
if ($db->query($sql) === TRUE) {
  echo "Item added successfully";
} else {
  echo "Error: " . $sql . "<br>" . $db->error;
}




$db->close();
?>
?>
