const fs = require('fs-extra');
const path = require('path');

const environmentPath = path.join(__dirname, '../src/environments/environment.prod.ts');

const template = fs.readFileSync(environmentPath, 'utf8');

const keys = ['omdbApiKey', 'firebaseApiKey', 'firebaseAuthDomain', 'firebaseDatabaseURL', 'firebaseProjectId', 'firebaseStorageBucket', 'firebaseMessagingSenderId', 'firebaseAppId', 'firebaseMeasurementId', 'firebaseUrl'];

const args = process.argv.slice(2);

const result = keys.reduce((acc, key, index) => acc.replace(`{${key}}`, args[index]), template);

fs.writeFileSync(environmentPath, result)

