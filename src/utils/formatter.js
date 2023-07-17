const locale = "id-ID";
const currency = "IDR";

export function formatCurrency(value) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(locale, {
    dateStyle: "full",
  });
}

export function formatNumber(value) {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatMovieTitle(title, releaseDate) {
  return `${title} (${releaseDate.match(/\d{4}/)[0]})`;
}

export default { formatCurrency, formatDate, formatNumber, formatMovieTitle };
