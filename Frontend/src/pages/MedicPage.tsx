/**
 * Página de gestión de médicos.
 *
 * Muestra la lista de médicos, permite búsqueda por especialidad,
 * edición en modal, creación (navegando al formulario) y eliminación.
 */
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Spinner, Modal, Button } from "react-bootstrap";
import { medicService } from "../services/medicServices";
import Form from "react-bootstrap/Form";
import NavBar from "../components/layouts/navBar";
import Footer from "../components/layouts/footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MedicPage() {
    const [medics, setMedics] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchSpecialty, setSearchSpecialty] = useState<string>("");

    const [showModal, setShowModal] = useState<boolean>(false);
    const [editingMedic, setEditingMedic] = useState<any | null>(null);
    const [saving, setSaving] = useState<boolean>(false);

    useEffect(() => {
        loadAllMedics();
    }, []);

    // Carga todos los médicos desde el backend y actualiza el estado
    const loadAllMedics = async () => {
        setLoading(true);
        try {
            const data = await medicService.getAll();
            setMedics(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setMedics([]);
        } finally {
            setLoading(false);
        }
    };

    // Maneja búsqueda por ID de especialidad
    const handleSearch = async (value: string) => {
        setSearchSpecialty(value);

        if (value.trim() === "") {
            // Input vacío → mostrar todos
            loadAllMedics();
            return;
        }

        setLoading(true);
        try {
            const result = await medicService.getBySpecialty(parseInt(value));
            // medicService now returns data directly (array or single item)
            if (!result) {
                setMedics([]);
            } else if (Array.isArray(result)) {
                setMedics(result);
            } else {
                setMedics([result]);
            }
        } catch (err) {
            console.error("Error searching by specialty:", err);
            setMedics([]);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    // Navega al formulario de creación de médico
    const handleOpenAdd = () => {
        navigate('/medics/new');
    };

    // Abre el modal para editar un médico (copia los datos para no mutar la lista)
    const handleOpenEdit = (medic: any) => {
        setEditingMedic({ ...medic });
        setShowModal(true);
    };

    // Intenta eliminar un médico y muestra mensajes amigables en caso de error
    const handleDelete = async (id: any) => {
        if (!confirm("¿Eliminar médico?")) return;
        try {
            await medicService.delete(id);
            await loadAllMedics();
        } catch (err: any) {
            console.error(err);
            const errorMessage = err?.response?.data?.message || "Error eliminando médico";
            alert(errorMessage);
        }
    };

    // Guarda cambios del médico (edición o creación desde modal)
    const handleSave = async () => {
        if (!editingMedic) return;
        setSaving(true);
        try {
            const payload: any = {
                name: editingMedic.name,
                lastname: editingMedic.lastname,
                email: editingMedic.email,
                id_specialty: editingMedic.id_specialty,
            };

            if (editingMedic.id) {
                await medicService.update(editingMedic.id, payload);
            } else {
                await medicService.create(payload);
            }

            setShowModal(false);
            setEditingMedic(null);
            await loadAllMedics();
        } catch (err) {
            console.error(err);
            alert("Error guardando médico");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div>
                <NavBar />
            </div>
            <Container>
                <h1 className="mt-4">Gestion Medicos</h1>

                <Row className="my-3">
                    <Col md={6}>
                        <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                            <Form.Control
                                type="number"
                                placeholder="Buscar por Especialidad ID"
                                value={searchSpecialty}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <Button
                                variant="secondary"
                                className="ms-2"
                                onClick={() => handleSearch(searchSpecialty)}
                            >
                                Buscar
                            </Button>
                            <Button
                                variant="outline-secondary"
                                className="ms-2"
                                onClick={() => {
                                    setSearchSpecialty("");
                                    loadAllMedics();
                                }}
                            >
                                Limpiar
                            </Button>
                        </Form>
                    </Col>

                    <Col md={6} className="text-end">
                        <Button onClick={handleOpenAdd}>Agregar médico</Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Especialidad</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center">
                                            <Spinner animation="border" />
                                        </td>
                                    </tr>
                                ) : (
                                    medics.map((medic, index) => (
                                        <tr key={medic.id || index}>
                                            <td>{index + 1}</td>
                                            <td>{medic.name}</td>
                                            <td>{medic.lastname}</td>
                                            <td>{medic.email}</td>
                                            <td>{medic.id_specialty}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary me-2"
                                                    onClick={() => handleOpenEdit(medic)}
                                                >
                                                    ✍️
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(medic.id)}
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editingMedic && editingMedic.id
                                ? "Editar médico"
                                : "Agregar médico"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="medic-form" onSubmit={(e) => e.preventDefault()}>
                            <Form.Group className="mb-2">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    value={editingMedic?.name || ""}
                                    onChange={(e) =>
                                        setEditingMedic({
                                            ...editingMedic,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    value={editingMedic?.lastname || ""}
                                    onChange={(e) =>
                                        setEditingMedic({
                                            ...editingMedic,
                                            lastname: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={editingMedic?.email || ""}
                                    onChange={(e) =>
                                        setEditingMedic({
                                            ...editingMedic,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Especialidad ID</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={editingMedic?.id_specialty || ""}
                                    onChange={(e) =>
                                        setEditingMedic({
                                            ...editingMedic,
                                            id_specialty: parseInt(e.target.value),
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" disabled={saving} onClick={handleSave}>
                            {saving ? "Guardando..." : "Guardar"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <Footer />
        </>
    );
}

export default MedicPage;
