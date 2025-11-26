import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Spinner, Modal, Button } from "react-bootstrap";
import { getAllAppointments, deleteAppointment, getAppointmentById } from "../services/appointmentService";
import Form from "react-bootstrap/Form";
import NavBar from "../components/layouts/navBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppointmentForm, { AppointmentForm as AppointmentFormComponent } from "./appointmentFormPage";

function AppointmentPage() {
    const navigate = useNavigate();
    const [allAppointments, setAllAppointments] = useState<any[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [filterType, setFilterType] = useState<"patient" | "medic">("patient");
    const [filterId, setFilterId] = useState<string>("");

    // modal state
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<any | null>(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setLoading(true);
        try {
            const response = await getAllAppointments();
            setAllAppointments(response || []);
            setAppointments(response || []);
        } catch (err) {
            console.error(err);
            setAllAppointments([]);
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    }

    const handleFilter = async () => {
        if (!filterId.trim()) {
            setAppointments(allAppointments);
            return;
        }

        const idNum = Number(filterId);
        if (Number.isNaN(idNum)) {
            alert("El ID debe ser un número");
            return;
        }

        const filtered = allAppointments.filter((a) =>
            filterType === "patient" ? Number(a.id_patient) === idNum : Number(a.id_medic) === idNum
        );
        setAppointments(filtered);
    };

    const handleClearFilter = () => {
        setFilterId("");
        setAppointments(allAppointments);
    };

    const handleDelete = async (appointmentId: any) => {
        if (!confirm("Confirmar eliminación del turno?")) return;
        try {
            await deleteAppointment(appointmentId);
            setAppointments((prev) => prev.filter((a) => a.id !== appointmentId));
            setAllAppointments((prev) => prev.filter((a) => a.id !== appointmentId));
        } catch (err: any) {
            console.error(err);
            alert("Error borrando appointment: " + (err?.message || err));
        }
    };

    const openCreate = () => {
        setInitialData(null);
        setEditingId(null);
        setShowModal(true);
    };

    const openEdit = async (id: any) => {
        setModalLoading(true);
        setShowModal(true);
        setEditingId(String(id));
        try {
            // opcional: precargar datos para el form
            const ap = await getAppointmentById(id);
            setInitialData(ap);
        } catch (err) {
            console.error("Error cargando appointment para editar:", err);
            setInitialData(null);
        } finally {
            setModalLoading(false);
        }
    };

    const handleSaved = async () => {
        setShowModal(false);
        setEditingId(null);
        setInitialData(null);
        await load();
    };

    const handleCancelModal = () => {
        setShowModal(false);
        setEditingId(null);
        setInitialData(null);
    };

    return (
        <>
            <div>
                <NavBar />
            </div>
            <Container>
                <h1 className="mt-4">Appointment Management</h1>

                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-success" onClick={openCreate}>
                        Nuevo
                    </button>
                </div>

                <Row className="mt-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Filtrar por</Form.Label>
                            <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value as any)}>
                                <option value="patient">Patient ID</option>
                                <option value="medic">Medic ID</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" value={filterId} onChange={(e) => setFilterId(e.target.value)} placeholder="Ingrese ID" />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="d-flex align-items-end">
                        <button className="btn btn-primary me-2" onClick={handleFilter}>
                            Filtrar
                        </button>
                        <button className="btn btn-secondary" onClick={handleClearFilter}>
                            Limpiar
                        </button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Patient ID</th>
                                    <th>Medic ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="text-center">
                                            <Spinner animation="border" />
                                        </td>
                                    </tr>
                                ) : appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center">
                                            No hay turnos para mostrar
                                        </td>
                                    </tr>
                                ) : (
                                    appointments.map((appointment, index) => (
                                        <tr key={appointment.id ?? index}>
                                            <td>{index + 1}</td>
                                            <td>{appointment.date}</td>
                                            <td>{appointment.time}</td>
                                            <td>{appointment.status}</td>
                                            <td>{appointment.id_patient}</td>
                                            <td>{appointment.id_medic}</td>
                                            <td>
                                                <button className="btn btn-primary me-2" onClick={() => openEdit(appointment.id)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(appointment.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCancelModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? "Editar cita" : "Nueva cita"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalLoading ? (
                        <div className="text-center p-3">
                            <Spinner animation="border" />
                        </div>
                    ) : (
                        <AppointmentFormComponent appointmentId={editingId ?? undefined} initialData={initialData ?? undefined} onSaved={handleSaved} onCancel={handleCancelModal} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AppointmentPage;