const initialState = {
  users: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) { 
    case "ON_AUTH":
      console.log(action);
      return {
        ...state,
        isAuthenticated: action.payload !== null,
      };
    default:
      return state;
  }
};

export default authReducer;
