import ApiService from './apiService';
import imagesTemplate from '../templates/images.hbs'

const inputSearchRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreButtonRef = document.querySelector('[data-action="load-more"]');


inputSearchRef.addEventListener('submit', searchInputHandler);
loadMoreButtonRef.addEventListener('click', loadMoreButtonHandler)

const apiService = new ApiService();

function searchInputHandler(event) {
    event.preventDefault();

    clearImagesContainer();
    apiService.query = event.currentTarget.elements.query.value;
    apiService.resetPage();
    apiService.fetchImages().then(images => {
        console.log(images);
        renderImagesMurkup(images);
        loadMoreButtonRef.classList.remove('is-hidden');
    });

    

}

function loadMoreButtonHandler() {
    apiService.fetchImages().then(renderImagesMurkup);


}

//------//

function renderImagesMurkup(imagesArr) {
    galleryRef.insertAdjacentHTML('beforeend', imagesTemplate(imagesArr));
    galleryRef.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function clearImagesContainer() {
    galleryRef.innerHTML = '';
}




