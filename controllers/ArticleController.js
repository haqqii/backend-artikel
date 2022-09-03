const { Router } = require('express')
const m$blog = require('../modules/article.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const BlogController = Router()

/**
 * List Artikel
 */
BlogController.get('/', async (req, res, next) => {
    const list = await m$blog.listArticle()

    response.sendResponse(res, list)
})

/**
 * Add Article
 * @param {string} judul_artikel
 * @param {string} deskripsi
 */
BlogController.post('/', userSession, async (req, res, next) => {
    const add = await m$blog.addArticle(req.body)

    response.sendResponse(res, add)
})

/**
 * Edit Article
 * @param {number} id
 * @param {string} judul_artikel
 * @param {string} deskripsi
 * @param {number} id_user
 */
BlogController.put('/', userSession, async (req, res, next) => {
    const add = await m$blog.editArticle(req.body)

    response.sendResponse(res, add)
})

/**
 * Delete Article
 * @param {number} id
 */
BlogController.delete('/:id', userSession, async (req, res, next) => {
    const add = await m$blog.deleteArticle(req.params.id)

    response.sendResponse(res, add)
})

module.exports = BlogController