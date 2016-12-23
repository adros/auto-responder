var path = require("path");
var fs = require("fs");

var logger;

function init(_proxy, _logger) {
	logger = _logger;
}

function exec(config, req, res) {

	var autoResponderConfig = config["pro-xy-auto-responder"];
	if (!autoResponderConfig || autoResponderConfig.disabled) {
		logger.trace(`Auto responder not enabled (${req.url})`);
		return;
	}

	var responses = autoResponderConfig.responses;
	if (!responses || !responses.length) {
		logger.trace(`No auto reponses defined (${req.url})`);
		return;
	}


	return responses.some(function(autoResponse) {
		if (autoResponse.disabled
			|| (!!autoResponse.method && req.method.toLowerCase() != autoResponse.method.toLowerCase())
			|| !new RegExp(autoResponse.urlPattern).test(req.url)) {
			return false;
		}

		return sendResponse(req, res, autoResponse);
	});
}

function sendResponse(req, res, autoResponse) {
	var fileLocation = getFileLocation(autoResponse.target);
	if (!fileLocation) {
		return false;
	}

	if (autoResponse.status) {
		res.statusCode = autoResponse.status;
	}
	if (autoResponse.headers) {
		Object.keys(autoResponse.headers).forEach(key => res.setHeader(key, autoResponse.headers[key]));
	}
	res.setHeader("x-pro-xy-auto-response", autoResponse.target);
	logger.debug(`Responding with "${fileLocation}" to request "${req.url}"`);
	fs.createReadStream(fileLocation).pipe(res);
	return true;
}

function getFileLocation(target) {
	if (path.isAbsolute(target)) {
		if (fs.existsSync(target)) {
			return target;
		}
		logger.warn(`Auto response with absolute target does not exists "${target}"`);
		return null;
	}

	var homePath = path.join(process.env.HOME, ".auto-respond", target);

	if (fs.existsSync(homePath)) {
		return homePath;
	}
	logger.warn(`Auto response target not found in HOME folder "${homePath}"`);
	return null;

}

module.exports = {
	init,
	exec
};
