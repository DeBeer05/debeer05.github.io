<!DOCTYPE html>
<html>
<head>
	<title>Shopping List</title>
</head>
<body>
	<div>
		<h1>Shopping List</h1>
		<table>
			<tr>
				<th></th>
				<th></th>
			</tr>
			<?php
				include_once 'config.php';
				include 'dbConfig.php';
				// Retrieve items from the database
				$sql = "SELECT * FROM items";
				$result = mysqli_query($db, $sql);
				// Display each item in the table
				if (mysqli_num_rows($result) > 0) {
					while($row = mysqli_fetch_assoc($result)) {
						echo "<div class='item' data-id='" . $row["id"] . "' data-name='" . $row["item_name"] . "' data-quantity='" . $row["quantity"] . "'>" . $row["item_name"] . "<input type='number' value='" . $row["quantity"] . "'><button class='removeBtn'>Remove</button><button class='editBtn' onclick='editItem(this)'>Edit</button><input type='hidden' name='id' value='" . $row["id"] . "'>" . "</div>";

					}
				} else {
					echo "No items in shopping list.";
				}

				// Close the database connection
				mysqli_close($db);
			?>
		</table>
    <div id="editItemModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Edit Item</h2>
    <label for="editItemId">ID:</label>
    <input type="text" id="editItemId" readonly>
    <label for="editItemName">Name:</label>
    <input type="text" id="editItemName">
    <label for="editItemQty">Quantity:</label>
    <input type="number" id="editItemQty">
    <button id="saveItemBtn">Save</button>
  </div>
</div>

	</div>
  <script>
// Get the edit modal and its child elements
var editModal = document.getElementById("editItemModal");
var editItemId = document.getElementById("editItemId");
var editItemName = document.getElementById("editItemName");
var editItemQty = document.getElementById("editItemQty");
var saveItemBtn = document.getElementById("saveItemBtn");

// Function to open the edit modal and populate it with data
function editItem(editBtn) {
  // Get the item data from the parent element
  var itemDiv = editBtn.parentNode;
  var itemId = itemDiv.getAttribute("data-id");
  var itemName = itemDiv.getAttribute("data-name");
  var itemQty = itemDiv.getAttribute("data-quantity");
  // Populate the edit modal with the item data
  editItemId.value = itemId;
  editItemName.value = itemName;
  editItemQty.value = itemQty;
  // Show the edit modal
  editModal.style.display = "block";
}

// Function to close the edit modal
function closePopup() {
  editModal.style.display = "none";
}

// Function to handle the save button click event
saveItemBtn.onclick = function() {
  // Get the values from the input fields
  var itemId = editItemId.value;
  var itemName = editItemName.value;

  var itemQty = editItemQty.value;
  // Send a POST request to update_item.php with the item data
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "update_item.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // If the update was successful, close the popup
        closePopup();
        // Reload the page to show the updated data
        location.reload();
      } else {
        // If the update failed, show an error message
        alert("Failed to update item: " + xhr.responseText);
      }
    }
  };
  

  var send = xhr.send("itemId=" + encodeURIComponent(itemId) + "&itemName=" + encodeURIComponent(itemName) + "&itemQuantity=" + encodeURIComponent(itemQty));

  console.log(send);
  console.log(itemName);
  console.log(itemId);
  console.log(itemQty);
};
// Get all the remove buttons
var removeBtns = document.querySelectorAll('.removeBtn');

// Loop through each button and add a click event listener
removeBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    // Get the item ID from the data attribute of the parent element
    var itemId = btn.parentNode.dataset.id;

    // Send a DELETE request to delete_item.php with the item ID
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'delete_item.php?id=' + itemId, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // If the deletion was successful, remove the item from the page
          btn.parentNode.remove();
        } else {
          // If the deletion failed, show an error message
          alert('Failed to delete item: ' + xhr.responseText);
        }
      }
    };
    xhr.send();
  });
});





</script>  
</body>
</html>
