export default () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  return token;
};
