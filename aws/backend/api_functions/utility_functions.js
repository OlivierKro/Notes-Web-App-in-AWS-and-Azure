const getUserName = (headers) => {
	return headers.Username;
}

const getResponseHeaders = () => {
	return {
		'Access-Control-Allow-Origin': '*'
	}
}

module.exports = {
	getUserName,
	getResponseHeaders
}