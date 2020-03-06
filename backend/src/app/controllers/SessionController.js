import jwt from 'jsonwebtoken'
import User from '../models/User'
import File from '../models/File'
import bcrypt from 'bcryptjs'
import authConfig from '../../config/authConfig';


class SessionController {
    async store(req,res){
        const { email, password } = req.body;

        const user = await User.findOne({ 
            where: { email },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['path', 'url', 'id']
                }
            ]
        });
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
        const { id, name, avatar, provider } = user;
        // console.log(user);
        return res.json({
            user: {
                id,
                name,
                email,
                avatar,
                provider

            }, 
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });

    }
}

export default new SessionController();