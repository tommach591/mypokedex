export async function getData(url) {
  let response = await fetch(url);
  return response.status !== 404 ? response.json() : 0;
}
