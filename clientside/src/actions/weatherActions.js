import axios from "axios";

export const getWeather = () => async dispatch => {
  const res = await axios.get(
    "http://localhost:5000/api/getCurrentWeather/Israel"
  );
  console.log(res.data);
  dispatch({
    type: "GET_WEATHER",
    payload: res.data
  });
};
