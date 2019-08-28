(function () {
    "use strict";

    let express = require("express");
    let app = express();
    let port = 3000 || process.env.port

    let colors = [
        { "r": 174, "g": 68, "b": 47 },
        { "r": 47, "g": 174, "b": 68 },
        { "r": 68, "g": 47, "b": 174 },
        { "r": 255, "g": 0, "b": 255 }
    ]

    let mappings = require("./mappings/csgo");

    let CSGOGSI = require('node-csgo-gsi');
    let gsi = new CSGOGSI();


    // gsi.on('player', function (player) {
    //     console.log("AQUIIi")
    // });



    // gsi.on('roundWinTeam', function (data) {
    //     console.log("Quem ganhou foi")
    //     console.log(data)
    // });


    // gsi.on('player', function(player) {
    //     if (player.team) {

    //     }
    //  });

    // gsi.on('all', function (data) {
    //     if (data.player.team) {
    //         console.log("Player Data");
    //         console.log(data.player)
    //     } else {
    //         console.log("Player does not have a team");
    //     }

    //     console.log(data);
    // });

    // gsi.on('bombState', function (bombData) {
    //     console.log("Bomb Data");
    //     console.log(bombData);

    //     if (bombData === "exploded") {
    //         console.log("Bomba Explodiu");
    //     }

    //     if (bombData === "defused") {
    //         console.log("Bomba Defusada");
    //     }
    // });

    // round: { phase: 'over', win_team: 'T', bomb: 'exploded' },
    //round: { phase: 'over', win_team: 'CT' },
    //round: { phase: 'over', win_team: 'T' },


    let Yeelight = require("./helpers/yeelight.js");
    let yeelight = new Yeelight({ "lightIp": "192.168.0.102", "lightPort": "55443" });
    yeelight.connect().then((lightProps) => {
        console.log(":: Connected on Yeelight ::");

        let initHue = 0;
        let initSat = 20;

        yeelight.changeHSV(initHue, initSat, 500, 20).catch(err => console.log(err));

        gsi.on('all', function (data) {
            if (data.round) {
                if (data.round.phase === "over") {
                    if (data.round.bomb === "exploded") {
                        yeelight.changeColor(16713728, 500, 2000).then(() => {
                            yeelight.changeHSV(initHue, initSat, 500, 0).then(() => {
                                console.log("done")
                            });
                        });
                    } else if (data.round.win_team === "T") {
                        yeelight.changeColor(16746371, 500, 3000).then(() => {
                            yeelight.changeHSV(initHue, initSat, 500, 0).then(() => {
                                console.log("done")
                            });
                        });
                    } else {
                        yeelight.changeColor(1133823, 500, 3000).then(() => {
                            yeelight.changeHSV(initHue, initSat, 500, 0).then(() => {
                                console.log("done")
                            });
                        });
                    }
                }
            }

        });

        // gsi.on('bombState', function (bombData) {
        //     if (bombData === "exploded") {
        //         yeelight.changeColor(16724769, 500, 2000).then(() => {
        //             yeelight.changeHSV(initHue, initSat, 500, 0).then(() => {
        //                 console.log("done")
        //             });
        //         });
        //     }

        //     if (bombData === "defused") {
        //         yeelight.changeColor(1133823, 500, 3000).then(() => {
        //             yeelight.changeHSV(initHue, initSat, 500, 0).then(() => {
        //                 console.log("done")
        //             });
        //         });
        //     }
        // });


        // gsi.on('roundWinTeam', function(data) {
        //     yeelight.shine(mappings.bombExplosion, 500).then(() => {
        //         console.log("ptonto");
        //     });
        // });
    });


    // yeelight.discover().then(function (device) {
    //     console.log(device);
    // }).catch(err => {
    //     console.log(err);
    // })



    // let y = require("yeelight-awesome"); 

    // const discover = new y.Discover({
    //     port: 1982,
    //     debug: true
    // });

    // discover.once("deviceAdded", (device) => {
    //     console.log("achou");

    //     console.log({
    //         lightIp: device.host,
    //         lightPort: device.port
    //     })

    //     // const yeelight = new y.Yeelight({
    //     //     lightIp: device.host,
    //     //     lightPort: device.port
    //     // });

    //     // yeelight.on("connected", () => {
    //     //     gsi.on('roundWinTeam', function(data) {

    //     //     });
    //     // });


    //     // yeelight.on("connected", () => {
    //     //     shine(yeelight, colors, 1000);
    //     // });

    //     // yeelight.connect();
    // });

    // discover.start();




    // function changeColor(yeelight, color, transition_ms) {
    //     return new Promise((resolve, reject) => {
    //         yeelight.setRGB(new y.Color(color.r, color.g, color.b), "smooth", transition_ms).then(() => {
    //             setTimeout(resolve, transition_ms);
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //     })
    // }

    // async function shine(light, colors, transition_ms) {
    //     for (let i in colors) {
    //         await changeColor(light, colors[i], transition_ms);
    //         console.log("done");
    //     }
    //  }

    app.listen(port, function () {
        console.log(`Server is up on port ${port}`);
    });
}())