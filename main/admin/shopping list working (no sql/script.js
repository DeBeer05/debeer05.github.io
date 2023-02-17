document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.querySelector(".add-button");
    const productList = document.querySelector(".product-list");
  
    addButton.addEventListener("click", function() {
      const itemCount = productList.querySelectorAll("li").length + 1;
      const newItem = document.createElement("li");
      newItem.innerHTML = `<span class="product-name">New Item ${itemCount}</span><button class="edit-button">Edit</button><button class="delete-button">Delete</button>`;
      productList.appendChild(newItem);
    });
  
    productList.addEventListener("click", function(event) {
      const target = event.target;
  
      if (target.classList.contains("delete-button")) {
        const item = target.parentNode;
        item.parentNode.removeChild(item);
      } else if (target.classList.contains("edit-button")) {
        const item = target.parentNode;
        const productName = item.querySelector(".product-name");
        const newProductName = prompt("Enter the new product name:", productName.textContent);
  
        if (newProductName) {
          productName.textContent = newProductName;
        }
      }
    });
  });
  const navIcon = document.getElementById("nav-icon");
  const navbarItems = document.getElementById("navbar-items");
  
  navIcon.addEventListener("click", () => {
    navbarItems.classList.toggle("active");
  });
  
    