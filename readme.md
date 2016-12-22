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
				"urlPattern": "my/sample/url",
				"status": 200,
				"contentType": "application/json",
				"target": "/home/myname/.pro-xyrc.json",
                "disabled": false
		    }
		]
	}
}
```

- *urlPattern* - RegExp to be matched by URL
- *status* - Status to be set to response
- *contentType* - Content type to be set to response
- *target* - path to file to use as response. Path can be absolute or relative. If path is relative, ".auto-respond" folder in HOME is used to resolve it.
- *disabled* - disable rule
