import builtins from "rollup-plugin-node-builtins";
import commonjs from "@rollup/plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";
import globals from "rollup-plugin-node-globals";
import pluginManifest from "rollup-plugin-output-manifest";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve"
import terser from "@rollup/plugin-terser";
import { babel } from "@rollup/plugin-babel";
import { createServer } from "livereload"
import { nodeResolve } from "@rollup/plugin-node-resolve";


/**
 * Simple plugin that provides hot/live reloading of changes.
 */
let hotReloadServer = null;
const hotReloader = () => {
    !!hotReloadServer && hotReloadServer.close()
    return {
        name: "hot-reloader",
        async banner() {
            return `(function(l, r) { if (!l || l.getElementById('hot-reloader')) return; r = l.createElement('script'); r.async = 1; r.src = 'http://localhost:35729/livereload.js?snipver=1'; r.id = 'hot-reloader'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);`
        },
        async generateBundle() {
            if (!hotReloadServer) {
                hotReloadServer = createServer()
                hotReloadServer.watch(process.cwd() + "/dist/")
            }
        },
    }
}


const externals = { "react": "React", "react-dom": "ReactDOM" };
const isProd = process.env.NODE_ENV === "production";

export default {
    input: { ["custom-components-main"]: "src/index.js" },
    output: {
        dir: "dist",
        entryFileNames: isProd ? "custom-components-main-[hash].js" : "custom-components-main.js",
        chunkFileNames: "custom-components-chunk-[hash].js",
        format: "esm",
    },
    plugins: [
        nodeResolve({ browser: true }),
        babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
        postcss({ extensions: [".css"], minimize: isProd }),
        externalGlobals(externals),
        commonjs(),
        globals(),
        builtins(),
        replace({
            preventAssignment: true,
            values: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }
        }),
        pluginManifest.default(),
        isProd && terser(),
        !isProd && serve({
            contentBase: [".", "dist"],
            headers: { "Access-Control-Allow-Origin": "*", },
            port: process.env.DEV_SERVER_PORT || 10001,
        }),
        !isProd && !process.env.DISABLE_HOT_RELOADING && hotReloader(),
    ],
    external: Object.keys(externals),
};
