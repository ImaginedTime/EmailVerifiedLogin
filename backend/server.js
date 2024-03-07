//importing modules
import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import { sequelize } from './Models/index.js'
import userRoutes from './Routes/userRoutes.js'

//configuring dotenv
dotenv.config()

//setting up your port
const PORT = process.env.PORT || 8080

//assigning the variable app to express
const app = express()

//middleware
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(cors())


//synchronizing the database and forcing it to false so we don't lose data
sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the email verification API")
});

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
