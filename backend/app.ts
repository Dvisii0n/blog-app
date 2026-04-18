import express from 'express'
import type { NextFunction, Request, Response } from 'express'

const app = express()
const PORT = 3000

app.use(express.urlencoded())

app.get("/", (req: Request, res: Response) => {
    res.json('Hello world')
})

app.use((req: Request, res: Response) => {
    res.status(404).send('404 Not Found')
})

app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
    console.error(err)
    res.status(500).send('500 Server Error')
})

app.listen(PORT || 3000, (err) => {
    if (err) throw err
    console.log(`Server running on port ${PORT}`)
})