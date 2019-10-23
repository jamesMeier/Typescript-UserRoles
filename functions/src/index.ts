import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
//require express for our server/routing/api access
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
// configure the routes that the app will handle.
import { routesConfig } from './users/routes-config';

// Initialize the firebase - admin SDK module
admin.initializeApp();

// Set an Express app as the handler of our api https endpoint
const app = express();
//Configring app instance to support CORS and add JSON body oarser middleware
//Now able to make requests from any URL and parse JSON formatted requests
app.use(bodyParser.json());
app.use(cors({ origin: true }));
// All requests going to /api will be handled by the app instance
//FFs allow Express app as the handler and any path set after the api will also be handled
//Allowing specific endpoints with specific HTTP verbs
export const api = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!');
});
