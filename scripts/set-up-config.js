const fs = require('fs-extra');
const path = require('path');

const environmentProdPath = path.join(__dirname, '../src/environments/environment.prod.ts');
const environmentPath = path.join(__dirname, '../src/environments/environment.ts');

const template = fs.readFileSync(environmentProdPath, 'utf8');

const keys = ['omdbApiKey', 'firebaseApiKey', 'firebaseAuthDomain', 'firebaseDatabaseURL', 'firebaseProjectId', 'firebaseStorageBucket', 'firebaseMessagingSenderId', 'firebaseAppId', 'firebaseMeasurementId', 'firebaseUrl'];

const args = process.argv.slice(2);

const result = keys.reduce((acc, key, index) => acc.replace(`{${key}}`, args[index]), template);

fs.writeFileSync(environmentProdPath, result);
fs.writeFileSync(environmentPath, result);

