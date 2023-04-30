export default (err) => {
  if (err.response && err.response.status === 404) {
    console.error(err.message);
  } else {
    console.error(err);
  }
};
