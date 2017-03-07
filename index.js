'use strict';
var Urban_Dict = require('./Urban_Dict');

exports.handler = function (event, context) {
    var urban_Dict = new Urban_Dict();
    urban_Dict.execute(event, context);
};
