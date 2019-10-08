'use strict';
const dialogflow = require('dialogflow');
const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
process.env.DEBUG = 'dialogflow:*';

exports.firstfunction = functions.https.onRequest ((request, response) => {
	const agent = new WebhookClient({ request, response });
  console.log('Request Headers: ' + JSON.stringify(request.headers));
  console.log('Request Body: ' + JSON.stringify(request.body));
	const userProfile = request.body.originalDetectIntentRequest.payload.data.userProfile;
	//console.log('User Profile : ' + userProfile);


  function getName() {		 
    const name = userProfile.name;    
      console.log(`The first name is ${name}`);
      agent.add(`HI ${name}! Welcome from first time try.`);    
  }

let intentMap = new Map();	
	intentMap.set('getName', getName);
agent.handleRequest(intentMap);
		
}); 