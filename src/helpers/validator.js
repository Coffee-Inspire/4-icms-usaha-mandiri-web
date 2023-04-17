export default (objectData, exclusions = []) => {
  let flag = true;
  Object.keys(objectData).forEach((k) => {
    const trimmed =
      typeof objectData[k] === "string" ? objectData[k].trim() : objectData[k];
    if (!exclusions.includes(k)) {
      if (trimmed.length < 1) {
        console.error(
          `validation error: empty whitespace input is not allowed: ${k}`
        );
        flag = false;
        return false;
      }
    }
    objectData[k] = trimmed;
  });
  return flag;
};
