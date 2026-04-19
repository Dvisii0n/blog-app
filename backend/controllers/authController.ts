import type { Request, Response, NextFunction } from "express"
import 'dotenv/config'
import {prisma} from '../lib/prisma'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const JWT_EXPIRES_IN = '24h'

async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const {username, email, password} = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        await prisma.user.create({data: {username: username, email: email, password: passwordHash}})
        res.status(200).json('created user')
        return
    } catch (err) {
        next(err)
    }
}

async function login(  req: Request, res: Response, next: NextFunction) {
    try {
        const {username, password} = req.body
        const user = await prisma.user.findUnique({where: {username: username}})
        const SECRET = `${process.env.JWT_SECRET}`

        if (!user) {
            res.status(400).send('Invalid user or password')
            return
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            res.status(400).send('Invalid user or password')
            return
        }

        const token = jwt.sign({user:user}, SECRET, {expiresIn: JWT_EXPIRES_IN})
        res.json({token})
        return

    } catch (err) {
        next(err)
    }
}

export default {signUp, login}