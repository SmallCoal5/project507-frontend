import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
// vite.config.ts
import Unocss from "unocss/vite";
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from "unocss";
// import importToCDN from "vite-plugin-cdn-import";
// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// @see: https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
			}
		},
		// global css
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`
				}
			}
		},
		// server config
		server: {
			host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// https: false,
			// 代理跨域（mock 不需要配置，这里只是个事列）
			proxy: {
				"/base": {
					target: "http://172.31.225.62:8000",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/base/, "")
				},
				"/pic": {
					target: "https://gitcode.net/qq_44112897/imgbed/-/raw/master/comic",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/pic/, "")
				},
				"/flare": {
					target: "http://172.31.224.2:8155",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/flare/, "")
				}
			}
		},
		// plugins
		plugins: [
			vue(),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * vite 可以使用 jsx/tsx 语法
			vueJsx(),
			// * name 可以写在 script 标签上
			VueSetupExtend(),

			Unocss({
				presets: [
					presetUno(),
					presetAttributify(),
					presetIcons({
						scale: 1.2,
						warn: true
					})
				],
				safelist: ["i-ep-chat-dot-round", "i-ep-user"],
				transformers: [transformerDirectives(), transformerVariantGroup()]
			}),

			// * demand import element（如果使用了cdn引入,没必要使用element自动导入了）
			// AutoImport({
			// 	resolvers: [ElementPlusResolver()]
			// }),
			// Components({
			// 	resolvers: [ElementPlusResolver()]
			// }),
			// * cdn 引入（vue、element-plus）
			// importToCDN({
			// 	modules: [
			// 		{
			// 			name: "vue",
			// 			var: "Vue",
			// 			path: "https://unpkg.com/vue@next"
			// 		},
			// 		{
			// 			name: "element-plus",
			// 			var: "ElementPlus",
			// 			path: "https://unpkg.com/element-plus",
			// 			css: "https://unpkg.com/element-plus/dist/index.css"
			// 		}
			// 	]
			// }),
			// * 是否生成包预览
			viteEnv.VITE_REPORT && visualizer(),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz"
				})
		],
		// build configure
		build: {
			outDir: "dist",
			minify: "terser",
			terserOptions: {
				// delete console/debugger
				compress: {
					drop_console: viteEnv.VITE_DROP_CONSOLE,
					drop_debugger: true
				}
			},
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
