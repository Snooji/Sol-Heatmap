import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'heatmap.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
  },
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { modules: false }]],
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
  ],
};
