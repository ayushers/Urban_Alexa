'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = undefined;//replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var skillContext = {};

/**
 * Urban_Dict is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Urban_Dict = function () {
    AlexaSkill.call(this, APP_ID);
    skillContext.needMoreHelp = true;
};


// Extend AlexaSkill
Urban_Dict.prototype = Object.create(AlexaSkill.prototype);
Urban_Dict.prototype.constructor = Urban_Dict;

eventHandlers.register(Urban_Dict.prototype.eventHandlers, skillContext);
intentHandlers.register(Urban_Dict.prototype.intentHandlers, skillContext);

module.exports = Urban_Dict;

