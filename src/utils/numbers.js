export const formatNumber = (number, formatType = "", decimalPlaces = 2) => {
  switch (formatType) {
    case "currency":
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(number);

    case "decimal":
      return new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: decimalPlaces,
      }).format(number);

    case "percent":
      return Number(number / 100).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 2,
      });

    default:
      return number;
  }
};
