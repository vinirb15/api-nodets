import express from 'express';
import Account from './api/controllers/AccountController';
export default express
//Account
.Router()
.get('/', Account.index)
.post('/', Account.create)