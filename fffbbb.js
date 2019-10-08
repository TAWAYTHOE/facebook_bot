//https://medium.com/@tohure/dialogflow-facebook-messenger-the-story-never-told-ac033202a667 
//https://cloud.google.com/dialogflow/docs/fulfillment-nodejs-lib
//https://miningbusinessdata.com/category/dialogflow/

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

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function other(agent) {
    agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    agent.add(new Card({
        title: `Title: this is a card title`,
        imageUrl: imageUrl,
        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
        buttonText: 'This is a button',
        buttonUrl: linkUrl
      })
    );
    agent.add(new Suggestion(`Quick Reply`));
    agent.add(new Suggestion(`Suggestion`));
    agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  }

let intentMap = new Map();	           //where the intent and the function join together 
	intentMap.set('getName', getName);   //(intent name, function name)
  intentMap.set('Default Welcome Intent', welcome);   //please change the intent name
  intentMap.set('fallback intent', fallback);
  intentMap.set('other intent ', other);      

agent.handleRequest(intentMap);
		
}); 