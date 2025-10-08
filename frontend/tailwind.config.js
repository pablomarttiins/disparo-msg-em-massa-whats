/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary-dark': '#1E40AF',
        'text-gray': '#4B5563',
        'bg-light': '#F9FAFB',
        success: '#10B981',
        'text-dark': '#111827'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}