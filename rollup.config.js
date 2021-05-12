import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const external = ['react', 'react-dom'];

const config = [{
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      name: 'EasyForm',
      format: 'iife',
      sourcemap: true,
      exports: 'named',
      external,
      globals,
    },
    {
      file: pkg.main,
      name: 'EasyForm',
      format: 'umd',
      sourcemap: true,
      exports: 'named',
      external,
      globals,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      plugins: [
        '@babel/plugin-transform-runtime',
      ],
    }),
    resolve(),
    peerDepsExternal(),
    commonjs({
      include: 'node_modules/clsx',
    }),
    copy({
      targets: [
        { src: 'src/index.d.ts', dest: 'dist' },
      ],
    }),
    del({ targets: ['dist/*'] }),
  ],
}];

let shouldOpen = true;
const exampleConfig = {
  input: 'example/example.js',
  output: [
    {
      file: 'dist/example/example.js',
      format: 'iife',
      sourcemap: true,
      exports: 'auto',
      external,
      globals,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    peerDepsExternal(),
    commonjs(),
    resolve(),
    copy({
      targets: [
        { src: 'example/index.html', dest: 'dist/example' },
      ],
    }),
    serve({
      open: shouldOpen,
      contentBase: 'dist/example',
      onListening() {
        shouldOpen = false;
      },
    }),
    livereload({
      watch: 'dist/example',
    }),
  ],
};

if (process.env.RUN_SERVER === 'true') {
  config.push(exampleConfig);
}

export default config;
