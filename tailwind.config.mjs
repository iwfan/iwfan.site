import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        fg: "#ECF8FF",
        green: "#83F9A2",
        grey: "#C9E2F0",
        blue: "#5E8CA7",
        border: "rgb(28, 44, 53)",
        border_light: "rgba(124, 201, 255, 0.41)",
        light: "rgba(130, 249, 161, 0.07)",
        bar: "rgb(222, 255, 231)",
        link: "#4FB8FF",
        ["deep-green"]: "rgb(22, 33, 41)"
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
