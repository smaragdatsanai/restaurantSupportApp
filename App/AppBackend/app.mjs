import express from 'express'
const app = express()

import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}


import { engine } from 'express-handlebars'

//  import * as Data from './models/addRandomData.mjs'
// Data.addRandomData();

app.use(express.urlencoded({extended:false}))
app.engine(".hbs", engine({extname:".hbs"}))
app.set("view engine",".hbs")

//middleware & static files
app.use(express.static("public"))

//Diaxeiristes aithmatwn
import routes from './routes/routes.mjs'

app.use("/",routes)

export { app as app };