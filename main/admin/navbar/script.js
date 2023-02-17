const productList = document.querySelector(".product-list");
const addButton = document.querySelector(".add-button");

// Function to add a new item to the list
function addItem() {
  const itemName = prompt("Enter the name of the new item:");
  if (itemName !== null && itemName !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="product-name">${itemName}</div>
      <div class="buttons">
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      </div>
    `;
    productList.appendChild(li);
  }
}

// Function to edit an existing item in the list
function editItem(event) {
  const li = event.target.closest("li");
  const productName = li.querySelector(".product-name");
  const newName = prompt("Enter the new name for the item:");
  if (newName !== null && newName !== "") {
    productName.textContent = newName;
  }
}

// Function to delete an item from the list
function deleteItem(event) {
  const li = event.target.closest("li");
  productList.removeChild(li);
}

addButton.addEventListener("click", addItem);

productList.addEventListener("click", event => {
  if (event.target.classList.contains("edit-button")) {
    editItem(event);
  } else if (event.target.classList.contains("delete-button")) {
    deleteItem(event);
  }
});
function deleteItem(id) {
  // Send an AJAX request to the server to delete the item from the database
  $.ajax({
    url: 'delete-item.php',
    type: 'POST',
    data: { id: id },
    success: function(response) {
      // If the server successfully deletes the item from the database, remove it from the list on the page
      if (response.success) {
        removeFromList(id);
      }
    },
    error: function() {
      alert('An error occurred while deleting the item from the database.');
    }
  });
}
function editItem(id, name) {
  // Send an AJAX request to the server to update the item in the database
  $.ajax({
    url: 'edit-item.php',
    type: 'POST',
    data: { id: id, name: name },
    success: function(response) {
      // If the server successfully updates the item in the database, update it in the list on the page
      if (response.success) {
        updateItemInList(response.item);
      }
    },
    error: function() {
      alert('An error occurred while updating the item in the database.');
    }
  });
}
function addItem(name) {
  // Send an AJAX request to the server to add the item to the database
  $.ajax({
    url: 'add-item.php',
    type: 'POST',
    data: { name: name },
    success: function(response) {
      // If the server successfully adds the item to the database, add it to the list on the page
      if (response.success) {
        addToList(response.item);
      }
    },
    error: function() {
      alert('An error occurred while adding the item to the database.');
    }
  });
}
