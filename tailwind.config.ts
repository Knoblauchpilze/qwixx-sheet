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
				overlay: '#0005',

				// Qwixx colors
				'qred-bright': '#d95d4a',
				'qred-light': '#ad3a28',
				'qred-medium': '#852415',
				'qred-dark': '#631509',

				'qyellow-bright': '#deda52',
				'qyellow-light': '#bdb931',
				'qyellow-medium': '#ada926',
				'qyellow-dark': '#807c0f',

				'qgreen-bright': '#6bcf81',
				'qgreen-light': '#2f9446',
				'qgreen-medium': '#19692b',
				'qgreen-dark': '#0b521b',

				'qblue-bright': '#6a7fde',
				'qblue-light': '#364ebf',
				'qblue-medium': '#1b2f8c',
				'qblue-dark': '#0d1c63'
			}
		}
	},

	plugins: []
} satisfies Config;
