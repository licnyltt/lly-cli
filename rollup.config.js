import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { nodeExternals } from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from 'rollup-plugin-typescript2';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: [{
            dir: 'dist',
            format: 'cjs'
        }],
        plugins: [
            nodeResolve(),
            nodeExternals({
                devDeps: false
            }),
            typescript(),
            json(),
            commonjs(),
            terser()
        ]
    },
])