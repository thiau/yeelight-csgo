(function () {
    "use strict";

    let express = require("express");
    let app = express();
    let port = 3000 || process.env.port

    // let Yeelight = require("yeelight-awesome").Yeelight;
    // const yeelight = new Yeelight({ "lightIp": "192.168.0.109", "lightPort": "55443" });

    // yeelight.connect();

    // yeelight.on("connected", () => {
    //     console.log("fgoi");
    // });

    let Yeelight = require("./helpers/yeelight.js");
    let yeelight = new Yeelight({ "lightIp": "192.168.0.109", "lightPort": "55443" });
    yeelight.connect().then(function () {
        console.log("foi");
    });


    // yeelight.discover().then(function (device) {
    //     console.log("done");
    // }).catch(err => {
    //     console.log(err);
    // })

    // let CSGOGSI = require('node-csgo-gsi');
    // let gsi = new CSGOGSI();
    
    // let y = require("yeelight-awesome"); 

    // const discover = new y.Discover({
    //     port: 1982,
    //     debug: true
    // });

    // discover.once("deviceAdded", (device) => {
    //     console.log("achou");

    //     const yeelight = new y.Yeelight({
    //         lightIp: device.host,
    //         lightPort: device.port
    //     });
 
    //     // yeelight.on("connected", () => {
    //     //     gsi.on('roundWinTeam', function(data) {
    //     //         yeelight.setRGB(new y.Color(174,68,47), "smooth", 500).then(function () {
    //     //             setTimeout(() => {
    //     //                 yeelight.setRGB(new y.Color(47,174,68), "smooth", 500).then(function () {
    //     //                     setTimeout(() => {
    //     //                         yeelight.setRGB(new y.Color(68,47,174), "smooth", 500).then(function () {
    //     //                             setTimeout(() => {
    //     //                                 yeelight.setRGB(new y.Color(255,0,255), "smooth", 500).then(function () {
                                            
    //     //                                 });
    //     //                             }, 500)
    //     //                         });
    //     //                     }, 500)
    //     //                 });
    //     //             }, 500)
    //     //         });
    //     //     });
    //     // });

    //     let colors = [
    //         { "r": 174, "g": 68, "b": 47 },
    //         { "r": 47, "g": 174, "b": 68 },
    //         { "r": 68, "g": 47, "b": 174 },
    //         { "r": 255, "g": 0, "b": 255 }
    //     ]
    

    //     yeelight.on("connected", () => {
    //         shine(yeelight, colors, 1000);
    //     });

    //     yeelight.connect();
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

    app.listen(port, function() {
        console.log(`Server is up on port ${port}`);
    });
}())