(function () {
	let y = require("yeelight-awesome");

    module.exports = function Constructor (payload) {
		return {
			"yeelight": new y.Yeelight(payload),
			"connect": function () {
				return new Promise((resolve, reject) => {
					this.yeelight.connect();

					this.yeelight.on("connected", () => {
						console.log("fgoi");
					});
				});
			}
		}
	}
	
}());