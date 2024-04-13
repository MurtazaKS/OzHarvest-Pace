const errorMiddleware = (error, request, response, next) => {
    console.log("ERROR", error.name)
    console.log(error.stack)
    response.status(500).send({error: error.name})
    next()
}


module.exports = {errorMiddleware}
