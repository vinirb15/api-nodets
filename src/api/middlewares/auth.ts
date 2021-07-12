const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')

export default function (req: any, res: any, next: any) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' });

    jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });


        req.userId = decoded.id;
    });
    return next();
}
//Bearer (token initial)