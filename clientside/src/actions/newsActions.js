import axios from "axios";

export const getLatest = () => async dispatch => {
  const res = await axios.get(
    "https://afternoon-ridge-59283.herokuapp.com/api/latest-news"
  );
  console.log(res.data);
  dispatch({
    type: "GET_LATEST",
    payload: res.data
  });
};

export const getLatestCategory = category => async dispatch => {
  const res = await axios.get(
    `https://afternoon-ridge-59283.herokuapp.com/api/latest-news/${category}`
  );
  console.log(res.data);
  dispatch({
    type: "GET_LATEST_CATEGORY",
    payload: res.data
  });
};

export const searchNews = searchTerm => async dispatch => {
  const res = await axios.post(
    `https://afternoon-ridge-59283.herokuapp.com/api/search-news`,
    {
      searchTerm
    }
  );
  console.log(res.data);
  dispatch({
    type: "SEARCH_TERM",
    payload: res.data
  });
};
