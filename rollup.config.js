import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      exports: 'auto',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
    peerDepsExternal(),
    copy({
      targets: [{ src: 'src/index.d.ts', dest: 'dist' }],
    }),
    del({ targets: ['dist/*'] }),
  ],
  // external: Object.keys(pkg.peerDependencies || {}),
};
