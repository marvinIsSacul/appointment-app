/**
 * File tries to get rid of this annoying problem that's caused by react-scripts whenever I try to use ts-node
 * @link https://stackoverflow.com/questions/63445821/ts-node-execute-typescript-with-module-import-and-module-defined
 */

const { writeFileSync } = require('fs')
const config = require('./tsconfig.json')

config.compilerOptions.module = 'commonjs'

writeFileSync('./tsconfig.json', JSON.stringify(config, null, 2))
