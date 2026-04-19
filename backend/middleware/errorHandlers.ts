import type { NextFunction, Request, Response } from 'express'

async function default404Handler(req: Request, res: Response)  {
    res.status(404).send('404 Not Found')
}

async function default500Handler(err: Error, req: Request, res: Response, next:NextFunction) {
    console.error(err)
    res.status(500).send('500 Server Error')
}

export {default404Handler, default500Handler}