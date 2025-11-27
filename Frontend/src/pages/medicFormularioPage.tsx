import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import NavBar from "../components/layouts/navBar";
import { medicService } from "../services/medicServices";
import { useNavigate } from 'react-router-dom';

function MedicFormularioPage() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [idSpecialty, setIdSpecialty] = useState<string | number>("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    const validateEmail = (value: string) => {
        return /\S+@\S+\.\S+/.test(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name.trim() || !lastname.trim() || !email.trim()) {
            setError("Completa nombre, apellido y correo.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Ingresa un correo válido.");
            return;
        }

        const id_specialty = idSpecialty === "" ? undefined : Number(idSpecialty);
        if (id_specialty === undefined || Number.isNaN(id_specialty)) {
            setError("Indica una Especialidad ID válida.");
            return;
        }

        setSaving(true);
        try {
            await medicService.create({
                name: name.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                id_specialty,
            });

            setSuccess("Médico creado correctamente.");
            setName("");
            setLastname("");
            setEmail("");
            setIdSpecialty("");
            // redirect back to list after a short delay so user sees success
            setTimeout(() => navigate('/'), 700);
        } catch (err: any) {
            console.error(err);
            const msg = err?.response?.data?.message || err.message || "Error creando médico";
            setError(msg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <NavBar />
            <Container className="mt-4" style={{ maxWidth: 720 }}>
                <h2>Agregar Médico</h2>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Especialidad ID</Form.Label>
                        <Form.Control
                            type="number"
                            value={idSpecialty as any}
                            onChange={(e) => {
                                const v = e.target.value;
                                setIdSpecialty(v === "" ? "" : parseInt(v, 10));
                            }}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={() => navigate('/')}>
                            Volver
                        </Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? "Guardando..." : "Crear Médico"}
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default MedicFormularioPage;
