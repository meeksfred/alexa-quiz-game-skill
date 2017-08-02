'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

var APP_ID = "amzn1.ask.skill.9f538548-1c39-4cf0-8b83-4c9f3eb50a2c";

//This function returns a descriptive sentence about your data.  Before a user starts a quiz, they can ask about a specific data element,
//like "Ohio."  The skill will speak the sentence from this function, pulling the data values from the appropriate record in your data.
function getSpeechDescription(item)
{
    var sentence = "The " + item.TeamName + ", located in " + item.TeamCity + " were founded in " + item.FoundingYear + ". The " + item.TeamName + " have " + item.HallOfFamePlayers + " in the Hall of Fame, and the abbreviation for the " + item.TeamName + " is <break strength='strong'/><say-as interpret-as='spell-out'>" + item.Abbreviation + "</say-as>.  I've added " + item.TeamName + " to your Alexa app.  Which other Major League baseball team would you like to know about?";
    return sentence;
}

//We have provided two ways to create your quiz questions.  The default way is to phrase all of your questions like: "What is X of Y?"
//If this approach doesn't work for your data, take a look at the commented code in this function.  You can write a different question
//structure for each property of your data.
function getQuestion(counter, property, item)
{
    // return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of "  + item.StateName + "?";

    switch(property)
    {
        case "TeamName":
            return "Here is your " + counter + "th question.  What city or state do the " + item.TeamName + " play in?";
        break;
        case "FoundingYear":
            return "Here is your " + counter + "th question.  In what year was the " + item.TeamName + " organization founded?";
        break;
        case "HallOfFamePlayers":
            return "Here is your " + counter + "th question.  How many players do the " + item.TeamName + " have in the Hall of Fame?";
        break;
        case "Abbreviation":
            return "Here is your " + counter + "th question.  What is the team " + formatCasing(property) + " for the "  + item.TeamName + "?";
        break;
    }
}

//This is the function that returns an answer to your user during the quiz.  Much like the "getQuestion" function above, you can use a
//switch() statement to create different responses for each property in your data.  For example, when this quiz has an answer that includes
//a state abbreviation, we add some SSML to make sure that Alexa spells that abbreviation out (instead of trying to pronounce it.)
function getAnswer(property, item)
{
    switch(property)
    {
        case "Abbreviation":
            return "The " + formatCasing(property) + " of the " + item.TeamCity + item.TeamName + " is <say-as interpret-as='spell-out'>" + item[property] + "</say-as>. "
        break;
        case "TeamName":
            return "The " + item[property] + " play in " + item.TeamCity + ". "
        break;
        case "FoundingYear":
            return "The " + item.TeamCity + item.TeamName + " were founded in " + item[property] + ". "
        break;
        case "HallOfFamePlayers":
            return "The " + item.TeamCity + item.TeamName + " have " + item[property] + " players in the Hall of Fame. "
        break;
    }
}

//This is a list of positive speechcons that this skill will use when a user gets a correct answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite",
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew",
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

//This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

//This is the welcome message for when a user starts the skill without a specific intent.
var WELCOME_MESSAGE = "Welcome to Max's Baseball Quiz Game!  You can ask me about any of the thirty Major League teams, or you can ask me to start a quiz.  What would you like to do?";

//This is the message a user will hear when they start a quiz.
var START_QUIZ_MESSAGE = "OK.  I will ask you 10 questions about Major League Baseball teams.";

//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
var EXIT_SKILL_MESSAGE = "Thank you for playing Max's Baseball Quiz Game!  Let's play again soon!";

//This is the message a user will hear after they ask (and hear) about a specific data element.
var REPROMPT_SPEECH = "Which other team would you like to know about?";

//This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I know lots of things about Major League Baseball teams.  You can ask me about any team, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?";


//This is the response a user will receive when they ask about something we weren't expecting.  For example, say "pizza" to your
//skill when it starts.  This is the response you will receive.
function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

//This is the message a user will receive after each question of a quiz.  It reminds them of their current score.
function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

//This is the message a user will receive after they complete a quiz.  It tells them their final score.
function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

//These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
//This only happens outside of a quiz.

//If you don't want to use cards in your skill, set the USE_CARDS_FLAG to false.  If you set it to true, you will need an image for each
//item in your data.
var USE_CARDS_FLAG = false;

//This is what your card title will be.  For our example, we use the name of the state the user requested.
function getCardTitle(item) { return item.StateName;}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/" + item.Abbreviation + "._TTH_.png"; }

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/" + item.Abbreviation + "._TTH_.png"; }

//=========================================================================================================================================
//TODO: Replace this data with your own.
//=========================================================================================================================================
var data = [
                {TeamName: "Diamondbacks",   Abbreviation: "ARI", TeamCity: "Arizona",      FoundingYear: 1997, HallOfFamePlayers: 1 },
                {TeamName: "Braves",         Abbreviation: "ATL", TeamCity: "Atlanta",      FoundingYear: 1871, HallOfFamePlayers: 12 },
                {TeamName: "Orioles",        Abbreviation: "BAL", TeamCity: "Baltimore",    FoundingYear: 1901, HallOfFamePlayers: 8 },
                {TeamName: "Red Sox",        Abbreviation: "BOS", TeamCity: "Boston",       FoundingYear: 1901, HallOfFamePlayers: 13 },
                {TeamName: "Cubs",           Abbreviation: "CHC", TeamCity: "Chicago",      FoundingYear: 1876, HallOfFamePlayers: 15 },
                {TeamName: "White Sox",      Abbreviation: "CHW", TeamCity: "Chicago",      FoundingYear: 1900, HallOfFamePlayers: 11 },
                {TeamName: "Reds",           Abbreviation: "CIN", TeamCity: "Cincinatti",   FoundingYear: 1881, HallOfFamePlayers: 10 },
                {TeamName: "Indians",        Abbreviation: "CLE", TeamCity: "Cleveland",    FoundingYear: 1901, HallOfFamePlayers: 14 },
                {TeamName: "Rockies",        Abbreviation: "COL", TeamCity: "Colorado",     FoundingYear: 1993, HallOfFamePlayers: 0 },
                {TeamName: "Tigers",         Abbreviation: "DET", TeamCity: "Detroit",      FoundingYear: 1901, HallOfFamePlayers: 11 },
                {TeamName: "Astros",         Abbreviation: "HOU", TeamCity: "Houston",      FoundingYear: 1962, HallOfFamePlayers: 2 },
                {TeamName: "Royals",         Abbreviation: "KC",  TeamCity: "Kansas City",  FoundingYear: 1969, HallOfFamePlayers: 1 },
                {TeamName: "Angels",         Abbreviation: "LAA", TeamCity: "Anaheim",      FoundingYear: 1961, HallOfFamePlayers: 0 },
                {TeamName: "Dodgers",        Abbreviation: "LAD", TeamCity: "Los Angeles",  FoundingYear: 1883, HallOfFamePlayers: 15 },
                {TeamName: "Marlins",        Abbreviation: "MIA", TeamCity: "Miami",        FoundingYear: 1993, HallOfFamePlayers: 0 },
                {TeamName: "Brewers",        Abbreviation: "MIL", TeamCity: "Milwaukee",    FoundingYear: 1969, HallOfFamePlayers: 2 },
                {TeamName: "Twins",          Abbreviation: "MIN", TeamCity: "Minnesota",    FoundingYear: 1901, HallOfFamePlayers: 8 },
                {TeamName: "Mets",           Abbreviation: "NYM", TeamCity: "New York",     FoundingYear: 1962, HallOfFamePlayers: 2 },
                {TeamName: "Yankees",        Abbreviation: "NYY", TeamCity: "New York",     FoundingYear: 1901, HallOfFamePlayers: 24 },
                {TeamName: "Athletics",      Abbreviation: "OAK", TeamCity: "Oakland",      FoundingYear: 1901, HallOfFamePlayers: 10 },
                {TeamName: "Phillies",       Abbreviation: "PHI", TeamCity: "Philadelphia", FoundingYear: 1883, HallOfFamePlayers: 6 },
                {TeamName: "Pirates",        Abbreviation: "PIT", TeamCity: "Pittsburgh",   FoundingYear: 1881, HallOfFamePlayers: 13 },
                {TeamName: "Padres",         Abbreviation: "SD",  TeamCity: "San Diego",    FoundingYear: 1969, HallOfFamePlayers: 2 },
                {TeamName: "Giants",         Abbreviation: "SF",  TeamCity: "San Francisco",FoundingYear: 1883, HallOfFamePlayers: 24 },
                {TeamName: "Mariners",       Abbreviation: "SEA", TeamCity: "Seattle",      FoundingYear: 1977, HallOfFamePlayers: 1 },
                {TeamName: "Cardinals",      Abbreviation: "STL", TeamCity: "Saint Louis",  FoundingYear: 1881, HallOfFamePlayers: 10 },
                {TeamName: "Rays",           Abbreviation: "TB",  TeamCity: "Tampa Bay",    FoundingYear: 1998, HallOfFamePlayers: 0 },
                {TeamName: "Rangers",        Abbreviation: "TEX", TeamCity: "Texas",        FoundingYear: 1961, HallOfFamePlayers: 2 },
                {TeamName: "Blue Jays",      Abbreviation: "TOR", TeamCity: "Toronto",      FoundingYear: 1977, HallOfFamePlayers: 1 },
                {TeamName: "Nationals",      Abbreviation: "WSH", TeamCity: "Washington",   FoundingYear: 1969, HallOfFamePlayers: 3 }
            ];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

var counter = 0;

var states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

var startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.emit(":ask", WELCOME_MESSAGE, HELP_MESSAGE);
    },
    "AnswerIntent": function() {
        var item = getItem(this.event.request.intent.slots);

        if (item && item[Object.getOwnPropertyNames(data[0])[0]] != undefined)
        {
          console.log("\nMEMO's TEST\n");
            if (USE_CARDS_FLAG)
            {
                var imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};
                this.emit(":askWithCard", getSpeechDescription(item), REPROMPT_SPEECH, getCardTitle(item), getTextDescription(item), imageObj);
            }
            else
            {
                this.emit(":ask", getSpeechDescription(item), REPROMPT_SPEECH);
            }
        }
        else
        {
            this.emit(":ask", getBadAnswer(item), getBadAnswer(item));

        }
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    }
});


var quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        if (this.attributes["counter"] == 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        var random = getRandom(0, data.length-1);
        var item = data[random];

        var propertyArray = Object.getOwnPropertyNames(item);
        var property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        var question = getQuestion(this.attributes["counter"], property, item);
        var speech = this.attributes["response"] + question;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        var response = "";
        var item = this.attributes["quizitem"];
        var property = this.attributes["quizproperty"]

        var correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.emit(":tell", response + " " + EXIT_SKILL_MESSAGE);
        }
    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    }
});

function compareSlots(slots, value)
{
    for (var slot in slots)
    {
        if (slots[slot].value != undefined)
        {
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase())
            {
                return true;
            }
        }
    }
    return false;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getItem(slots)
{
    var propertyArray = Object.getOwnPropertyNames(data[0]);
    var value;

    for (var slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (var property in propertyArray)
            {
                var item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    var speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";
}

function formatCasing(key)
{
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item)
{
    var text = "";

    for (var key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};
