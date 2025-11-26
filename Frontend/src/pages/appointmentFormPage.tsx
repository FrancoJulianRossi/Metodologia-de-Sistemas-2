import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
    appointmentId?: string | number;
    initialData?: any;
    onSaved?: () => void;
    onCancel?: () => void;
};

export function AppointmentForm(props: Props) {
    const { appointmentId, initialData, onSaved, onCancel } = props;
    const navigate = useNavigate();
    const idFromParams = useParams().id;
    const id = appointmentId ?? idFromParams;

    const [form, setForm] = useState({
        patientName: "",
        doctorId: "",
        date: "",
        time: "",
        reason: "",
    });
    const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchJson(url: string) {
        const res = await fetch(url);
        const text = await res.text();
        const ct = (res.headers.get("content-type") || "").toLowerCase();
        if (!res.ok) throw new Error(`${url} returned ${res.status} — ${text.slice(0, 300)}`);
        if (ct.includes("application/json")) return JSON.parse(text);
        throw new Error(`Expected JSON from ${url} but got content-type="${ct}" — ${text.slice(0, 300)}`);
    }

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                // cargar doctores
                const data = await fetchJson("/api/doctors");
                if (!mounted) return;
                const normalized = Array.isArray(data)
                    ? data.map((d: any) => {
                          const id = String(d.id ?? d._id ?? d.id_medic ?? d.medic_id ?? "");
                          const name =
                              d.name ??
                              d.fullName ??
                              d.full_name ??
                              ((d.firstName || d.first_name) ? `${d.firstName ?? d.first_name} ${d.lastName ?? d.last_name}`.trim() : "") ??
                              id;
                          return { id, name };
                      })
                    : [];
                setDoctors(normalized);

                // si hay initialData usarlo, sino si viene id cargar appointment
                if (initialData) {
                    const a = initialData;
                    setForm({
                        patientName: a.patientName ?? a.patient_name ?? a.patient?.name ?? "",
                        doctorId: String(a.doctorId ?? a.id_medic ?? a.medic_id ?? a.doctor?._id ?? a.doctor ?? ""),
                        date: a.date ?? a.appointmentDate ?? a.appointment_date ?? "",
                        time: a.time ?? a.appointmentTime ?? a.appointment_time ?? "",
                        reason: a.reason ?? a.description ?? a.notes ?? "",
                    });
                } else if (id) {
                    const ap = await fetchJson(`/api/appointments/${id}`);
                    if (!mounted) return;
                    setForm({
                        patientName: ap.patientName ?? ap.patient_name ?? ap.patient?.name ?? "",
                        doctorId: String(ap.doctorId ?? ap.id_medic ?? ap.medic_id ?? ap.doctor?._id ?? ap.doctor ?? ""),
                        date: ap.date ?? ap.appointmentDate ?? ap.appointment_date ?? "",
                        time: ap.time ?? ap.appointmentTime ?? ap.appointment_time ?? "",
                        reason: ap.reason ?? ap.description ?? ap.notes ?? "",
                    });
                } else {
                    // si solo hay 1 doctor preseleccionar
                    if (normalized.length === 1) setForm((s) => ({ ...s, doctorId: normalized[0].id }));
                }
            } catch (err: any) {
                console.error("AppointmentForm load error:", err);
                setError(err?.message ?? String(err));
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, initialData]);

    function handleChange<K extends keyof typeof form>(k: K, v: typeof form[K]) {
        setForm((s) => ({ ...s, [k]: v }));
    }

    async function handleSubmit(e?: React.FormEvent) {
        e?.preventDefault();
        setError(null);
        if (!form.patientName.trim()) return setError("Nombre de paciente obligatorio");
        if (!form.doctorId) return setError("Seleccione doctor");
        if (!form.date) return setError("Seleccione fecha");
        if (!form.time) return setError("Seleccione hora");

        setSubmitting(true);
        try {
            const method = id ? "PUT" : "POST";
            const url = id ? `/api/appointments/${id}` : "/api/appointments";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientName: form.patientName,
                    doctorId: form.doctorId,
                    date: form.date,
                    time: form.time,
                    reason: form.reason,
                }),
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `HTTP ${res.status}`);
            }
            onSaved?.();
            if (!onSaved && !onCancel) navigate("/appointments");
        } catch (err: any) {
            console.error("Submit error:", err);
            setError(err?.message ?? String(err));
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div className="p-3 text-center">Cargando...</div>;

    return (
        <form onSubmit={handleSubmit} className="p-2">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-2">
                <label className="form-label">Nombre del paciente</label>
                <input className="form-control" value={form.patientName} onChange={(e) => handleChange("patientName", e.target.value)} />
            </div>

            <div className="mb-2">
                <label className="form-label">Doctor</label>
                <select className="form-select" value={form.doctorId} onChange={(e) => handleChange("doctorId", e.target.value)}>
                    <option value="">{doctors.length ? "Seleccione..." : "No hay doctores"}</option>
                    {doctors.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row">
                <div className="col mb-2">
                    <label className="form-label">Fecha</label>
                    <input type="date" className="form-control" value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
                </div>
                <div className="col mb-2">
                    <label className="form-label">Hora</label>
                    <input type="time" className="form-control" value={form.time} onChange={(e) => handleChange("time", e.target.value)} />
                </div>
            </div>

            <div className="mb-2">
                <label className="form-label">Motivo / Observaciones</label>
                <textarea className="form-control" value={form.reason} onChange={(e) => handleChange("reason", e.target.value)} rows={3} />
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Guardando..." : id ? "Actualizar" : "Crear"}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                        onCancel?.();
                        if (!onCancel && !onSaved) navigate(-1);
                    }}
                    disabled={submitting}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default function AppointmentFormPage() {
    // página standalone (route)
    return (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
            <h1 className="mb-3">{useParams().id ? "Editar cita" : "Nueva cita"}</h1>
            <AppointmentForm />
        </div>
    );
}