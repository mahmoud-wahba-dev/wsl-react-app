import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const THEMES = ["light", "dark"];

function getTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  return current === "dark" ? "dark" : "light";
}

function setTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(STORAGE_KEY, next);
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const theme = saved === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  const toggleTheme = useCallback(() => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }, []);

  return { theme, setTheme, toggleTheme, themes: THEMES };
}

export { initTheme, getTheme, setTheme, STORAGE_KEY };
