import ApiService from './apiService';
import imagesTemplate from '../templates/images.hbs'

const inputSearchRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreButtonRef = document.querySelector('[data-action="load-more"]');
const endOfSearchInfo = document.querySelector('.end-of-search');

inputSearchRef.addEventListener('submit', searchInputHandler);
loadMoreButtonRef.addEventListener('click', loadMoreButtonHandler)

const apiService = new ApiService();

function searchInputHandler(event) {
    event.preventDefault();

    clearImagesContainer();
    
    hideElement(loadMoreButtonRef, true);
    hideElement(endOfSearchInfo, true);
    apiService.query = event.currentTarget.elements.query.value;
    apiService.resetPage();
    apiService.fetchImages()
        .then(images => {

            if (images.length === 0) {
                console.log(images.length);
                hideElement(loadMoreButtonRef, true);

                galleryRef.innerHTML = '<h3>Nothing was found...</h3>';
            }
            
            if (images.length !== 0) {
                hideElement(loadMoreButtonRef, false)
                renderImagesMurkup(images);
            }});
}

function loadMoreButtonHandler() {
    apiService.fetchImages()
        .then((images) => {
            if (images.length === 0) {
                hideElement(loadMoreButtonRef, true);
                hideElement(endOfSearchInfo, false);
            }

            renderImagesMurkup(images)
        });


}

//------//

function renderImagesMurkup(imagesArr) {
    galleryRef.insertAdjacentHTML('beforeend', imagesTemplate(imagesArr));
    galleryRef.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        // alignToTop: false, 
    });
}

function clearImagesContainer() {
    galleryRef.innerHTML = '';
}

function hideElement(elementRef, state) {
    if (state === true) {
        elementRef.classList.add('is-hidden');
        return;
    }
    elementRef.classList.remove('is-hidden');

}




