//Helper db yang dibuat
const mysql = require('../helpers/database')
//validation input
const Joi = require('joi')

class _article {
    //get artikel

    listArticle = async () => {
        try {
            const list = await mysql.query(
                'SELECT * FROM ref_artikel',
                []
            )

            return {
                status: true,
                data: list
            }

        } catch (error) {
            console.error('listArtikel module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }


    //create article
    addArticle = async (body) => {
        try {
            const schema = Joi.object({
                judul_artikel: Joi.string().required(),
                deskripsi: Joi.string().required(),
                id_user: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await mysql.query(
                'INSERT INTO ref_artikel (judul_artikel, deskripsi, id_user) VALUES (?, ?, ?)',
                [body.judul_artikel, body.deskripsi, body.id_user]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addArticle module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    //edit article
    editArticle = async (body) => {
        try {
            const schema = Joi.object({
                id: Joi.number().required(),
                judul_artikel: Joi.string().required(),
                deskripsi: Joi.string(),
                id_user: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const detail = await mysql.query(
                'SELECT * FROM ref_artikel WHERE (id = ? AND id_user = ?)',
                [body.id, body.id_user]
            )

            if (!detail.length > 0) {
                return {
                    status: false,
                    data: 404,
                    error: "Article not found"
                }
            }

            const edit = await mysql.query(
                'UPDATE ref_artikel SET judul_artikel = ?, deskripsi = ? WHERE id = ?',
                [body.judul_artikel, body.deskripsi, body.id]
            )

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editArticle module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    //delete article
    deleteArticle = async (id) => {
        try {
            const body = { id }
            const schema = Joi.object({
                id: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del = await mysql.query(
                'DELETE FROM ref_artikel WHERE id = ?',
                [id]
            )

            return {
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteArticle module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _article()