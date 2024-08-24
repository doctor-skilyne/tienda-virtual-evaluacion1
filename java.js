const cartIcon = document.getElementById('cart-icon');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-button');
const cart = document.getElementById('cart');

let cartItems = [];

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    if (cartItems.length > 0) {
        cartIcon.style.display = 'block';
        cart.style.display = 'block';
    } else {
        cartIcon.style.display = 'none';
        cart.style.display = 'none';
    }
}

function addToCart(name, price, image) {
    cartItems.push({ name, price, image });
    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function handleCheckout() {
    if (cartItems.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    alert('Compra exitosa. ¡Gracias por tu compra!');
    cartItems = [];
    updateCart();
}

document.querySelectorAll('.carousel-item button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const name = item.querySelector('h3').textContent;
        const price = parseFloat(item.querySelector('p').textContent.replace('$', ''));
        const image = item.querySelector('img').src;

        addToCart(name, price, image);
    });
});

checkoutButton.addEventListener('click', handleCheckout);

cartIcon.addEventListener('click', () => {
    cart.scrollIntoView({ behavior: 'smooth' });
});
