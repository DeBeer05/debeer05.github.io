<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MySQL Table Example</title>
    <link rel="stylesheet" href="style.css">
</head>
<button class="button-primary" name="extra" onclick="window.location.href='admin/admin.php'">naar extra's</button> <input class="button-secondary" name="sign-out" type="button" value="Uitloggen" onclick="signOut()">


<body>

<?php
include_once 'config.php';
include 'dbConfig.php';

// Query database for data
$sql = "SELECT * FROM items WHERE day_name = 'maandag'";
$result = $db->query($sql);
?>
<div class="table-container">

<table>
  <caption>
    <strong>Maandag</strong> 
    <div class="item" data-date="<input type='date'>"></div>
  </caption>
    <tr>
        <th>Naam</th>
        <th>Hoeveelheid</th>
        <th>Acties</th>
        
        
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
  <tr>
    <td class="data-item-name">
    <div class='item' data-id='<?php echo $row["id"]; ?>' data-name='<?php echo $row["item_name"]; ?>' data-quantity='<?php echo $row["quantity"]; ?>' data-day-name='<?php echo $row["day_name"]; ?>'><?php echo $row['item_name']; ?></div>
    </td>
    <td class="data-quantity"><?php echo $row['quantity']; ?></td>
    
    <td>
      <button class="edit-btn" onclick="editItem(this)">Aanpassen</button> <br> <button class="remove-btn" onclick="removeItem(this)">Verwijder</button> <br> 
    </td>
    
  </tr>
<?php endwhile; ?>
  
</table>
<?php
// Query database for data
$sql = "SELECT * FROM items WHERE day_name = 'dinsdag'";
$result = $db->query($sql);
?>

<table>
  <caption> <strong>Dinsdag</strong> </caption>
    <tr>
        <th>Naam</th>
        <th>Hoeveelheid</th>
        <th>Acties</th>
        
        
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
  <tr>
    <td class="data-item-name">
    <div class='item' data-id='<?php echo $row["id"]; ?>' data-name='<?php echo $row["item_name"]; ?>' data-quantity='<?php echo $row["quantity"]; ?>' data-day-name='<?php echo $row["day_name"]; ?>'><?php echo $row['item_name']; ?></div>
    </td>
    <td class="data-quantity"><?php echo $row['quantity']; ?></td>
    <td>
      <button class="edit-btn" onclick="editItem(this)">Aanpassen</button> <br> <button class="remove-btn" onclick="removeItem(this)">Verwijder</button>
    </td>
    
  </tr>
<?php endwhile; ?>
  
</table>
    
<?php
// Query database for data
$sql = "SELECT * FROM items WHERE day_name = 'woensdag'";
$result = $db->query($sql);
?>


<table>
  <caption> <strong>Woensdag</strong> </caption>
    <tr>
        <th>Naam</th>
        <th>Hoeveelheid</th>
        <th>Acties</th>
        
        
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
  <tr>
    <td class="data-item-name">
    <div class='item' data-id='<?php echo $row["id"]; ?>' data-name='<?php echo $row["item_name"]; ?>' data-quantity='<?php echo $row["quantity"]; ?>' data-day-name='<?php echo $row["day_name"]; ?>'><?php echo $row['item_name']; ?></div>
    </td>
    <td class="data-quantity"><?php echo $row['quantity']; ?></td>
    <td>
      <button class="edit-btn" onclick="editItem(this)">Aanpassen</button> <br> <button class="remove-btn" onclick="removeItem(this)">Verwijder</button>
    </td>
    
  </tr>
<?php endwhile; ?>
  
</table>
    
<?php
// Query database for data
$sql = "SELECT * FROM items WHERE day_name = 'donderdag'";
$result = $db->query($sql);
?>

<table>
  <caption> <strong>Donderdag</strong> </caption>
    <tr>
        <th>Naam</th>
        <th>Hoeveelheid</th>
        <th>Acties</th>
        
        
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
  <tr>
    <td class="data-item-name">
    <div class='item' data-id='<?php echo $row["id"]; ?>' data-name='<?php echo $row["item_name"]; ?>' data-quantity='<?php echo $row["quantity"]; ?>' data-day-name='<?php echo $row["day_name"]; ?>'><?php echo $row['item_name']; ?></div>
    </td>
    <td class="data-quantity"><?php echo $row['quantity']; ?></td>
    <td>
      <button class="edit-btn" onclick="editItem(this)">Aanpassen</button> <br> <button class="remove-btn" onclick="removeItem(this)">Verwijder</button> <br> <div class="data-day"><?php echo $row["day_name"]; ?></div>
    </td>
    
  </tr>
<?php endwhile; ?>
  
</table>
    
<?php
// Query database for data
$sql = "SELECT * FROM items WHERE day_name = 'vrijdag'";
$result = $db->query($sql);
?>

<table>
  <caption> <strong>Vrijdag</strong> </caption>
    <tr>
        <th>Naam</th>
        <th>Hoeveelheid</th>
        <th>Acties</th>
        
        
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
  <tr>
    <td class="data-item-name">
    <div class='item' data-id='<?php echo $row["id"]; ?>' data-name='<?php echo $row["item_name"]; ?>' data-quantity='<?php echo $row["quantity"]; ?>' data-day-name='<?php echo $row["day_name"]; ?>'><?php echo $row['item_name']; ?></div>
    </td>
    <td class="data-quantity"><?php echo $row['quantity']; ?></td>
    <td>
      <button class="edit-btn" onclick="editItem(this)">Aanpassen</button> <br> <button class="remove-btn" onclick="removeItem(this)">Verwijder</button>
    </td>
    
  </tr>
<?php endwhile; ?>
  
</table>
    
<?php
// Query database for data
$sql = "SELECT * FROM items WHERE day_name = 'zaterdag'";
$result = $db->query($sql);
?>

<table>
  <caption> <strong>Zaterdag</strong> </caption>
    <tr>
        <th>Naam</th>
        <th>Hoeveelheid</th>
        <th>Acties</th>
        
        
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
  <tr>
    <td class="data-item-name">
    <div class='item' data-id='<?php echo $row["id"]; ?>' data-name='<?php echo $row["item_name"]; ?>' data-quantity='<?php echo $row["quantity"]; ?>' data-day-name='<?php echo $row["day_name"]; ?>'><?php echo $row['item_name']; ?></div>
    </td>
    <td class="data-quantity"><?php echo $row['quantity']; ?></td>
    
    <td>
      <button class="edit-btn" onclick="editItem(this)">Aanpassen</button> <br> <button class="remove-btn" onclick="removeItem(this)">Verwijder</button>
    </td>
    
  </tr>
<?php endwhile; ?>
  
</table>
    
<?php
// Query database for data
$sql = "SELECT * FROM items WHERE day_name = 'zondag'";
$result = $db->query($sql);
?>

<table>
  <caption> <strong>Zondag</strong>
 </caption>
    <tr>
        <th>Naam</th>
        <th>Hoeveelheid</th>
        <th>Acties</th>
        
        
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
  <tr>
    <td class="data-item-name">
    <div class='item' data-id='<?php echo $row["id"]; ?>' data-name='<?php echo $row["item_name"]; ?>' data-quantity='<?php echo $row["quantity"]; ?>' data-day-name='<?php echo $row["day_name"]; ?>'><?php echo $row['item_name']; ?></div>
    </td>
    <td class="data-quantity"><?php echo $row['quantity']; ?></td>
    <td>
      <button class="edit-btn" onclick="editItem(this)">Aanpassen</button> <br> <button class="remove-btn" onclick="removeItem(this)">Verwijder</button>
    </td>
   
  </tr>
  
<?php endwhile; ?>

</table>

 
     
    </div>
    <td>
    <button class="add-btn" onclick="addItem(this)">Voeg product toe</button>
    </td>
<div id="editModal" class="modal">
  <div class="modal-content">
  <span class="close" id="edit-close-btn">&times;</span>
  <label for="edit-day-name">Dag:</label>
    <select id="edit-day-name" name="day_name">
      <option value="maandag">Maandag</option>
      <option value="dinsdag">Dinsdag</option>
      <option value="woensdag">Woensdag</option>
      <option value="donderdag">Donderdag</option>
      <option value="vrijdag">Vrijdag</option>
      <option value="zaterdag">Zaterdag</option>
      <option value="zondag">Zondag</option>
    </select>
      <input type="hidden" name="id" id="edit-id"></input>
      <label for="edit-item-name">Naam:</label>
      <input type="text" name="item_name" id="edit-item-name">
      <label for="edit-quantity">Hoeveelheid:</label>
      <input type="text" name="quantity" id="edit-quantity">
      <button type="submit" name="submit" id="edit-submit-btn">Opslaan</button>
    
  </div>
</div>
<div id="addItemModal" class="modal">
  <div class="modal-content">
    <span class="close" id="add-close-btn">&times;</span>
    <h2>Add Item</h2>
    <form>
    
      <select id="day_name" name="day_name">
        <option value="maandag">Maandag</option>
        <option value="dinsdag">Dinsdag</option>
        <option value="woensdag">Woensdag</option>
        <option value="donderdag">Donderdag</option>
        <option value="vrijdag">Vrijdag</option>
        <option value="zaterdag">Zaterdag</option>
        <option value="zondag">Zondag</option>
      </select>
      <br>
      <label for="add-item-name">Naam:</label>
      <input type="text" id="add-item-name" name="add-item-name">
      <label for="add-quantity">Hoeveelheid:</label>
      <input type="text" id="add-quantity" name="add-quantity">
      <button type="button" id="add-submit-btn">Save</button>
    </form>
  </div>
</div>

<script>


// Get the edit modal and its child elements
// Get the edit modal and its child elements

var editModal = document.getElementById("editModal");
var editItemId = document.getElementById("edit-id");
var editItemName = document.getElementById("edit-item-name");
var editItemQty = document.getElementById("edit-quantity");
var saveItemBtn = document.getElementById("edit-submit-btn");
var dayNameSelect  = document.getElementById("edit-day-name");

// Function to open the edit modal and populate it with data
function editItem(editBtn) {
  // Get the item data from the parent element
  var itemDiv = editBtn.parentNode.parentNode.querySelector('.item');
  var itemId = itemDiv.getAttribute("data-id");
  var itemName = itemDiv.getAttribute("data-name");
  var itemQty = itemDiv.getAttribute("data-quantity");
  var itemDay = itemDiv.getAttribute("data-day-name");
  // Populate the edit modal with the item data
  editItemId.value = itemId;
  editItemName.value = itemName;
  editItemQty.value = itemQty;
  var itemDay = itemDiv.getAttribute("data-day-name");
  for (var i = 0; i < dayNameSelect.options.length; i++) {
    if (dayNameSelect.options[i].value === itemDay) {
      dayNameSelect.options[i].selected = true;
      break;
    }
  }
  // Show the edit modal
  editModal.style.display = "block";
}
editModal.addEventListener('show.bs.modal', function (event) {
  // Get the button that triggered the modal
  var button = event.relatedTarget;
  // Get the item data from the parent element
  var itemDiv = button.parentNode.parentNode.querySelector('.item');
  var itemId = itemDiv.getAttribute("data-id");
  var itemName = itemDiv.getAttribute("data-name");
  var itemQty = itemDiv.getAttribute("data-quantity");
  var itemDay = itemDiv.getAttribute("data-day-name");
  // Populate the edit modal with the item data
  editItemId.value = itemId;
  editItemName.value = itemName;
  editItemQty.value = itemQty;
  // Set the selected attribute for the corresponding option element
  for (var i = 0; i < dayNameSelect.options.length; i++) {
    if (dayNameSelect.options[i].value === itemDay) {
      dayNameSelect.options[i].selected = true;
      break;
    }
  }
});



// Function to close the edit modal
function closePopup() {
  editModal.style.display = "none";
  dayNameSelect.selectedIndex = 0;
}
var closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function() {
  closePopup();
});

// Function to handle the save button click event
saveItemBtn.onclick = function() {
  // Get the values from the input fields
  var itemId = editItemId.value;
  var itemName = editItemName.value;
  var itemQty = editItemQty.value;
  var itemDay = dayNameSelect.value;
  
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
// If the update failed, display an error message
alert("Er is een fout opgetreden bij het opslaan van het item.");
}
}
};
xhr.send("id=" + itemId + "&item_name=" + itemName + "&quantity=" + itemQty + "&day_name=" + itemDay);
console.log(itemId);
console.log(itemName);
console.log(itemQty);
console.log(itemDay);
console.log(itemDate);
}

// Get the add item modal and its child elements
var addItemModal = document.getElementById("addItemModal");
var addItemCloseBtn = document.getElementById("add-close-btn");
var addItemName = document.getElementById("add-item-name");
var addItemQty = document.getElementById("add-quantity");
var addItemDay = document.getElementById("day_name");
var addItemBtn = document.getElementById("add-submit-btn");

// Function to open the add item modal
function addItem() {
// Show the add item modal
addItemModal.style.display = "block";
}

// Function to close the add item modal
function closeAddItemPopup() {
addItemModal.style.display = "none";
}
addItemCloseBtn.addEventListener("click", function() {
  closeAddItemPopup();
});


// Function to handle the add button click event
addItemBtn.onclick = function() {
  // Get the values from the input fields
  var itemName = addItemName.value;
  var itemQty = addItemQty.value;
  var itemDay = addItemDay.value;

  // Send a POST request to add_item.php with the item data
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "add_item.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // If the add was successful, close the popup
        closeAddItemPopup();
        // Reload the page to show the updated data
        location.reload();
      } else {
        // If the add failed, display an error message
        alert("Er is een fout opgetreden bij het toevoegen van het item.");
      }
    }
  };
  xhr.send("itemName=" + itemName + "&itemQty=" + itemQty + "&day_name=" + itemDay);

  console.log(itemDay);
  console.log(itemName);
  console.log(itemQty);
}

// Function to close the "Add Item" modal
function closeAddItemModal() {
  addItemModal.style.display = "none";
}

// Get the close button and add an event listener to it
var addCloseBtn = document.getElementById("add-close-btn");
addCloseBtn.addEventListener("click", closeAddItemModal);

// get all the remove buttons on the page
function deleteItem(event) {
  const li = event.target.closest("li");
  productList.removeChild(li);
}

var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);


function removeItem(button) {
  var row = button.parentNode.parentNode;
  var id = row.querySelector('.item').dataset.id;

  // Send an AJAX request to remove the row from the database
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'remove_item.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Remove the row from the table
      row.parentNode.removeChild(row);
    } else {
      // Show an alert message
      alert('An error occurred. Please try again later.');
    }
  };
  xhr.send('id=' + encodeURIComponent(id));
  console.log(id);
}

function signOut() {
    // Destroy the current session
    sessionStorage.clear();
    // Redirect to the login page
    window.location.replace("/index.html");
  }










</script>

<?php
// Close MySQL connection
 $db->close();
?>

</script>


</body>
</html>
