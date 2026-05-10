/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#070E1A',
        'bg-surface': '#0D1B2A',
        'bg-elevated': '#142338',
        'bg-card': 'rgba(20, 35, 56, 0.7)',
        'primary': '#3B82F6',
        'accent': '#FF6B6B',
        'gold': '#F5A623',
        'text-primary': '#F0F4F8',
        'text-secondary': '#94A3B8',
        'text-muted': '#4B6280',
        'border': 'rgba(255, 255, 255, 0.07)',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '24px',
        '2xl': '32px',
      }
    },
  },
  plugins: [],
}
