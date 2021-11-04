import ApiServices from './apiService';
import refs from './refs';
import imageTemplate from '../templates/template.handlebars';
import LoadMoreBtn from './btn';
import * as basicLightbox from 'basiclightbox';

export default function () {
	const loadMoreBtn = new LoadMoreBtn({
		selector: '[data-action="load-more"]',
		hidden: true,
	});

	const apiService = new ApiServices();

	const { searchForm, galleryBox, loadMore } = refs;
	function clickIntoView(element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	}

	function openModal(e) {
		const instance = basicLightbox.create(`<img src="${e.target.dataset.src}" width="100%" height="100%">`);
		instance.show();
	}

	function clearMarkup() {
		galleryBox.innerHTML = '';
	}

	function getSearchQuery(e) {
		e.preventDefault();
		apiService.query = e.currentTarget.elements.query.value;

		if (apiService.query !== '') {
			loadMoreBtn.show();
			apiService.resetPage();
			clearMarkup();
			loadImages();
		}
		return;
	}

	function loadImages() {
		loadMoreBtn.disable();
		apiService.fetchImages().then((images) => {
			console.log(images.hits[0]);
			galleryBox.insertAdjacentHTML('beforeend', imageTemplate(images.hits));
			loadMoreBtn.enable();
			clickIntoView(loadMore);
		});
	}

	searchForm.addEventListener('submit', getSearchQuery);
	galleryBox.addEventListener('click', openModal);
	loadMore.addEventListener('click', loadImages);
}
