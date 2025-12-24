const images = [
  "immagini/1.jpg",
  "immagini/2.jpg",
  "immagini/3.jpg",
  "immagini/4.jpg"
];

let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const boxes = document.querySelectorAll(".boxes div");

/* thumbnails */
boxes.forEach((box, i) => {
  box.style.backgroundImage = `url(${images[i]})`;
  box.addEventListener("click", () => {
    currentIndex = i;
    updateImage();
  });
});

/* update */
function updateImage() {
  mainImage.src = images[currentIndex];
  boxes.forEach((box, i) => {
    box.classList.toggle("active", i === currentIndex);
  });
}

/* arrows */
rightArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
});

leftArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
});

/* init */
updateImage();
const sizeButtons = document.querySelectorAll(".sizes button");

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    sizeButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to the clicked button
    button.classList.add("active");
  });
});
