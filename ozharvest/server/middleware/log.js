const requestLogger = (request, response, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(request.method, request.path)
        console.log(request.body)
        console.log('---')
    }
    next()
}

module.exports = {requestLogger}
