import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  safelist: [
    "bg-red-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-sky-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-emerald-500",
    "bg-purple-500"
  ]
}
export default config
