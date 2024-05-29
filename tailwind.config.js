/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

    theme: {
        extend: {
            colors: {
                "first-color": "var(--first-color)",
                "second-color": "var(--second-color)",
                "third-color": "var(--third-color)",
                "fourth-color": "var(--fourth-color)"
            },
        },
    },
    plugins: [],
}