import express from 'express'
import { createPost, editPost, deletePost } from './post.controller.js'

const api = express.Router(); 
api.post ('/createPost', createPost)
api.put('/editPost/:id', editPost)
api.delete('/deletePost/:id', deletePost)
export default api