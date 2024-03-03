import express from 'express'
import { createComment, editComment, deleteComment, getComment } from './comments.controller.js'

import { verificarToken } from '../helpers/jwt.js'

const api = express.Router(); 

api.post('/create/:postId', verificarToken, createComment)
api.get('/getComment', verificarToken, getComment)
api.put('/edit/:commentId', verificarToken, editComment)
api.delete('/delete/:commentId', verificarToken, deleteComment)

export default api