import type { NextFunction, Request, Response } from 'express'
import {prisma} from '../lib/prisma'


async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const posts = await prisma.post.findMany()
        res.json(posts)
        return;

    } catch (err) {
        next(err)
    }
}

async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            res.status(401).send('Unauthorized')
            return
        }

        const userId = req.user.id
        const {title, body} = req.body
        await prisma.post.create({data: {title: title, body: body, authorId: userId}})
        res.status(201).json('post created')
        return
        
    } catch (err) {
        next(err)
        
    }
}

export default {getPosts, createPost}