const { Router } = require('express')
const m$blog = require('../modules/comment.modules')
const response = require('../helpers/response')

const BlogController = Router()

/**
 * List Comment
 */
BlogController.get('/', async (req, res, next) => {
    const list = await m$blog.listComment()

    response.sendResponse(res, list)
})

/**
 * Add Comment
 * @param {string} isi_komen
 * @param {number} id_user
 * @param {number} id_article
 */
BlogController.post('/', async (req, res, next) => {
    const add = await m$blog.addComment(req.body)

    response.sendResponse(res, add)
})

module.exports = BlogController