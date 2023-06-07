var images = [
    "business.jpg",
    "checkkpis.jpg",
    "hqweb.jpg",
    "Futuristic.jpg"
];

var currentImageIndex = 0;
var imgList = document.querySelectorAll(".img");
  
function hideAllImages() {
    for (var i = 0; i < imgList.length; i++) {
      imgList[i].style.display = "none";
    }
}
  
function showImage() {
    hideAllImages();
    imgList[currentImageIndex].style.display = "block";
}
  
document.getElementById("prev").addEventListener("click", function() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
    }
    showImage();
});
  
document.getElementById("next").addEventListener("click", function() {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    showImage();
});
  
showImage();


var sliderContainer = document.querySelector(".image-slider");
var galleryContainer = document.querySelector(".gallery-container");
var toggleButton = document.getElementById("toggle-view");
  
toggleButton.addEventListener("click", function() {
    if (sliderContainer.style.display === "none") {
      sliderContainer.style.display = "flex";
      galleryContainer.style.display = "none";
      toggleButton.textContent = "Ver vista de galería de imágenes";
    } else {
      sliderContainer.style.display = "none";
      galleryContainer.style.display = "flex";
      toggleButton.textContent = "Ver vista de slider de imágenes";
    }
});
