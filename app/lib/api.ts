export async function fetchAndStoreCats() {
  const response = await fetch("http://localhost:3001/api/cats/fetch", {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch cats");
  }
}
