const medicModel = require('../models/sqlite/medic.model');
const { Speciality } = require('../models/sqlite/entities/speciality.entity.js');

class MedicController {
    async createMedic(req: any, res: any) {
        try {
            const { name, lastname, email, id_specialty } = req.body;

            if (!name || !lastname || !email || !id_specialty) {
                return res.status(400).json({
                    message: 'Todos los campos son requeridos (name, lastname, email, id_specialty)'
                });
            }


            try {
                const existing = await medicModel.getByEmail(email);
                if (existing) {
                    return res.status(400).json({ message: 'Ya existe un médico con ese correo electrónico' });
                }
            } catch (e) {
                console.error('[MedicController] error checking existing email', e);
            }

            try {
                const spec = await Speciality.findByPk(id_specialty);
                if (!spec) {
                    return res.status(400).json({ message: 'Especialidad no encontrada' });
                }
            } catch (e) {
                console.error('[MedicController] error checking speciality', e);
                return res.status(500).json({ message: 'Error validando la especialidad', error: (e as any).message });
            }

            const newMedic = await medicModel.create({
                name,
                lastname,
                email,
                id_specialty
            });

            return res.status(201).json({
                message: 'Médico creado exitosamente',
                data: newMedic
            });
        } catch (error: any) {
            console.error('[MedicController][createMedic] error:', error);
            return res.status(500).json({
                message: 'Error al crear el médico',
                error: error.message
            });
        }
    }

    async getAllMedics(req: any, res: any) {
        try {
            const medics = await medicModel.getAll();

            return res.status(200).json({
                message: 'Médicos obtenidos exitosamente',
                data: medics
            });
        } catch (error: any) {
            return res.status(500).json({
                message: 'Error al obtener los médicos',
                error: error.message
            });
        }
    }

    async getMedicById(req: any, res: any) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: 'El ID es requerido'
                });
            }

            const medic = await medicModel.getById(parseInt(id));

            return res.status(200).json({
                message: 'Médico obtenido exitosamente',
                data: medic
            });
        } catch (error: any) {
            if (error.message === 'Médico no encontrado') {
                return res.status(404).json({
                    message: 'Médico no encontrado'
                });
            }

            return res.status(500).json({
                message: 'Error al obtener el médico',
                error: error.message
            });
        }
    }

    async updateMedic(req: any, res: any) {
        try {
            const { id } = req.params;
            const { name, lastname, email, id_specialty } = req.body;

            if (!id) {
                return res.status(400).json({
                    message: 'El ID es requerido'
                });
            }

            if (!name && !lastname && !email && !id_specialty) {
                return res.status(400).json({
                    message: 'Al menos un campo debe ser proporcionado para actualizar'
                });
            }

            const updateData: any = {};
            if (name) updateData.name = name;
            if (lastname) updateData.lastname = lastname;
            if (email) updateData.email = email;
            if (id_specialty) updateData.id_specialty = id_specialty;

            const updatedMedic = await medicModel.update(parseInt(id), updateData);

            return res.status(200).json({
                message: 'Médico actualizado exitosamente',
                data: updatedMedic
            });
        } catch (error: any) {
            if (error.message === 'Médico no encontrado') {
                return res.status(404).json({
                    message: 'Médico no encontrado'
                });
            }

            return res.status(500).json({
                message: 'Error al actualizar el médico',
                error: error.message
            });
        }
    }

    async deleteMedic(req: any, res: any) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: 'El ID es requerido'
                });
            }

            const deleted = await medicModel.delete(parseInt(id));

            if (deleted) {
                return res.status(200).json({
                    message: 'Médico eliminado exitosamente'
                });
            }
        } catch (error: any) {
            if (error.message === 'Médico no encontrado') {
                return res.status(404).json({
                    message: 'Médico no encontrado'
                });
            }

            return res.status(500).json({
                message: 'Error al eliminar el médico',
                error: error.message
            });
        }
    }

    async getMedicByEmail(req: any, res: any) {
        try {
            const { email } = req.query;

            if (!email) {
                return res.status(400).json({
                    message: 'El correo electrónico es requerido'
                });
            }

            const medic = await medicModel.getByEmail(email);

            if (!medic) {
                return res.status(404).json({
                    message: 'Médico no encontrado'
                });
            }

            return res.status(200).json({
                message: 'Médico obtenido exitosamente',
                data: medic
            });
        } catch (error: any) {
            return res.status(500).json({
                message: 'Error al obtener el médico por correo electrónico',
                error: error.message
            });
        }
    }

    async getMedicsBySpecialty(req: any, res: any) {
        try {
            const { specialtyId } = req.params;

            if (!specialtyId) {
                return res.status(400).json({
                    message: 'El ID de especialidad es requerido'
                });
            }

            const medics = await medicModel.getBySpecialty(parseInt(specialtyId));

            return res.status(200).json({
                message: 'Médicos obtenidos exitosamente',
                data: medics
            });
        } catch (error: any) {
            return res.status(500).json({
                message: 'Error al obtener médicos por especialidad',
                error: error.message
            });
        }
    }
}

module.exports = new MedicController();
