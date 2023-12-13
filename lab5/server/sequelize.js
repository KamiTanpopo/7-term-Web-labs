const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'mydatabase.db',
})

module.exports = sequelize
