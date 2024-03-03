import express from 'express'
import { createPost, editPost, deletePost, getPost  } from './post.controller.js'
import { verificarToken } from '../helpers/jwt.js'

const api = express.Router(); 
api.post ('/createPost', verificarToken, createPost)
api.put('/editPost/:id',  verificarToken, editPost)
api.delete('/deletePost/:id', verificarToken, deletePost)
api.get('/getPost/', verificarToken, getPost )
export default api