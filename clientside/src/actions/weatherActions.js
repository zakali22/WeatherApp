import axios from "axios";

export const getWeather = city => async dispatch => {
  const res = await axios.post("http://localhost:5000/api/getCurrentWeather", {
    city_name: city
  });
  if (res.data.location) {
    console.log(res.data);
    dispatch({
      type: "GET_WEATHER",
      payload: res.data
    });
  }
};
