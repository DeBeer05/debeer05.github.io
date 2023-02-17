<?php
// Include the database configuration
include 'config.php';
include 'dbConfig.php';

// Get the item ID, name, and quantity from the POST data
$itemId = $_POST['id'];
$itemName = $_POST['item_name'];
$itemQuantity = $_POST['quantity'];

// Check if the variables are set
if (!isset($itemId, $itemName, $itemQuantity)) {
  echo "Invalid input";
  exit;
}

// Escape special characters in the input data
$itemName = mysqli_real_escape_string($db, $itemName);
$itemQuantity = mysqli_real_escape_string($db, $itemQuantity);

// Update the database table with the new values
$sql = "UPDATE extra SET item_name='$itemName', quantity='$itemQuantity' WHERE id=$itemId";

if (mysqli_query($db, $sql)) {
  echo "Item updated successfully";
} else {
  echo "Failed to update item: " . mysqli_error($db);
}

// Close the database connection
mysqli_close($db);
?>
