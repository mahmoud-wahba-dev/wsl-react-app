const baseURL = import.meta.env.VITE_BASE_URL;
import Cookies from "js-cookie";

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
  return res.json;
}
