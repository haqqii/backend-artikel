const { Router } = require('express')
const m$blog = require('../modules/user.modules')
const response = require('../helpers/response')

const BlogController = Router()

/**
 * List User
 */
BlogController.get('/', async (req, res, next) => {
    const add = await m$blog.listUser()

    response.sendResponse(res, add)
})


/**
 * Add User
 * @param {string} username
 * @param {string} password
 */
BlogController.post('/', async (req, res, next) => {
    const add = await m$blog.addUser(req.body)

    response.sendResponse(res, add)
})

module.exports = BlogController