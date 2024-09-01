// user preferred theme finder function
let chooseTheme = () => {
  const preferredTheme =
    window.localStorage.getItem("userPreferredTheme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  window.localStorage.setItem("userPreferredTheme", preferredTheme);

  return preferredTheme;
};

// theme change function
chooseTheme.change = (val) => {
  const updateTheme = val === "dark" ? "light" : "dark";

  window.localStorage.setItem("userPreferredTheme", updateTheme);
};

export default chooseTheme;
