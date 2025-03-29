import { fetchImages } from './pixabay-api';
import { renderImages, clearGallery } from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  loadMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({ message: 'No images found. Try another search.' });
      return;
    }

    renderImages(data.hits);
    loadMoreBtn.classList.remove('hidden');
  } catch {
    iziToast.error({ message: 'Something went wrong. Please try again.' });
  } finally {
    loader.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);

    renderImages(data.hits);
    smoothScroll();

    if (page * 15 >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
  } catch {
    iziToast.error({ message: 'Failed to load more images.' });
  } finally {
    loader.classList.add('hidden');
  }
});

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const cardHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  }
}
