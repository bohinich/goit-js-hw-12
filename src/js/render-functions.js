import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreButton = document.querySelector(".load-more");

let lightbox = new SimpleLightbox(".gallery a");

export function showLoader() {
    loader.style.display = "block";
}

export function hideLoader() {
    loader.style.display = "none";
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function renderImages(images) {
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
    loadMoreButton.style.display = "block";
}

export function hideLoadMoreButton() {
    loadMoreButton.style.display = "none";
}

export function showEndOfResultsMessage() {
    iziToast.info({
        title: "End",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
    });
}

export function scrollToNewImages() {
    const { height } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: height * 2,
        behavior: "smooth",
    });
}
