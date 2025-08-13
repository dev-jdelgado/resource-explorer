import { useEffect, useState } from "react";

const THEME_KEY = "theme";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        const saved = localStorage.getItem(THEME_KEY);
        return (saved as "light" | "dark") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    return (
        <button
        aria-label="Toggle theme"
        onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
        className="px-3 py-1 rounded border"
        >
        {theme === "light" ? "🌞 Light" : "🌙 Dark"}
        </button>
    );
}
