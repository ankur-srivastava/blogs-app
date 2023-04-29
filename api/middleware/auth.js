import jwt from 'jsonwebtoken'
import config from 'config'

export const protect = (req, res, next) => {
    // get token from header
    const token = req.header('auth-token')
    // check if not token
    if (!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        })
    }
    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({
            msg: 'Token is not valid'
        })
    }
}
