const initialState = {
  users: [],
  drinks: [],
  ingredients: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_AUTH":
      return {
        ...state,
        isAuthenticated: action.payload !== null,
      };
    case "DRINKS_FETCHED":
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
