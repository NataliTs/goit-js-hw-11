import axios from 'axios';

const KEY = '34601890-0da8f577553a948963b9b5ea4';

axios.defaults.baseURL = 'https://pixabay.com/api';

// export const getPhotos = async (q, per_page, page) => {
//   const response = await axios.get(
//     `/?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`
//   );
//   const data = await response.json();
//   return data;
// };

export const getPhotos = (q, per_page, page) => {
  return axios
    .get(
      `/?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`
    )
    .then(({ data }) => {
      return data;
      console.log(res);
    });
};
