import alertConstants from "../constants/AlertConstants"

// export const alertActions = {
//   success,
//   error,
//   clear,
// };

export const success = (message) => {
  return { type: alertConstants.SUCCESS, message };
}

export const error = (message) => {
  return { type: alertConstants.ERROR, message };
}

export const clear = () => {
  return { type: alertConstants.CLEAR };
}