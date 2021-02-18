import axios from 'axios';
import config from '../../../config';

export const FETCH_ARTICLES = 'fetch_articles';

export const fetchArticles = (source) => async (dispatch) => {
  let url;
  console.log('source', source);
  if (source && (source.year || source.launch_success)) {
    if (source.launch_success) {
      url = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=${
        source.launch_success === 'YES'
      }&land_success=${source.launch_success === 'YES'}`;
    }
    if (source.year) {
      url = `https://api.spacexdata.com/v3/launches?limit=100&launch_year=${source.year}`;
    }
  } else {
    url = `https://api.spacexdata.com/v3/launches?limit=100`;
  }

  const res = await axios.get(url)
  // .catch(function (error) {
  //   if (error.response) {
  //     // Request made and server responded
  //     retrun ({
  //       errorStatus: error.response.status,
  //       errorInfo: error.response.data,
  //     });
  //     // console.log(error.response.data);
  //     // console.log(error.response.status);
  //     // console.log(error.response.headers);
  //   } else if (error.request) {
  //     // The request was made but no response was received
  //     // console.log(error.request);
  //     retrun ({
  //       errorRequest: error.request,
  //     });
  //   } else {
  //     // Something happened in setting up the request that triggered an Error
  //     retrun ({
  //       errorRequest: error.message,
  //     });
  //   }
  // });

  dispatch({
    type: FETCH_ARTICLES,
    payload: res.data,
  });
};
