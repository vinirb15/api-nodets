import knex from '../../database';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const authConfig = require('../../config/auth.json');
import { Request, Response } from 'express'

export class AccountController {
    async index(req: Request, res: Response) {
        const results = await knex('account');
        return res.json(results);
    }

    async create(req: Request, res: Response, next: any) {
        try {
            const { name, login, password } = req.body;

            const access = await knex('account').select('login').where('login', login);

            if (access.length !== 0 && login === access[0].login) {
                return res.status(400).send({ error: 'User already exist' })
            };

            const id = crypto.randomBytes(4).toString();
            const alg = 'aes-256-ctr'
            const cipher = crypto.createCipher(alg, authConfig.secret)
            const crypted_pass = cipher.update(password, 'utf8', 'hex')

            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();

            await knex('account').insert({
                // console.log({
                id,
                name,
                login,
                password: crypted_pass,
                created_at,
                updated_at
            })

            const token = jwt.sign({ id: id }, authConfig.secret, {
                expiresIn: 1200,
            });

            return res.status(201).send({
                id,
                name,
                login,
                // password,
                token
            })

        } catch (error) {
            next(error)
        }
    }
}
export default new AccountController()