'use strict'

import express from 'express'; 
import cors from 'cors'; 
import helmet from 'helmet'; 
import morgan from 'morgan'; 
import { dbConnection } from './mongo.js'; 
import authRoutes from '../src/auth/auth.routes.js'
import postRoutes from '../src/Publications/post.routes.js'

class Server { 
    constructor(){
        this.app = express(); 
        this.port = process.env.PORT; 
        this.authPath = '/api/auth/'; 
        this.postPath = '/api/post/';

        this.middelwares(); 
        this.conectarDB(); 
        this.routes(); 
    }
    async conectarDB(){
        await dbConnection(); 
    }
    middelwares(){
        this.app.use(express.urlencoded({extended: false})); 
        this.app.use(cors()); 
        this.app.use(express.json()); 
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }
    routes(){
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.postPath, postRoutes)
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on port', this.port);
        });
    }
}

export default Server; 