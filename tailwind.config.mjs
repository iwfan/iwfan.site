import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        jost: '"Jost", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      },
      colors: {
        glow10: "#B0FBBC",
        glow20: "#82F9A1",
        glow25: "#82F9A112",
        glow30: "#00E895",
        text10: "#ECF8FF",
        text20: "#C9E2F0",
        text30: "#BBC6CC",
        blue10: "#111A20",
        blue20: "#1C2C35",
        blue30: "#243B4A",
        blue40: "#416883",
        blue50: "#5E8CA7",
        cyan10: "#1DA1F2",
        red10: "#D9534D",
        red20: "#EA4C89",
        bar: "#DEFFE7",
        border_light: 'rgba(124, 201, 255, 0.41)',
        light: 'rgba(130, 249, 161, 0.07)',
      },
      boxShadow: {
        emanate: "rgb(14 255 77 / 50%) 3px 0px 22px"
      },
      keyframes: {
        expand: {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" }
        },
        shrink: {
          "0%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" }
        }
      },
      animation: {
        expand: "expand 1000ms infinite alternate-reverse",
        shrink: "shrink 1000ms infinite alternate-reverse"
      }
    }
  },
  plugins: [typography]
}
