export async function getTags(query) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/tags?${new URLSearchParams({
        search: query,
      })}`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
