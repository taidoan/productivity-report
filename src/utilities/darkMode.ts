"use client";
export const applyDarkMode = () => {
  const savedMode = localStorage.getItem("dark-mode");
  const isDark = savedMode === "true";

  if (isDark) {
    document.documentElement.classList.add("dark");
  }
};
