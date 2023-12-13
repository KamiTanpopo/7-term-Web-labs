const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError")

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] 
        if (!token) {
            return ApiError.unauthorized("Не авторизований користувач")
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        ApiError.unauthorized("Не авторизований користувач")
    }
}