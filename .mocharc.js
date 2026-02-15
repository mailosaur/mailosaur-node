process.env.TS_NODE_PROJECT = 'tsconfig.test.json';
process.env.TS_NODE_TRANSPILE_ONLY = 'true';

module.exports = {
    require: ['ts-node/register/transpile-only'],
    extension: ['ts'],
    spec: ['test/**/*.ts'],
    timeout: 60000
};
