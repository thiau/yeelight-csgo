(function () {
    "use strict";

    let CSGOGSI = require('node-csgo-gsi');
    let gsi = new CSGOGSI();

    module.exports = function Constructor () {
        return {
            "player": {},
            "start": function () {
                gsi.on('all', function(data) {
                    if (data.player.team) {
                        console.log("Player Data");
                        console.log(data.player)
                    } else {
                        console.log("Player does not have a team");
                    }
                 });
            }
        }
    }
}());