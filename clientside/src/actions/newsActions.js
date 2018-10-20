import axios from "axios";

export const getLatest = () => async dispatch => {
  const res = await axios.get("http://localhost:5000/api/latest-news");
  console.log(res.data);
  dispatch({
    type: "GET_LATEST",
    payload: res.data
  });
};

export const getLatestCategory = category => async dispatch => {
  const res = await axios.get(
    `http://localhost:5000/api/latest-news/${category}`
  );
  console.log(res.data);
  dispatch({
    type: "GET_LATEST_CATEGORY",
    payload: res.data
  });
};

export const searchNews = (searchTerm, page) => async dispatch => {
  const res = await axios.post(
    `http://localhost:5000/api/search-news/${page}`,
    {
      searchTerm
    }
  );
  const result = {
    data: res.data,
    searchedTerm: searchTerm
  };
  dispatch({
    type: "SEARCH_TERM",
    payload: result
  });
};
