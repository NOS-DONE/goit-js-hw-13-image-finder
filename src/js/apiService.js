export default class ApiService {
     
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    
    fetchImages() {
        // console.log(this);
        // console.log(this.page);

        const KEY = '18875042-22cf6e057476092730f314683';
        const URL = 'https://pixabay.com/api/';
        
        return fetch(`${URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`)
            .then(responce => responce.json())
            .then(data => {
                // console.log(data);
                this.page += 1;

                return data.hits;
            })
            .catch(error => {
                console.log(error);
                galleryRef.innerHTML = '<h3>something went wrong...</h3>';
            })
    }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}

