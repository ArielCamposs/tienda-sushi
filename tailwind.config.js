/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                sakana: {
                    red: '#E86B6B',      // Rojo Sakura suave (Primary)
                    beige: '#F4E9D8',    // Beige arroz (Background)
                    green: '#8BA888',    // Verde Matcha (Accents/Success)
                    ink: '#1A1A1A',      // Negro Tinta Sumi (Text)
                    dark: '#0F0F0F',
                }
            },
            fontFamily: {
                sans: ['"Noto Sans JP"', 'sans-serif'],
                serif: ['"Hina Mincho"', 'serif'], // Importar de Google Fonts
            },
            backgroundImage: {
                'texture-paper': "url('/assets/rice-paper-texture.png')", // O usar CSS noise
            }
        },
    },
    plugins: [],
}
