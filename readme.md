# auto-responder

Plugin for url-replace, that returns file from local filesystem instead of calling server. So that you can simulate response when server is down or you want to change its response and experiment.

Since this plugin provides complete response, no following plugins and replaces are executed if matching auto response is found.

## Config

This plugin is configured in url-replace config file by field "auto-responder".

	"auto-responder" : [
		{
			"test" : "/svc/users",
			"target" : "users.json",
			"status" : 200,
			"contentType" : "application/json"
		}
	]

* **test** - RegExp to be matched by URL
* **target** - path to file to use as response. Path can be absolute or relative. If path is relative, ".auto-respond" folder is used to resolve it. .auto-respond folder can be placed in current folder or home folder.
