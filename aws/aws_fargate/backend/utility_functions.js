const getUserName = (headers) => {
    return headers.app_user_name;
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