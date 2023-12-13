const User = require('../models/user')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (id, username, role, name, surname) => {
    return jwt.sign(
        {id, username, role, name, surname},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {username, password, role} = req.body
        if (!username || !password)
            return next(ApiError.badRequest('Не валідний юзернейм чи пароль'))

        const candidate = await User.findOne({where: {username}})
        if (candidate)
            return next(ApiError.badRequest('Користувач з таким юзернеймом вже існує!'))

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, role, password: hashPassword})
        const token = generateJwt(user.id, user.username, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {username, password} = req.body
        if (!username || !password)
            return next(ApiError.badRequest('Не валідний юзернейм чи пароль'))
        const user = await User.findOne({where: {username}})
        if (!user) {
            return next(ApiError.internal('Кристувача не знайдено'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Вказано неправильний пароль'))
        }
        const token = generateJwt(user.id, user.username, user.role, user.name, user.surname)
        return res.json({token})
    }

    async check(req, res, next) {
        const user = await User.findOne({where: req.user.id})
        const token = generateJwt(req.user.id, user.username, req.user.role, user.name, user.surname)
        return res.json({token})
    }

    async getAll(req, res) {
        try {
            const users = await User.findAll()
            res.json(users)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOne(req, res) {
        const userId = req.params.id
        try {
            const user = await User.findByPk(userId)
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({error: 'Користувача не знайдено'})
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async update(req, res, next) {
        const {id, username, password} = req.body

        if(password)
            req.body.password = await bcrypt.hash(password, 5)

        const candidate = await User.findOne({where: {username}})
        if (candidate && candidate.id !== id)
            return next(ApiError.badRequest('Користувач з таким юзернеймом вже існує'))

        const [updated] = await User.update(req.body, {
            where: {id: id},
        })
        if (updated) {
            res.json({message: 'Користувача оновлено'})
        } else {
            res.status(404).json({error: 'Користувача не знайдено'})
        }
    }

    async delete(req, res) {
        const userId = req.params.id
        try {
            const deleted = await User.destroy({
                where: {id: userId},
            })
            if (deleted) {
                res.json({message: 'Користувача видалено'})
            } else {
                res.status(404).json({error: 'Користувача не знайдено'})
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new UserController()
