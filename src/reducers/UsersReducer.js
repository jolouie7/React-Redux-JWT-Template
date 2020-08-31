// The redux users reducer manages the users section of the application state
// which is used by the HomePage to display a list of users and enable deleting of users.
import userConstants from "../constants/UserConstants";

export const users = (state = {}, action) => {
  switch (action.type) {
    case userConstants.GETALL_BEGIN:
      return {
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
