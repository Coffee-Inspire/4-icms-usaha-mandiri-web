export default (err) => {
  return {
    status: err.response.status,
    message: err.response.data.error
      ? err.response.data.error.message
      : err.message,
  };
};
