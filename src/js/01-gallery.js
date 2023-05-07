// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
galleryContainer.style = 'list-style: none';
const imagesMarkup = createGalleryImagesMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('afterbegin', imagesMarkup);

function createGalleryImagesMarkup(el) {
  return el.reduce((acc, { preview, original, description }) => {
    return (acc += `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        </li>`);
  }, '');
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});  