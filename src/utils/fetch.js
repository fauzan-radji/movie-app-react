export default async function customFetch(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}
