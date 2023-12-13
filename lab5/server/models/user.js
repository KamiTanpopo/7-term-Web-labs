const {DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isValidStatus(value) {
                if (value !== 'admin' && value !== 'user') {
                    throw new Error('Недопустиме значення для поля "role"')
                }
            },
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        unique: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        unique: false,
    },
})

module.exports = User
