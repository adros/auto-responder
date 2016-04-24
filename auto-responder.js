var path = require("path");
var fs = require("fs");

module.exports = function(config, req, res) {
	return (config["auto-responder"] || []).some(function(autoResponse) {
		if (req.url.match(autoResponse.test)) {
			return sendResponse(res, autoResponse);
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
		var fileLocation = getFileLocation(autoResponse);
		if (fileLocation) {
			fs.createReadStream(fileLocation).pipe(res);
			return true;
		} else {
			return false;
		}
	}
}

function getFileLocation(autoResponse) {
	if (path.isAbsolute(autoResponse.target)) {
		if (fs.existsSync(autoResponse.target)) {
			return autoResponse.target;
		}
		return null;
	}

	var possiblePaths = [
		path.join(".auto-respond", autoResponse.target),
		path.join(process.env.HOME, ".auto-respond", autoResponse.target)
	];

	return possiblePaths.filter(function(targetPath) {
		return fs.existsSync(targetPath);
	})[0];
}
