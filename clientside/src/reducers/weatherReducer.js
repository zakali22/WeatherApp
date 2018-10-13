export default function(state = null, action) {
  switch (action.type) {
    case "GET_WEATHER":
      return {
        data: action.payload
      };
      break;
    default:
      return state;
  }
}
