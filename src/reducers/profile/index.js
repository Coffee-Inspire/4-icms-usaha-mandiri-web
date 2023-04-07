import { SAVE_PROFILE } from "../../actions/profileAction";

const initialState = {
  profileData: false,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROFILE:
      return {
        ...state,
        profileData: action.payload,
      };
    default:
      return state;
  }
};

export default profile;
