const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET); 
        const user = await User.findById(decoded.userId);
        console.log(user)

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user; 
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;

