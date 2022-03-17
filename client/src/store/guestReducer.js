const initialState = {
  users: []
};

const guestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_GUEST_LOGIN":
      return {
        ...state,
        isGuest: action.payload !== null,
      };
    default:
      return state;
  }
};

export default guestReducer;
