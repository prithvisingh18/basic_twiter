const PROXY_CONFIG = [
	{
		context: [
			// "/login",
			// "/output/report/list/assets"
			"/**"
		],
		target: "http://localhost:3000",
		secure: false
	}
]

module.exports = PROXY_CONFIG;