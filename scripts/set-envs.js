const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';

const envConfigFile = `
export const environment = {
  firebaseConfig: {
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    locationId: '${process.env.FIREBASE_LOCATION_ID}',
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
  }
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPath, envConfigFile);
