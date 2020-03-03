import jwt from 'jsonwebtoken'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import authConfig from '../../config/authConfig';


class SessionController {
    async store(req,res){
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }});
        // return res.json(user);

        if(!user){
            return res.status(401).json({ error: 'User not found!' });
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: 'Password doesnt not match!'});
        }

        if(!(await bcrypt.compare(password, user.password_hash))){
            return res.status(401).json({ error: 'Password doesnt not match!'});
        }
        const { id, name } = user;
        // console.log(user);
        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });

    }
}

export default new SessionController();