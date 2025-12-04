import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class", '[data-theme="dark"]'],
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            flex: {
                '2': '2 2 0%',
                '3': '3 3 0%',
            },
            colors: {
                background: "#f9fafb",
                foreground: "#1f2937",

                surface: {
                    primary: "#ffffff",
                    secondary: "#f9fafb",
                },

                border: {
                    subtle: "#e5e7eb",
                    soft: "#d1d5db",
                },

                text: {
                    primary: "#1f2937",
                    secondary: "#6b7280",
                },

                primary: {
                    DEFAULT: "#e53935",
                    foreground: "#ffffff",
                },

                secondary: {
                    DEFAULT: "#6b7280",
                    foreground: "#ffffff",
                },

                success: {
                    DEFAULT: "#34b117",
                    foreground: "#ffffff",
                },

                danger: {
                    DEFAULT: "#e53935",
                    foreground: "#ffffff",
                },

                warning: {
                    DEFAULT: "#f59e0b",
                    foreground: "#ffffff",
                },

                info: {
                    DEFAULT: "#3b82f6",
                    foreground: "#ffffff",
                },
            },

            boxShadow: {
                soft: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
                elevated:
                    "0 10px 30px -15px rgba(15, 23, 42, 0.2), 0 4px 12px -8px rgba(15, 23, 42, 0.12)",
            },

            transitionProperty: {
                base: "all 150ms ease-in-out",
            },

            fontFamily: {
                sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
                mono: ["Geist Mono", "monospace"],
            },
        },
    },

    plugins: [],
};

export default config;
