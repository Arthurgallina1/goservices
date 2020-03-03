import Appointment from '../models/Appointment'
import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import User from '../models/User';
import Notification from '../schemas/Notification';

class AppointmentController {


    async index(req, res) {
        const { page = 1 } = req.query;
        

        const appointments = await Appointment.findAll({
            where: {
                userId: req.userId, canceledAt: null
            },
            order: ['date'],
            limit: 20,
            offset: (page-1) * 20,
            include: [
                {
                    model: User,
                    as: 'provider'
                }
            ]
        })

        return res.json({appointments})
    }


    async store(req, res) {
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            providerId: Yup.number().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'validation fails' }); 
        }

        const { providerId, date } = req.body;
        /**
         * Check if provider_id is a provider
         */
        const isProvider = await User.findOne({
            where: {
                id: providerId, provider: true
            }
        })
        if(!isProvider){
            return res.status(401).json({ error: 'You can only create appointments with provideres' });
        }

        /**
         * Verify if not past date 
         */

        const hourStart = startOfHour(parseISO(date));

        if(isBefore(hourStart, new Date())){
            return res.status(400).json({
                error: 'Past dates are not permitted'
            })
        }

        /**
         * Check date availabity
         */
       const checkAvailability = await Appointment.findOne({
           where: {
               providerId,
               canceledAt: null,
               date: hourStart
           }
       })

    //    if (checkAvailability){
    //     return res.status(400).json({
    //         error: 'Appointment date is unaveilable'
    //     })
    //    }

        const appointment = await Appointment.create({
            userId: req.userId,
            providerId,
            date
        });

        /**
         * Notify appointment provider
         */
        const user = await User.findByPk(req.userId);
        const formattedDate = format(hourStart, "'dia' dd 'de' MMMM', at' H:mm'h")

        await Notification.create({
            content: `New appointment from ${user.name} at ${formattedDate}`,
            user: providerId

        })
        return res.json(appointment);
    }

    async delete(req,res){
        const appointment = await Appointment.findByPk(req.params.id);
        if (appointment.userId !== req.userId){
            return res.status(401).json({
                error: 'YOu cant cancel this appointment'
            })
        }

        const dateSub = subHours(appointment.date, 2);

        if(isBefore(dateSub, new Date())) {
            return res.status(401).json({
                error: 'You can only cancel appointments 2 hours in advance'
            })
        }

        appointment.canceledAt = new Date();

        await appointment.save();

        return res.json(appointment)    
    }

}

export default new AppointmentController();