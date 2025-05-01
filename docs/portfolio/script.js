class Carousel {
    constructor(carouselElement) {
        this.carouselContainer = carouselElement.querySelector('.carousel-container');
        this.images = carouselElement.querySelectorAll('.carousel-image');
        this.prevButton = carouselElement.parentElement.querySelector('.prev'); // Updated to find the button outside the carousel
        this.nextButton = carouselElement.parentElement.querySelector('.next'); // Updated to find the button outside the carousel
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.closeLightbox = document.getElementById('close-lightbox');
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.updateCarousel();

        this.nextButton.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.updateCarousel();
        });

        this.prevButton.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.updateCarousel();
        });

        this.images.forEach(image => {
            image.addEventListener('click', () => {
                this.lightboxImage.src = image.src;
                this.lightbox.style.display = 'flex';
            });
        });

        this.closeLightbox.addEventListener('click', () => {
            this.lightbox.style.display = 'none';
        });

        this.lightbox.addEventListener('click', (event) => {
            if (event.target === this.lightbox) {
                this.lightbox.style.display = 'none';
            }
        });
    }

    updateCarousel() {
        const imageWidth = this.images[0].clientWidth + 20; // Include margin-right
        const offset = -this.currentIndex * imageWidth;
        this.carouselContainer.style.transform = `translateX(${offset}px)`;
    }
}

// Initialize all carousels on the page
document.querySelectorAll('.carousel').forEach(carouselElement => {
    new Carousel(carouselElement);
});

