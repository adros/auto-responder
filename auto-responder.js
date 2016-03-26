var path = require("path");
var fs = require("fs");

module.exports = function(config, req, res) {
	return (config["auto-responder"] || []).some(function(autoResponse) {
		if (req.url.match(autoResponse.test)) {
			sendResponse(res, autoResponse);
			return true;
		}
	});
};

function sendResponse(res, autoResponse) {
	if (autoResponse.status) {
		res.statusCode = autoResponse.status;
	}
	if (autoResponse.contentType) {
		res.setHeader("Content-Type", autoResponse.contentType);
	}
	if (autoResponse.target) {
		fs.createReadStream(getFileLocation(autoResponse)).pipe(res);
		return true;
	}
}

function getFileLocation(autoResponse) {
	if (path.isAbsolute(autoResponse.target)) {
		return autoResponse.target;
	}

	var possiblePaths = [
		path.join(".auto-respond", autoResponse.target),
		path.join("~", ".auto-respond", autoResponse.target)
	];

	return possiblePaths.filter(function(targetPath) {
		return fs.existsSync(targetPath);
	})[0];
}
