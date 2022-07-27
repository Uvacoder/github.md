import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(
    document.body.dataset.theme || "light"
  );
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  return (
    <div
      className="flex items-center justify-center rounded-full border bg-stone-50 dark:bg-stone-900 p-2 border-stone-500
       dark:border-stone-400 cursor-pointer text-center"
      style={{
        width: "35px",
        height: "35px",
        textAlign: "center",
        verticalAlign: "middle",
        margin: "auto",
      }}
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      <div>{activeTheme === "light" ? "🌙" : "☀️"}</div>
    </div>
  );
};

export default ThemeToggle;
