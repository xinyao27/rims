import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const config = {
  input: './src/index.js',
  output: {
    file: './dist/rims.js',
    format: 'umd',
    name: 'Rev',
  },
  external: ['react'],
  plugins: [
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    resolve({
      jsnext: true,
      browser: true,
      preferBuiltins: false,
    }),
  ],
};

if (process.argv[3] === '--compress') {
  config.output.file = './dist/rims.min.js';
  config.plugins.push(terser());
}

export default config;
