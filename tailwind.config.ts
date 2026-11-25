import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          light: "#FFA047",
          DEFAULT: "#FF6B00",
          dark: "#D65500",
          deep: "#B84500",
        },
        maroon: {
          light: "#9A2A2A",
          DEFAULT: "#7A1C1C",
          dark: "#521010",
          deep: "#3D0808",
        },
        sandstone: {
          light: "#FDF8F3",
          DEFAULT: "#F5E6D3",
          accent: "#E6CEB2",
          dark: "#D4B999",
          border: "#C8A783",
        },
        gold: {
          light: "#FDF3C7",
          DEFAULT: "#D4AF37",
          dark: "#AA881E",
          rich: "#B89020",
          antique: "#8F6E12",
        },
      },
      fontFamily: {
        shloka: ["var(--font-tiro-hindi)", "serif"],
        headingHi: ["var(--font-rozha)", "serif"],
        headingEn: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      animation: {
        "diya-flicker": "diyaFlicker 3s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        diyaFlicker: {
          "0%, 100%": { opacity: "0.95", transform: "scale(1)" },
          "25%": { opacity: "0.85", transform: "scale(0.98) translateY(1px)" },
          "50%": { opacity: "1", transform: "scale(1.03) translateY(-1px)" },
          "75%": { opacity: "0.9", transform: "scale(1.01)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FBF2B7 0%, #D4AF37 50%, #AA881E 100%)",
        "saffron-maroon": "linear-gradient(135deg, #FF6B00 0%, #B84500 50%, #7A1C1C 100%)",
        "temple-sandstone": "linear-gradient(180deg, #FDF8F3 0%, #F5E6D3 50%, #E6CEB2 100%)",
        "sandstone-card": "linear-gradient(145deg, rgba(253, 248, 243, 0.95) 0%, rgba(245, 230, 211, 0.98) 100%)",
      },
      boxShadow: {
        "diya-glow": "0 0 25px 8px rgba(255, 107, 0, 0.35), 0 0 50px 15px rgba(212, 175, 55, 0.2)",
        "gold-border": "0 0 15px rgba(212, 175, 55, 0.4)",
        "temple-card": "0 10px 30px -5px rgba(122, 28, 28, 0.12), 0 4px 12px rgba(212, 175, 55, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
