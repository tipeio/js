import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { main, browser, module, dependencies } from './package.json'
import { terser } from 'rollup-plugin-terser'
const whiteList = {
  'cross-fetch': true
}

const plugins = [
  resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  }),
  commonjs(),
  typescript({
    typescript: require('typescript'),
    tsconfig: 'tsconfig.json'
  }),
  json()
]

export default [
  {
    input: 'src/index.ts',
    plugins: [...plugins, terser()],
    output: {
      file: module,
      format: 'umd',
      name: 'tipe-js',
      esModule: false,
      exports: 'named'
    }
  },
  {
    input: 'src/index.ts',
    plugins,
    output: [
      {
        file: browser,
        format: 'esm',
        exports: 'named'
      },
      {
        file: main,
        format: 'cjs',
        exports: 'named'
      }
    ],
    external: [
      ...Object.keys(dependencies).filter(dep => !whiteList[dep] || {})
    ]
  }
]
