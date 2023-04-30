export default function convertIDR(num) {
  if (!num) return "0";
  var reverse = num.toString().split("").reverse().join(""),
    thousand = reverse.match(/\d{1,3}/g);
  thousand = thousand.join(".").split("").reverse().join("");
  return thousand;
}
