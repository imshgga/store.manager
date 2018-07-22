/**
 * @Author: houshengwei
 * @Date:   2018/07/22
 * @Last modified by:   houshengwei
 * @Last modified time: 2018/07/22
 */

import {minify} from "uglify-es"
import commonjs from "rollup-plugin-commonjs"
import uglify from "rollup-plugin-uglify"
import babel from "rollup-plugin-babel"

function getConfig(dest, format, ugly) {
  const conf = {
    input: "src/store.manager.js",
    output: {
      exports: "named",
      file: dest,
      format,
      name: "store.manager",
      sourcemap: true
    },
    plugins: [
      commonjs(),
      babel(),
      ugly &&
        uglify(
          {
            warnings: true,
            toplevel: true,
            sourceMap: true,
            mangle: {
              properties: false
            }
          },
          minify
        ),
    ].filter(Boolean)
  }

  return conf
}

const config = [
    getConfig("dist/store.manager.js", "cjs", false),
    getConfig("dist/store.manager.umd.js", "umd", true),
    getConfig("dist/store.manager.module.js", "es", false)
]

export default config
