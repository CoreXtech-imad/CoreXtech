// Add order form submission
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const apiURL = "https://sheetdb.io/api/v1/l00jco8jl40im"; // 🔴 Replace with your SheetDB API URL

    const order = {
        product: document.getElementById("product-name").textContent,
        fullname: this.fullname.value,
        phone: this.phone.value,
        address: this.address.value,
        quantity: this.quantity.value,
        total: document.getElementById("total-price").textContent
    };

    fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: [order] })
        })
        .then(res => res.json())
        .then(response => {
            alert("✅ Order saved successfully!");
            this.reset();
        })
        .catch(err => {
            alert("❌ Error: " + err.message);
        });
});

// product.js
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = products[id];

    if (!product) {
        document.querySelector(".product-landing").innerHTML = "<h2>Product not found.</h2>";
        return;
    }

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("new-price").textContent = `$${product.price.toFixed(2)}`;
    document.getElementById("old-price").textContent = `$${product.oldPrice.toFixed(2)}`;
    document.getElementById("product-image").src = product.image;
    document.getElementById("stock").textContent = `⚠️ Only ${product.stock} left in stock!`;

    // Features
    const featuresList = document.getElementById("features");
    product.features.forEach(f => {
        const li = document.createElement("li");
        li.textContent = `✅ ${f}`;
        featuresList.appendChild(li);
    });

    // Update total price based on quantity
    const quantityInput = document.querySelector('input[name="quantity"]');
    const totalPriceElem = document.getElementById("total-price");

    function updateTotal() {
        const qty = parseInt(quantityInput.value) || 1;
        totalPriceElem.textContent = `$${(product.price * qty).toFixed(2)}`;
    }
    quantityInput.addEventListener("change", updateTotal);
    updateTotal();
});