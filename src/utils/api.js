import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function api(endpoint, options = {}) {
  const token = Cookies.get("access_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "ar",
      ...options.headers,
    },
    ...options,
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${baseURL}${endpoint}`, config);
  if (res.status === 204) return { status: 1 };
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Download a PDF file from the given endpoint.
 * Triggers a browser "Save As" dialog using a temporary anchor element.
 *
 * @param {string} endpoint  - API path, e.g. "/api/grants/requests/5/match/pdf/"
 * @param {string} filename  - Suggested filename for the downloaded file
 */
export async function downloadPdf(endpoint, filename = "report.pdf") {
  const token = Cookies.get("access_token");
  const requestUrl = `${baseURL}${endpoint}`;
  const res = await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Accept-Language": "ar",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw err;
    }
    throw { message: `HTTP ${res.status}` };
  }

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
}
