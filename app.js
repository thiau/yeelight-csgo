(function () {
    "use strict";

    let express = require("express");
    let app = express();
    let port = 3000 || process.env.port

    let CSGOGSI = require('node-csgo-gsi');
    let gsi = new CSGOGSI();

    let Yeelight = require("./helpers/yeelight.js");
    let yeelight = new Yeelight({ "lightIp": "10.0.0.101", "lightPort": "55443" });

    yeelight.connect().then((lightProps) => {
        console.log(":: Connected on Yeelight ::");
        console.log(lightProps);
        yeelight.changeColor('16711688').then(function (data) {
            console.log(data)
        })

        yeelight.changeColor('16711688').catch(err => console.log(err));
        

        // yeelight.changeHSV(0, 20, 500, 20).catch(err => console.log(err));
    });



    

    // gsi.on("gameMap", function(data) {
    //     console.log(data);
    // });

    // gsi.on("bombTimeLeft", function(data) {
    //     console.log(data);
    // });

    // app.listen(port, function () {
    //     console.log(`Server is up on port ${port}`);
    // });
}())