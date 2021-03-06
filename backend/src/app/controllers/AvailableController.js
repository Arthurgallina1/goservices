import { startOfDay, endOfDay, setHours, setMinutes, setSeconds, format, isAfter } from 'date-fns'
import Appointment from '../models/Appointment'
import { Op } from 'sequelize'

class AvailableController {
    async index(req, res) {

        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error : 'Invalid date'})
        }

        const searchDate = Number(date);

        const appointments = await Appointment.findAll({
            where: {
                providerId: req.params.providerId,
                canceledAt: null,
                date: {
                    [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
                }

            }
        })

        const schedule = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00'
        ];

        const available = schedule.map(time => {
            const [ hour, minute ] = time.split(':');
            const value = setSeconds(setMinutes(setHours(searchDate, hour), minute),0);
            
            return {
                time,
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxx"),
                available: isAfter(value, new Date()) && 
                !appointments.find(appo => 
                    format(appo.date, 'HH:mm') === time),


            }
        })

        
        
        
        return res.json(available)
    }
}

export default new AvailableController();