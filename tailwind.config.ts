import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@totocorpsoftwareinc/frontend-toolkit/**/*.svelte'
	],

	theme: {
		extend: {
			colors: {
				// See: https://colorffy.com/dark-theme-generator?colors=bd6ed5-121212
				// Palette
				primary: '#121212',
				'primary-hover': '#3f3f3f',
				'primary-selected': '#282828',
				secondary: '#bd6ed5',
				'secondary-hover': '#cd8fdf',
				accent: '#575757',

				// State
				enabled: '#2a7a0c',
				'enabled-hover': '#45d90f',
				disabled: '#751c0d',
				'disabled-hover': '#d92d0f',
				error: '#d92d0f',

				// Miscellaneous
				overlay: '#0005'
			}
		}
	},

	plugins: []
} satisfies Config;
