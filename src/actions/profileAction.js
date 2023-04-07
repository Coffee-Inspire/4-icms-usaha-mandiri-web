export const SAVE_PROFILE = "SAVE_PROFILE";

export const saveProfile = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "SAVE_PROFILE",
      payload,
    });
  };
};
