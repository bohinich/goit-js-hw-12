import { getImagesByQuery } from "./pixabay-api.js";
import { 
    createGallery, 
    clearGallery, 
    showLoader, 
    hideLoader, 
    showLoadMoreButton, 
    hideLoadMoreButton 
} from "./render-functions.js";
import iziToast from "izitoast";

const form = document.querySelector(".search-form");
const searchInput = form.querySelector("input[name='searchQuery']");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
const perPage = 15;

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    query = searchInput.value.trim();
    if (query === "") {
        iziToast.warning({
            title: "Warning",
            message: "Please enter a search term!",
            position: "topRight",
        });
        return;
    }

    page = 1;
    clearGallery(); 
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        if (data.hits.length === 0) {
            iziToast.error({
                title: "Oops!",
                message: "Sorry, no images found. Try again!",
                position: "topRight",
            });
            return;
        }
        createGallery(data.hits);
        if (data.totalHits > perPage) {
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong. Please try again!",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }

    form.reset();
});

loadMoreBtn.addEventListener("click", async () => {
    page += 1;
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);
        if (page * perPage >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                title: "End of results",
                message: "You've reached the end of search results.",
                position: "topRight",
            });
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong. Please try again!",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
});
