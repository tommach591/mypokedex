export async function getData(url) {
  let response = await fetch(url);
  return response.json();
}
