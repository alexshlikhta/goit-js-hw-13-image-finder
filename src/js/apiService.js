// Pixabay API key
const API_KEY = '24173514-089b97c8c3d8ec143a8a2c0bb';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class ApiServices {
	constructor() {
		this.searchQuery = '';
		this.page = 1;
	}

	fetchImages() {
		const url = `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
		return fetch(url)
			.then((response) => response.json())
			.then((images) => {
				this.incrementPage();
				return images;
			});
	}

	incrementPage() {
		this.page += 1;
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
