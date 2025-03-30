import { getImagesByQuery } from "./js/pixabay-api.js";
import { 
    renderImages, 
    clearGallery, 
    showLoader, 
    hideLoader, 
    showLoadMoreButton, 
    hideLoadMoreButton, 
    showEndOfResultsMessage, 
    scrollToNewImages 
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const searchInput = form.querySelector("input[name='search-text']");
const loadMoreButton = document.querySelector(".load-more");

let query = "";
let page = 1;
let totalHits = 0;

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    query = searchInput.value.trim();
    if (query === "") return;

    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        totalHits = data.totalHits;
        
        if (data.hits.length === 0) return;
        
        renderImages(data.hits);
        
        if (totalHits > 15) {
            showLoadMoreButton();
        }
    } catch (error) {
        console.error("Search error:", error);
    } finally {
        hideLoader();
    }

    form.reset();
});

loadMoreButton.addEventListener("click", async () => {
    page++;
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(query, page);
        renderImages(data.hits);
        scrollToNewImages();

        if (page * 15 >= totalHits) {
            hideLoadMoreButton();
            showEndOfResultsMessage();
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        console.error("Error loading more images:", error);
    } finally {
        hideLoader();
    }
});
