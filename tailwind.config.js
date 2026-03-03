/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
                display: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                cyan: {
                    400: "#00f2fe",
                    500: "#00d2de",
                },
                purple: {
                    600: "#9b4dff",
                },
            },
        },
    },
    plugins: [],
};
