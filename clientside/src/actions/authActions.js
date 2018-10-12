export const getUser = () => async dispatch => {
  const res = await axios.get("/auth/current_user");
  console.log(res);
  dispatch({
    type: "GET_USER",
    payload: res.data
  });
};
