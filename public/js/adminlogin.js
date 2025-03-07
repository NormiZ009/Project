// Load products on page load
window.addEventListener('load', async function () {
    loadProducts();
});

let editingProductId = null; // Track the product being edited

// Fetch and Display Products
async function loadProducts() {
    try {
        const response = await fetch('/admin/products'); // Ensure this matches your backend route
        const products = await response.json();

        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear existing products

        products.forEach(product => {
            productList.innerHTML += `
                <div class="product-card" data-id="${product._id}">
                    <div class="product-info">
                        <h3>${product.productName}</h3>
                        <p>Price: $${product.price}</p>
                        <p>Category: ${product.category}</p>
                    </div>
                    <div class="product-actions">
                        <button class="btn edit-btn" onclick="editProduct('${product._id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn delete-btn" onclick="deleteProduct('${product._id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Edit Product Function (Populate Add Product Form Instead of Modal)
async function editProduct(productId) {
    try {
        const response = await fetch(`/admin/products/${productId}`);
        const product = await response.json();

        // Populate product details in Add Product form
        document.getElementById('productId').value = productId;
        document.getElementById('productName').value = product.productName;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productCategory').value = product.category;
        
        // Store the product ID to track editing
        editingProductId = productId;

        // Change button text to indicate update mode
        document.getElementById('submitButton').textContent = "Update Product";

        // Scroll to the form
        document.getElementById('productForm').scrollIntoView({ behavior: "smooth" });

    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

// Handle Add / Edit Product Form Submission
// document.getElementById('productForm').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("productName", document.getElementById('productName').value);
//     formData.append("price", document.getElementById('productPrice').value);
//     formData.append("description", document.getElementById('productDescription').value);
//     formData.append("category", document.getElementById('productCategory').value);

//     const imageInput = document.getElementById('productImage').files[0];
//     if (imageInput) {
//         formData.append("proimage", imageInput);
//     }

//     try {
//         let response;
//         if (editingProductId) {
//             // Update product if editing
//             response = await fetch(`/admin/products/${editingProductId}`, {
//                 method: 'PUT',
//                 body: formData
//             });
//         } else {
//             // Create a new product
//             response = await fetch('/admin/dashboard', {
//                 method: 'POST',
//                 body: formData
//             });
//         }

//         if (response.ok) {
//             loadProducts(); // Reload product list
//             resetForm(); // Reset form after submission
//             showNotification(editingProductId ? 'Product updated successfully!' : 'Product added successfully!', 'success');
//         } else {
//             showNotification('Error saving product!', 'error');
//         }
//     } catch (error) {
//         console.error('Error submitting product:', error);
//     }
// });

// Reset Form After Submission
function resetForm() {
    document.getElementById('productForm').reset();
    editingProductId = null;
    document.getElementById('submitButton').textContent = "Add Product";
}

// Delete Product Function (Open Delete Modal)
let productToDelete = null;
function deleteProduct(productId) {
    productToDelete = productId;
    document.getElementById('deleteModal').classList.add('active');
}

// Close Delete Modal
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    productToDelete = null;
}

// Confirm Delete Handler
document.getElementById('confirmDelete').addEventListener('click', async function () {
    if (!productToDelete) return;

    try {
        const response = await fetch(`/admin/products/${productToDelete}`, { method: 'DELETE' });

        if (response.ok) {
            closeDeleteModal();
            loadProducts(); // Reload product list
            showNotification('Product deleted successfully!', 'success');
        } else {
            showNotification('Error deleting product!', 'error');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
});

// Show Notification Function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
        ${message}
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
