/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerbg: '#0f172a',        // Nền header tối
        primaryblue: '#1e3a8a',     // Xanh dương đậm
        accentblue: '#3b82f6',      // Xanh tươi
        ctaBlue: '#2563eb',         // Xanh gradient đậm
        lightgray: '#d1d5db',       // Màu chữ phụ
        darkblue: '#172554',        // Xanh dương rất tối hơn
      }
    },
  },
  plugins: [],
}
