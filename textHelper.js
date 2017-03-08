'use strict';
var textHelper = (function () {
    var nameBlacklist = {
        player: 1,
        players: 1
    };

    return {
        completeHelp: 'Here\'s some things you can say,'
        + ' define friends,'
        + ' what is a baller,'
        + ' tell me what is CNN,'
        + ' what\'s ebay,'
        + ' and cancel.',
        nextHelp: 'You can ask another word',

        getPlayerName: function (recognizedPlayerName) {
            if (!recognizedPlayerName) {
                return undefined;
            }
            var split = recognizedPlayerName.indexOf(' '), newName;

            if (split < 0) {
                newName = recognizedPlayerName;
            } else {
                //the name should only contain a first name, so ignore the second part if any
                newName = recognizedPlayerName.substring(0, split);
            }
            if (nameBlacklist[newName]) {
                //if the name is on our blacklist, it must be mis-recognition
                return undefined;
            }
            return newName;
        }
    };
})();
module.exports = textHelper;
