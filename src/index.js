/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.28556fd7-9f9e-459f-97ec-c82ef6dac89e";

/**
 * Array containing feng shui facts.
 */
var FENG_SHUI_FACTS = [
    "Feng shui is the ancient Chinese art of placement, and is used to faciliate flow of chi.",
    "Feng shui translates to wind and water, and together these words represent harmony and balance.",
    "Feng shui has existed for over 3,000 years.",
    "Blue and Black are associated with water energy, and they support inner work.",
    "Green is associated with wood energy, and can motivate internal change.",
    "Red is associated with fire, which supports life energy and can promote activity.",
    "Yellow is associated with earth energy, and is thought to elevate mental activity.",
    "White and metallic colors are thought to support focus and purity.",
    "To create good feng shui in your bedroom, position your bed so that it is not in line with the door.",
    "To create good feng shui in your bedroom, avoid placing your bed in front of or underneath a window.",
    "To create good feng shui in your living room, avoid placing a mirror in a position where it reflects doors and windows.",
    "To create good feng shui in your living room, place green plants in the south east area of the room.",
    "To create good feng shui in your bathroom, open a window to let in fresh air.",
    "To create good feng shui in your kitchen, it is recommended to have 9 oranges in a bowl for good luck and prosperity.",
    "Copper pots and pans attract positive chi in a kitchen.",
    "To create good feng shui, do not position your kitchen in the center of your home.",
    "To create good feng shui in your home, avoid a round-shaped kitchen layout.",
    "To create good feng shui in your laundry room, keep the dryer door closed at all times.",
    "In feng shui, the commanding position is one where you have your back to the wall and your face to the door.",
    "A desk made of wood has good feng shui.",
    "A desk with rounded corners has good feng shui"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * FengShuiMaster is a customization of SpaceGeek
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var FengShuiMaster = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
FengShuiMaster.prototype = Object.create(AlexaSkill.prototype);
FengShuiMaster.prototype.constructor = FengShuiMaster;

FengShuiMaster.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("FengShuiMaster onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

FengShuiMaster.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("FengShuiMaster onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
FengShuiMaster.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("FengShuiMaster onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

FengShuiMaster.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Feng Shui Master tell me a feng shui fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random feng shui fact from the feng shui facts list
    var factIndex = Math.floor(Math.random() * FENG_SHUI_FACTS.length);
    var fact = FENG_SHUI_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your feng shui fact: " + fact;

    response.tellWithCard(speechOutput, "FengShuiMaster", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the FengShuiMaster skill.
    var FengShuiMaster = new FengShuiMaster();
    FengShuiMaster.execute(event, context);
};
