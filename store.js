// JavaScript for Modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const buyBtns = document.querySelectorAll('.buy-btn');
    
    // Add event listeners to open modal when a product is clicked
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = card.querySelector('h2').innerText;
            const productDesc = card.querySelector('p').innerText;
            const productPrice = card.querySelector('.price').innerText;
            const productImage = card.querySelector('img').src;

            // Set modal content
            document.getElementById('modal-title').innerText = productName;
            document.getElementById('modal-description').innerText = productDesc;
            document.getElementById('modal-price').innerText = productPrice;
            document.getElementById('modal-img').src = productImage;

            // Show the modal
            modal.classList.add('show');
        });
    });

    // Close the modal when the close button is clicked
    closeModalBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    // Close the modal when clicking outside the modal content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});
