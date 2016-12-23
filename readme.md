# pro-xy-auto-responder

Plugin for pro-xy, that returns file from local filesystem instead of calling server. So that you can simulate response when server is down or you want to change its response and experiment.

Since this plugin provides complete response, no following plugins and replaces are executed if matching auto response is found.

Sample configuration

This plugin is configured in url-replace config file by field "auto-responder".


```
{
    "port": 8000,
    "logLevel": "INFO",
    "plugins": [
        "pro-xy-auto-responder"
    ],
    "pro-xy-auto-responder": {
		"disabled": false,
		"replaces": [
			{
                "disabled": false,
				"urlPattern": "my/sample/url",
				"target": "sompleFile.txt",
                "method": "GET",
				"status": 200,
                "headers": {
                    "server": "Apache-Coyote/1.1",
                    "expires": "Thu, 01 Jan 1970 00:00:00 GMT",
                    "content-range": "items 0-14/*",
                    "content-type": "application/json;charset=UTF-8"
                }
		    }
		]
	}
}
```

- *urlPattern* - RegExp to be matched by URL
- *status* - Status to be set to response
- *method* - If specified, auto response will be sent only if request's method matches
- *target* - path to file to use as response. Path can be absolute or relative. If path is relative, ".auto-respond" folder in HOME is used to resolve it.
- *headers* - map of HTTP headers that will be added to response
- *disabled* - disable rule
