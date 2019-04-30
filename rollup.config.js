import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
const whiteList = {
  'cross-fetch': true,
  'url-join': true
}

const plugins = [
  resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  }),
  commonjs(),
  typescript({
    typescript: require('typescript')
  })
]

export default [
  {
    input: 'src/index.ts',
    plugins: [...plugins, terser()],
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'tipe-js',
      esModule: false
    }
  },
  {
    input: 'src/index.ts',
    plugins,
    output: [
      {
        file: pkg.module,
        format: 'esm'
      },
      {
        file: pkg.main,
        format: 'cjs'
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies).filter(dep => !whiteList[dep] || {})
    ]
  }
]
