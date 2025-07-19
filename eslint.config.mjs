import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
	// Base JS recommended config
	js.configs.recommended,

	// React recommended config (flat version)
	pluginReact.configs.flat.recommended,

	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node, // ✅ replaces `env: { node: true }`
			},
		},
		rules: {
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "off",
		},
	},
]);
