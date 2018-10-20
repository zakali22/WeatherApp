export default function(state = null, action) {
  switch (action.type) {
    case "GET_LATEST":
      return {
        data: action.payload
      };
      break;
    case "GET_LATEST_CATEGORY":
      return {
        data: action.payload
      };
    case "SEARCH_TERM":
      return {
        data: action.payload.data,
        searchTerm: action.payload.searchedTerm
      };
    default:
      return state;
  }
}
