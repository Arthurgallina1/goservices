import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '../../config/authConfig'

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ error: 'token not provided' })
    }

    const [ , token ] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        // jwt.verify(token, authConfig.secret, function(err, decoded) {
        //     if (err) {
        //         return res.json({ success: false, message: 'Failed to authenticate token.' });
        //     } else {
        //         // if everything is good, save to request for use in other routes
        //         req.decoded = decoded;
        //         console.log(decoded);
        //     }
        // });

        req.userId = decoded.id;


        // console.log(decoded);
        

        return next();

    } catch (err) {
        return res.status(401).json({error: 'TOken invalid' })
    }

    
}