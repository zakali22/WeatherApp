export default function(state = null, action) {
  switch (action.type) {
    case "GET_USER":
      return {
        user: action.payload
      };
      break;
    default:
      return state;
  }
}
