<?php
// Check if the form was submitted
$itemName = $_POST["itemName"];
$itemQty = $_POST["itemQty"];
$itemDay = $_POST["day_name"];



    
        include_once 'config.php';
        include 'dbConfig.php';
        

        // Insert the new item into the database
       // Insert the new item into the database
$sql = "INSERT INTO items (item_name, quantity, day_name) VALUES ('$itemName', '$itemQty', '$itemDay')";
if ($db->query($sql) === TRUE) {
  echo "Item added successfully";
} else {
  echo "Error: " . $sql . "<br>" . $db->error;
}




$db->close();
?>
?>
