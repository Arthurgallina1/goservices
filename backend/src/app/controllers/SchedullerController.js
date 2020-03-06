import { startOfDay, endOfDay, parseISO } from 'date-fns'
import { Op } from 'sequelize'
import Appointment from '../models/Appointment'
import User from '../models/User'

class SchedullerController {
    async index(req,res) {
        const checkUserProvider = await User.findOne({
            where: {
                id: req.userId,
                provider: true
            }
        })

        if(!checkUserProvider){
            return res.status(401).json({error: 'user is not a provider'})
        }
        const { date } = req.query;
        const parsedDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                providerId: 10,
                canceledAt: null,
                date: {
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate)]

                },
            },
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['name']
                }
            ],
            order: ['date']
        })

        return res.json(appointments)

    }
}

export default new SchedullerController();