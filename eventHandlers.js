'use strict';
var textHelper = require('./textHelper');

var registerEventHandlers = function (eventHandlers, skillContext) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        //if user said a one shot command that triggered an intent event,
        //it will start a new session, and then we should avoid speaking too many words.
        skillContext.needMoreHelp = false;
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        //Speak welcome message and ask user questions
        //based on whether there are players or not.
        storage.loadGame(session, function (currentGame) {
            var speechOutput = '',
                reprompt;
            
                speechOutput += 'Welcome to Urban Dictionary, I can define commonly asked words and phrases';
                reprompt = "What word or phrase do you want to learn about?";
                // reprompt = textHelper.completeHelp;
                // reprompt = textHelper.nextHelp;
            
            response.ask(speechOutput, reprompt);
        });
    };
};
exports.register = registerEventHandlers;
