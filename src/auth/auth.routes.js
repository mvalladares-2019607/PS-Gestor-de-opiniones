import express from 'express'
import { editProfile, login, register } from './auth.controller.js'

const api = express.Router();
api.post('/register', register)
api.post('/login', login)
api.put('/editProfile/:id', editProfile)
export default api