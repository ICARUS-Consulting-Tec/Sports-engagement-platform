const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log("API_BASE_URL:", API_BASE_URL);
  console.log("Fetching URL:", `${API_BASE_URL}/matches/`);

  const config = {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  };

  const response = await fetch('/matches/');

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}