
const carouselContainer = document.querySelector('.carousel-container');
const images = document.querySelectorAll('.carousel-image');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.getElementById('close-lightbox');

let currentIndex = 0;

function updateCarousel() {
    const imageWidth = images[0].clientWidth + 20; // Include margin-right
    const offset = -currentIndex * imageWidth;
    carouselContainer.style.transform = `translateX(${offset}px)`;
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop back to the last image
    updateCarousel();
});

images.forEach(image => {
    image.addEventListener('click', function () {
        lightboxImage.src = this.src;
        lightbox.style.display = 'flex';
    });
});

closeLightbox.addEventListener('click', function () {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

