'use strict';

require('dotenv').config();

const path = require('path');
const exec = require('child_process').execSync;
const argv = require('minimist')(process.argv.slice(2));

const cwd = path.join(__dirname, '../../');
const env = argv.env || 'qa';
const qasuffix = (env !== 'prod') ? '_QA' : '';

const envConfig = {
    AWS_ACCESS_KEY_ID: process.env['RUM_AWS_ACCESS_KEY'+qasuffix],
    AWS_SECRET_ACCESS_KEY: process.env['RUM_AWS_SECRET_KEY'+qasuffix],
    AWS_REGION: process.env['RUM_AWS_REGION'] || 'eu-west-1'
};

const cmd = `apex deploy -C ./tasks/lambda --env ${env} --set RUM_MYSQL_DSN=${process.env['RUM_MYSQL_DSN'+qasuffix]}`;

console.log('Deploying Lambda functions.  Environment: ' + env);
exec(cmd, {cwd: cwd, stdio: 'inherit', env: envConfig});

