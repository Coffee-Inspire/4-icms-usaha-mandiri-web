export default (objectData, exclusions = []) => {
  let flag = true;
  Object.keys(objectData).forEach((k) => {
    const trimmed = objectData[k].trim();
    if (!exclusions.includes(k)) {
      if (trimmed.length < 1) {
        console.error(
          "validation error: empty whitespace input is not allowed"
        );
        flag = false;
        return false;
      }
    }
    objectData[k] = trimmed;
  });
  return flag;
};
