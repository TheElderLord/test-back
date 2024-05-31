const jwt = require('jsonwebtoken');

const { secret } = require('../constants/constant');


const secretKey = secret;


const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.bearer;
    // console.log(req.path)
    // console.log(req.headers.bearer);
    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized: Token is missing' });
    // }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Token is valid, you can access decoded data in your routes
        req.user = decoded.username;
        req.id = decoded.userId;
        req.role = decoded.role;
        if(decoded.branch)
        console.log(decoded.branch)
        
        next();
    });
};

module.exports = checkTokenMiddleware