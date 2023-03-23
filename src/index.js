import './css/styles.css';
import Notiflix from 'notiflix';
import { getPhotos } from './fetch-photo';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  galleryList: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

console.log(refs.galleryList);

const PER_PAGE = 40;

let photos = [];
let q = '';
let page = 1;
let totalHits = 0;

const renderGallery = () => {
  const gallery = photos
    .map(
      photo => `<a class="photo-link" href="${photo.largeImageURL}"> <div class="photo-card">
      <div class="photo">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" /> </div>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b> ${photo.likes}
    </p>
    <p class="info-item">
      <b>Views:</b> ${photo.views}
    </p>
    <p class="info-item">
      <b>Comments:</b> ${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b> ${photo.downloads}
    </p>
  </div>
</div> </a>`
    )
    .join('');

  refs.galleryList.insertAdjacentHTML('beforeend', gallery);
  simpleLightBox.refresh();
};

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const fetchPhotos = () => {
  getPhotos(q, PER_PAGE, page)
    .then(data => {
      photos = data.hits;
      totalHits = data.totalHits;
      if (totalHits === 0) {
        refs.loadMore.style.display = 'none';
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      renderGallery();
      console.log(totalHits);
    })
    .catch(error => {
      console.log('error:', error);
    });
};

const onSubmit = e => {
  e.preventDefault();
  refs.galleryList.innerHTML = '';
  const searchValue = e.target.elements.searchQuery.value;
  q = searchValue;
  page = 1;
  if (q !== '') {
    fetchPhotos();
    refs.loadMore.style.display = 'flex';
  } else {
    refs.loadMore.style.display = 'none';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  e.target.elements.searchQuery.value = '';
};

const onloadMore = e => {
  page += 1;
  console.log(page);
  fetchPhotos();
  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
  if (page > totalHits) {
    refs.loadMore.style.display = 'none';
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
  }
};

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onloadMore);
// refs.loadMore.addEventListener('click', hendleloadMore);

// const hendleloadMore = e => {
//   if (page > totalHits) {
//     refs.loadMore.style.display = 'none';
//     Notiflix.Notify.info(
//       `We're sorry, but you've reached the end of search results.`
//     );
//   }
//   if (photos.length && page < totalHits) {
//     page += 1;
//     fetchPhotos();
//     Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
//   }
// };

// onButtonIntersect = entities => {
//   const [button] = entities;
//   if (button.isIntersecting) {
//     hendleloadMore();
//   }
// };

// const observer = new IntersectionObserver(onButtonIntersect);

// observer.observe(refs.loadMore);
