//Helper db yang dibuat
const mysql = require('../helpers/database')
//validation input
const Joi = require('joi')

class _comment {
    //get comment

    listComment = async () => {
        try {
            const list = await mysql.query(
                'SELECT * FROM ref_komen',
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

    //create comment
    addComment = async (body) => {
        try {
            const schema = Joi.object({
                isi_komen: Joi.string().required(),
                id_user: Joi.number().required(),
                id_article: Joi.number().required()
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
                'INSERT INTO ref_komen (isi_komen, id_user, id_article) VALUES (?, ?, ?)',
                [body.isi_komen, body.id_user, body.id_article]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addComment module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _comment()