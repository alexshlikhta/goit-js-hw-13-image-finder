import ApiServices from './apiService';
import refs from './refs';
import imageTemplate from '../templates/template.handlebars';
import LoadMoreBtn from './btn';

export default function () {
	const { searchForm, galleryBox, loadMore } = refs;
	function clickIntoView(element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	}

	const loadMoreBtn = new LoadMoreBtn({
		selector: '[data-action="load-more"]',
		hidden: true,
	});

	const apiService = new ApiServices();

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
			galleryBox.insertAdjacentHTML('beforeend', imageTemplate(images.hits));
			loadMoreBtn.enable();
			clickIntoView(loadMore);
		});
	}

	searchForm.addEventListener('submit', getSearchQuery);
	loadMore.addEventListener('click', loadImages);
}
