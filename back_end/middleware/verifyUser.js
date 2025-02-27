import jwt from 'jsonwebtoken'

const verifyUser = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({success: false, message: 'Access denied. No token provided.'});
    }

    const token = authHeader.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({success: false, message: 'Access denied. No token provided.'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = decoded;
    } catch (error) {
        return res.status(400).json({success: false, message: 'Invalid token'});
    }
    
    next()
    
}

export default verifyUser; 