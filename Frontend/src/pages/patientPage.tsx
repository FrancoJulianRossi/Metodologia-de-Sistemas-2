import { useEffect, useState } from "react";
import { Table, Spinner, Modal, Button } from "react-bootstrap";
import {
  getAllPatients,
  getPatientByDni,
  createPatient,
  updatePatient,
  deletePatient,
} from "../services/patientService";
import Form from "react-bootstrap/Form";
import NavBar from "../components/layouts/navBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../components/layouts/footer";

function PatientPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchDni, setSearchDni] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingPatient, setEditingPatient] = useState<any | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    loadAllPatients();
  }, []);

  const loadAllPatients = async () => {
    setLoading(true);
    try {
      const response = await getAllPatients();
      setPatients(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error(err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchDni(value);

    if (value.trim() === "") {
      // Input vacío → mostrar todos
      loadAllPatients();
      return;
    }

    setLoading(true);
    try {
      const result = await getPatientByDni(value);

      // getPatientByDni puede devolver null, objeto o array
      if (!result) {
        setPatients([]);
      } else if (Array.isArray(result)) {
        setPatients(result);
      } else {
        setPatients([result]);
      }
    } catch (err) {
      console.error(err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingPatient({});
    setShowModal(true);
  };

  const handleOpenEdit = (patient: any) => {
    // clone to avoid mutating list directly
    setEditingPatient({ ...patient });
    setShowModal(true);
  };

  const handleDelete = async (id: any) => {
    if (!confirm("¿Eliminar paciente?")) return;
    try {
      await deletePatient(String(id));
      await loadAllPatients();
    } catch (err) {
      console.error(err);
      // Mostrar mensaje amigable que venga del backend, si existe
      const message = (err as any)?.message ?? "Error eliminando paciente";
      alert(message);
    }
  };

  const handleSave = async () => {
    if (!editingPatient) return;
    setSaving(true);
    try {
      const payload: any = {
        dni: editingPatient.dni,
        name: editingPatient.name,
        lastname: editingPatient.lastname || editingPatient.lastName,
        email: editingPatient.email,
        password: editingPatient.password,
        phoneNumber: editingPatient.phoneNumber || editingPatient.phone,
      };

      if (editingPatient.id) {
        await updatePatient(String(editingPatient.id), payload);
      } else {
        await createPatient(payload);
      }

      setShowModal(false);
      setEditingPatient(null);
      await loadAllPatients();
    } catch (err) {
      console.error(err);
      alert("Error guardando paciente");
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
        <h1 className="mt-4">Patient Management</h1>

        <Row className="my-3">
          <Col md={6}>
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="text"
                placeholder="Buscar por DNI"
                value={searchDni}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => handleSearch(searchDni)}
              >
                Buscar
              </Button>
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={() => {
                  setSearchDni("");
                  loadAllPatients();
                }}
              >
                Limpiar
              </Button>
            </Form>
          </Col>

          <Col md={6} className="text-end">
            <Button onClick={handleOpenAdd}>Agregar paciente</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>DNI</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      <Spinner animation="border" />
                    </td>
                  </tr>
                ) : (
                  patients.map((patient, index) => (
                    <tr key={patient.id || index}>
                      <td>{index + 1}</td>
                      <td>{patient.name}</td>
                      <td>{patient.lastname || patient.lastName}</td>
                      <td>{patient.dni}</td>
                      <td>{patient.phoneNumber || patient.phone || "-"}</td>
                      <td>{patient.email}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleOpenEdit(patient)}
                        >
                          ✍️
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(patient.id)}
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
        <Footer />
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingPatient && editingPatient.id
                ? "Editar paciente"
                : "Agregar paciente"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="patient-form" onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="mb-2">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  value={editingPatient?.dni || ""}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      dni: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  value={editingPatient?.name || ""}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  value={
                    editingPatient?.lastname || editingPatient?.lastName || ""
                  }
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      lastname: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editingPatient?.email || ""}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  value={
                    editingPatient?.phoneNumber || editingPatient?.phone || ""
                  }
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={editingPatient?.password || ""}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      password: e.target.value,
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
    </>
  );
}

export default PatientPage;
