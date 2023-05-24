export default function convertIDR(num) {
  if (!num) return "0";
  let reverse = num.toString().split("").reverse().join("");
  let thousand = reverse.match(/\d{1,3}/g);
  thousand = thousand.join(".").split("").reverse();
  if (num < 0) thousand.unshift("-");
  return thousand.join("");
}
