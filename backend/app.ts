import express from 'express'
import passport from 'passport'
import postRouter from './routes/postRouter'
import authRouter from './routes/authRouter'
import cors from 'cors'
import { default404Handler, default500Handler } from './middleware/errorHandlers'
import strategyJWT from './config/passport'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.urlencoded())
passport.use(strategyJWT)

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

app.use(default404Handler)
app.use(default500Handler)

app.listen(PORT || 3000, (err) => {
    if (err) throw err
    console.log(`Server running on port ${PORT}`)
})