import 'dotenv/config'
// const dotenv = require('dotenv'); 
// dotenv.config(); 
import express from 'express'
import { engine } from 'express-handlebars'
import {router} from './routes.mjs'

import session from 'express-session'
import createMemoryStore from 'memorystore'


const app = express()
const PORT = process.env.PORT || 3000


app.use(express.urlencoded({extended:false}))
app.engine(".hbs", engine({extname:".hbs"}))
app.set("view engine",".hbs")

//middleware & static files
app.use(express.static("public"))

//Diaxeiristes aithmatwn
app.use("/",router)


app.listen(PORT, console.log(`Server started on port ${PORT}`))