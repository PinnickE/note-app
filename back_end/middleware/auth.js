// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//     const authHeader = req.header('Authorization');
//     if (!authHeader) {
//         return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
//     }

//     const token = authHeader; // Allow user to type the Bearer prefix themselves
//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_TOKEN);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).json({ success: false, message: 'Invalid token.' });
//     }
// };

// export default auth;


import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log("authHeader", authHeader);
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        console.log("decoded", decoded);
        console.log("req.user", req.user);
        req.user = decoded;
        console.log("req.user", req.user);
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid token.' });
    }
};

export default auth;
