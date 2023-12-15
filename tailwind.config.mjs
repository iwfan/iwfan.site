import typography from "@tailwindcss/typography"
import aspectRatio from "@tailwindcss/aspect-ratio"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        jost: "Jost",
        prose: "'Rethink Sans', 'PingFang SC', 'Noto Sans SC'",
      },
      colors: {
        glow0: "#DEFFE7",
        a: "#BAFFC5",
        glow10: "#B0FBBC",
        glow20: "#82F9A1",
        glow30: "#0ACF83",
        text10: "#ECF8FF",
        text20: "#C9E2F0",
        text30: "#BBC6CC",
        blue10: "#111A20",
        blue15: "#19252E",
        blue20: "#1C2C35",
        blue30: "#243B4A",
        blue40: "#416883",
        blue50: "#5E8CA7",
        cyan10: "#1DA1F2",
        red10: "#D9534D",
        red20: "#EA4C89",
        border_light: "rgba(124, 201, 255, 0.41)",
        light: "rgba(130, 249, 161, 0.07)",
      },
      boxShadow: {
        emanate: "rgb(14 255 77 / 50%) 3px 0px 22px",
      },
    },
  },
  plugins: [aspectRatio, typography],
}
