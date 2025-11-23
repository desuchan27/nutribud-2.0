import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt({
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{ts,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: "#379777",
				secondary: "#BBE5D7",
				accent: "#F4CE14",
			},
		},
	},
	plugins: [],
}) satisfies Config;
