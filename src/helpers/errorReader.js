export default (err) => {
  if (!err.response) {
    console.error(err);
    return {
      status: 400,
      message:
        "Unknown error has occured in this request, please contact the developer",
    };
  }
  return {
    status: err.response.status,
    message: err.response.data.error
      ? err.response.data.error.message
      : err.message,
  };
};
