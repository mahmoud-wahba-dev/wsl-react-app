import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function api(endpoint, options = {}) {
  const token = Cookies.get("access_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${baseURL}${endpoint}`, config);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
