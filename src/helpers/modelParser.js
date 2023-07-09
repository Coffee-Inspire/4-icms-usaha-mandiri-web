export default function modelParser(obj) {
  const currencyKeys = ["purchase_price", "price", "mutation"];

  const normalize = (str) => {
    return parseInt(str.split(" ")[1].replace(/\./g, ""));
  };

  for (const key in obj) {
    if (currencyKeys.includes(key)) obj[key] = normalize(obj[key]);
  }
  return obj;
}
