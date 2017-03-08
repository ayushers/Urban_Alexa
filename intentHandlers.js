'use strict';
var textHelper = require('./textHelper'),
    https = require('https');

function getJsonEvents(eventCallback, word) {
    console.log(word);
    var url = "https://api.urbandictionary.com/v0/define?term=" + word;

    https.get(url, function(res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var stringResult = JSON.parse(body);
            console.log('---------------------PRINTING--------------');
            console.log(stringResult.list);
            eventCallback(stringResult);
        });
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}

var registerIntentHandlers = function (intentHandlers, skillContext) {

    intentHandlers.WordDefIntent = function (intent, session, response) {
        var wordToDefine = intent.slots.Word.value;
        var speechOutput = '';
        console.log(wordToDefine);

        getJsonEvents( function (events) {

                var _def1 = events.list[0].definition;
                // _def2 = events.list[1].definition;

                if (_def1 != undefined ){
                    speechOutput += _def1;
                }
                else{
                    speechOutput = 'Word was not recognized'
                }

                response.ask(speechOutput + textHelper.nextHelp, textHelper.nextHelp);
                return;
                
            }, wordToDefine);
    }

    intentHandlers['AMAZON.HelpIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.ask(textHelper.completeHelp + textHelper.nextHelp, textHelper.nextHelp);
        } else {
            response.tell(textHelper.nextHelp);
        }
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Cancelled.');
        } else {
            response.tell('');
        }
    };

    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Stopping.');
        } else {
            response.tell('');
        }
    };
};
exports.register = registerIntentHandlers;
