(function () {
	let y = require("yeelight-awesome");

    module.exports = function Constructor (payload) {
		return {
			"yeelight": new y.Yeelight(payload),
			"connect": function () {
				return new Promise((resolve, reject) => {
					this.yeelight.connect();

					this.yeelight.on("connected", (data) => {
						this.yeelight.getProperty([y.DevicePropery.BRIGHT, y.DevicePropery.RGB, y.DevicePropery.HUE, y.DevicePropery.SAT]).then((props) => {
							resolve({
								"bright": props.result.result[0],
								"rgb": props.result.result[1],
								"hue": props.result.result[2],
								"sat": props.result.result[3]
							});
						});
					});
				});
			},
			"changeColor": function (color, transition_ms=500, duration_ms=20) {
				return new Promise((resolve, reject) => {
					console.log(color)
					this.yeelight.setRGB(color, "smooth", transition_ms).then(() => {
						setTimeout(resolve, duration_ms);
					}).catch(err => {
						console.log(err);
						reject(err);
					});

					// this.yeelight.setHSV(color.hue, color.sat, "smooth", transition_ms).then(() => {
					// 	setTimeout(resolve, duration_ms);
					// }).catch(err => {
					// 	reject(err);
					// });
				});
			},
			"changeHSV": function (hue, sat, transition_ms, duration_ms) {
				return new Promise((resolve, reject) => {
					this.yeelight.setHSV(hue, sat, "smooth", transition_ms).then(() => {
						setTimeout(resolve, duration_ms);
					}).catch(err => {
						reject(err);
					});
				});
			},
			"shine": async function (colors, transition_ms, duration_ms, times) {
				for (let i=0; i < times; i++) {
					for (let i in colors) {
						console.log(`changing to ${JSON.stringify(colors[i])}`);
						await this.changeColor(colors[i], transition_ms, duration_ms);
					}
				}
			}
		}
	}
	
}());