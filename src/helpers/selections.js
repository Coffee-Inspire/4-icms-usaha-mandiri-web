export default function selections(data, label) {
  return data.map(
    (i) =>
      (i = {
        value: i.id,
        label: i[label],
      })
  );
}
