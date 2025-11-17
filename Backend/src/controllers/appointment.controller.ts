const appointmentModel = require('../models/sqlite/appointment.model');

class AppointmentController {
    // CRUD OPERATIONS FOR APPOINTMENT
    async create(req: any, res: any) {
        try {
            const { date, time, status, id_patient, id_medic } = req.body;  
            if (!date || !time || !status || !id_patient || !id_medic) {
                return res.status(400).json({
                    error: "Falta completar los campos: date, time, status, id_patient, id_medic"
                });
            }
            const newAppointment = await appointmentModel.create({
                date,
                time,
                status,
                id_patient,
                id_medic
            });
            res.status(201).json(newAppointment);
        } catch (error: any) {
            res.status(500).json({ error: "Error creando el appointment: " + error.message });
        }
    }
    async getAll(req: any, res: any) {
        try {
            const appointments = await appointmentModel.getAll();
            res.status(200).json(appointments);
        } catch (error: any) {
            res.status(500).json({ error: "Error obteniendo los appointments: " + error.message });
        }
    }

    async getById(req: any, res: any) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Falta completar el campo: id" });
            }
            const appointment = await appointmentModel.getById(Number(id));
            res.status(200).json(appointment);
        } catch (error: any) {
            res.status(500).json({ error: "Error obteniendo el appointment: " + error.message });
        }
    }

    async update(req: any, res: any) {
        try {
            const { id } = req.params;
            const { date, time, status, id_patient, id_medic } = req.body;
            if (!id) {
                return res.status(400).json({ error: "Falta completar el campo: id" });
            }
            const updatedAppointment = await appointmentModel.update(Number(id), {
                date,
                time,
                status, 
                id_patient,
                id_medic
            });
            res.status(200).json(updatedAppointment);
        } catch (error: any) {
            res.status(500).json({ error: "Error actualizando el appointment: " + error.message });
        }
    }
    async delete(req: any, res: any) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Falta completar el campo: id" });
            }
            await appointmentModel.delete(Number(id));
            res.status(200).json({ message: "Appointment eliminado exitosamente" });
        }
        catch (error: any) {
            res.status(500).json({ error: "Error eliminando el appointment: " + error.message });
        }
    }
}
export default new AppointmentController();