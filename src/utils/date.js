export const formatDate = (date) => {
  let d = date instanceof Date ? date : new Date(date.slice(0, 10));
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  let today = d.toLocaleDateString([], options).split("/");
  today =
    ("0" + today[1]).slice(-2) +
    "-" +
    ("0" + today[0]).slice(-2) +
    "-" +
    today[2];
  return today;
};

export const newDate = (dateString) => {
  let d = dateString.split(/\/|-/);
  return new Date(d[2], d[1] - 1, d[0]);
};

export const daysBetween = (fromDate, toDate) => {
  const diffTime = Math.abs(toDate - fromDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
