import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

let lightbox = new SimpleLightbox(".gallery a");

export function showLoader() {
    loader.classList.add("visible");
}

export function hideLoader() {
    loader.classList.remove("visible");
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function createGallery(images) {
    if (images.length === 0) {
        iziToast.error({
            title: "Oops!",
            message: "Sorry, no images found. Try again!",
            position: "topRight",
        });
        return;
    }

    const markup = images
        .map(
            (img) => `
        <a href="${img.largeImageURL}" class="gallery-item">
            <img src="${img.webformatURL}" alt="${img.tags}" />
            <div class="info">
                <p>Likes: ${img.likes}</p>
                <p>Views: ${img.views}</p>
                <p>Comments: ${img.comments}</p>
                <p>Downloads: ${img.downloads}</p>
            </div>
        </a>
    `
        )
        .join("");

    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.add("visible");
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.remove("visible");
}


export function showEndMessage() {
    const endMessage = document.querySelector(".end-message");
    if (endMessage) {
        endMessage.style.display = "block";  
    }
}

export function hideEndMessage() {
    const endMessage = document.querySelector(".end-message");
    if (endMessage) {
        endMessage.style.display = "none";  
    }
}
