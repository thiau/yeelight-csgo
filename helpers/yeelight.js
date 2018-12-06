(function () {
	let y = require("yeelight-awesome");

    module.exports = function Constructor (payload) {
		return {
			"yeelight": new y.Yeelight(payload),
			"connect": function () {
				return new Promise((resolve, reject) => {
					this.yeelight.connect();

					this.yeelight.on("connected", () => {
						resolve();
					});
				});
			},
			"changeColor": function (color, transition_ms) {
				return new Promise((resolve, reject) => {
					this.yeelight.setRGB(new y.Color(color.r, color.g, color.b), "smooth", transition_ms).then(() => {
						setTimeout(resolve, transition_ms);
					}).catch(err => {
						reject(err);
					});
				});
			},
			"shine": async function (colors, transition_ms) {
				for (let i in colors) {
					console.log(`changing to ${JSON.stringify(colors[i])}`);
					await this.changeColor(colors[i], transition_ms);
				}
			}
		}
	}
	
}());