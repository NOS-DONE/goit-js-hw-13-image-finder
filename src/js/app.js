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
    loadMoreButtonRef.classList.add('is-hidden');
    apiService.query = event.currentTarget.elements.query.value;
    apiService.resetPage();
    apiService.fetchImages()
        .then(images => {
            loadMoreButtonRef.classList.remove('is-hidden');  

            if (images.length === 0) {
                loadMoreButtonRef.classList.add('is-hidden');  
            }
                        
            if (images.length !== 0) {
                renderImagesMurkup(images);
                return;
            }

            galleryRef.innerHTML = '<h3>Nothing was found...</h3>';

        
        })
        .catch(error => {
            galleryRef.innerHTML = '<h3>something went wrong...</h3>';
            console.log(error);
        });

    

}

function loadMoreButtonHandler() {
    apiService.fetchImages()
        .then((images) => {renderImagesMurkup(images)});


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




