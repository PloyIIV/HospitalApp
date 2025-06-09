import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Token has invalid format'
        })
    }
    jwt.verify(token.split(' ')[1], process.env.SUPABASE_JWT_KEY, (err, payload) => {
        if(err) {
            return res.status(401).json({
                message: 'Invalid Token'
            })
        }
        req.user = payload
        next()
    })
}