<?php
// Include the database configuration
include 'config.php';
include 'dbConfig.php';

// Get the item ID, name, and quantity from the POST data
$itemId = $_POST['itemId'];
$itemName = $_POST['itemName'];
$itemQuantity = $_POST['itemQuantity'];

// Check if the variables are set
if (!isset($itemId, $itemName, $itemQuantity)) {
  echo "Invalid input";
  exit;
}

// Prepare the SQL statement with a parameterized query
$sql = "UPDATE items SET item_name = ?, quantity = ?, day_name = 'monday' WHERE id = ?";

if ($stmt = $db->prepare($sql)) {
  // Bind the parameters
  $stmt->bind_param("ssi", $itemName, $itemQuantity, $itemId);

  // Execute the statement
  if ($stmt->execute()) {
    echo "Item updated successfully";
  } else {
    echo "Failed to update item: " . $stmt->error;
  }

  // Close the statement
  $stmt->close();
} else {
  echo "Failed to prepare statement: " . $db->error;
}

// Close the database connection
$db->close();
?>
