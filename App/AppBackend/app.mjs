import express from 'express'

import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}


import { engine } from 'express-handlebars'
import session from 'express-session'
import createMemoryStore from 'memorystore'

const MemoryStore = createMemoryStore(session)

const myAppSession = session({
    secret: process.env.SESSION_SECRET,
    store: new MemoryStore({ checkPeriod: 86400 * 1000 }),
    resave: false,
    saveUninitialized: false,
    name: "myApp-sid", 
    cookie: {
        maxAge: 1000 * 60 * 20 
    }
})

const app = express();

console.log(myAppSession)

app.use(myAppSession)


app.use(express.urlencoded({extended:false}))
app.engine(".hbs", engine({extname:".hbs"}))
app.set("view engine",".hbs")


//middleware & static files
app.use(express.static("public"))

// import * as Data from './models/addRandomData.mjs'
// Data.addRandomData();

//Diaxeiristes aithmatwn
import routes from './routes/routes.mjs'

app.use("/",routes)

app.use((req, res) => {
    res.redirect('/')
}
);


app.use((err, req, res, next) => {
    console.log("error occured: " + err.message)
    next(err)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.render("error", { message: err.message })
})

export { app as app };