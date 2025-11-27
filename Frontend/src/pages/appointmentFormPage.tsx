import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPatients } from "../services/patientService";
import { medicService } from "../services/medicServices";

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
    patientId: "",
    medicId: "",
    date: "",
    time: "",
    reason: "",
    status: "pending", // agregado status por defecto
  });
  const [patients, setPatients] = useState<{ id: string; name: string }[]>([]);
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchJson(url: string) {
    const res = await fetch(url);
    const text = await res.text();
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (!res.ok)
      throw new Error(`${url} returned ${res.status} — ${text.slice(0, 300)}`);
    if (ct.includes("application/json")) return JSON.parse(text);
    throw new Error(
      `Expected JSON from ${url} but got content-type="${ct}" — ${text.slice(
        0,
        300
      )}`
    );
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);

        // cargar pacientes desde service
        try {
          const p = await getAllPatients();
          const normalizedPatients = Array.isArray(p)
            ? p.map((pt: any) => ({
                id: String(
                  pt.id ?? pt._id ?? pt.id_patient ?? pt.patient_id ?? ""
                ),
                name:
                  pt.name ??
                  pt.fullName ??
                  pt.firstName ??
                  `${pt.name ?? ""} ${pt.lastname ?? ""}`.trim() ??
                  String(pt.id ?? pt._id ?? ""),
              }))
            : [];
          if (mounted) setPatients(normalizedPatients);
        } catch (err) {
          console.error("Error cargando pacientes:", err);
          if (mounted) setPatients([]);
        }

        // cargar médicos desde medicService (acepta varias formas de respuesta)
        try {
          const res = await medicService.getAll();

          // normalizar: medicService puede devolver directamente un array, un axios response
          // con `data` o un objeto { message, data } donde data es la lista.
          let dataArr: any[] = [];
          if (Array.isArray(res)) dataArr = res;
          else if (res && Array.isArray((res as any).data))
            dataArr = (res as any).data;
          else if (
            res &&
            (res as any).data &&
            Array.isArray((res as any).data.data)
          )
            dataArr = (res as any).data.data;

          const normalized = dataArr.map((d: any) => {
            const id = String(d.id ?? d._id ?? d.id_medic ?? d.medic_id ?? "");
            const name =
              d.name ??
              d.fullName ??
              d.full_name ??
              (d.firstName || d.first_name
                ? `${d.firstName ?? d.first_name} ${
                    d.lastName ?? d.last_name
                  }`.trim()
                : "") ??
              id;
            return { id, name };
          });

          if (mounted) setDoctors(normalized);
        } catch (err) {
          console.error("Error cargando médicos:", err);
          if (mounted) setDoctors([]);
        }

        // si hay initialData usarlo, sino si viene id cargar appointment
        if (initialData) {
          const a = initialData;
          setForm({
            patientId: String(
              a.patientId ?? a.id_patient ?? a.patient?._id ?? a.patient ?? ""
            ),
            medicId: String(
              a.medicId ?? a.id_medic ?? a.doctor?._id ?? a.doctor ?? ""
            ),
            date: a.date ?? a.appointmentDate ?? a.appointment_date ?? "",
            time: a.time ?? a.appointmentTime ?? a.appointment_time ?? "",
            reason: a.reason ?? a.description ?? a.notes ?? "",
            status: String(a.status ?? a.state ?? "pending"),
          });
        } else if (id) {
          const ap = await fetchJson(`/api/appointments/${id}`);
          if (!mounted) return;
          setForm({
            patientId: String(
              ap.patientId ??
                ap.id_patient ??
                ap.patient?._id ??
                ap.patient ??
                ""
            ),
            medicId: String(
              ap.medicId ?? ap.id_medic ?? ap.doctor?._id ?? ap.doctor ?? ""
            ),
            date: ap.date ?? ap.appointmentDate ?? ap.appointment_date ?? "",
            time: ap.time ?? ap.appointmentTime ?? ap.appointment_time ?? "",
            reason: ap.reason ?? ap.description ?? ap.notes ?? "",
            status: String(ap.status ?? ap.state ?? "pending"),
          });
        } else {
          // si solo hay 1 doctor/paciente preseleccionar
          if (doctors.length === 1)
            setForm((s) => ({ ...s, medicId: doctors[0].id }));
          if (patients.length === 1)
            setForm((s) => ({ ...s, patientId: patients[0].id }));
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

  function handleChange<K extends keyof typeof form>(
    k: K,
    v: (typeof form)[K]
  ) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!form.patientId) return setError("Seleccione paciente");
    if (!form.medicId) return setError("Seleccione médico");
    if (!form.date) return setError("Seleccione fecha");
    if (!form.time) return setError("Seleccione hora");

    setSubmitting(true);
    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/appointments/${id}` : "/api/appointments";
      const payload: any = {
        id_patient: form.patientId,
        id_medic: form.medicId,
        date: form.date,
        time: form.time,
        reason: form.reason,
      };
      // enviar status si existe (necesario para edición)
      if (form.status) payload.status = form.status;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        <label className="form-label">Paciente</label>
        <select
          className="form-select"
          value={form.patientId}
          onChange={(e) => handleChange("patientId", e.target.value)}
        >
          <option value="">
            {patients.length ? "Seleccione paciente..." : "No hay pacientes"}
          </option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Doctor</label>
        <select
          className="form-select"
          value={form.medicId}
          onChange={(e) => handleChange("medicId", e.target.value)}
        >
          <option value="">
            {doctors.length ? "Seleccione doctor..." : "No hay doctores"}
          </option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar selector de estado solo en modo edición (cuando hay id) */}
      {id && (
        <div className="mb-2">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )}

      <div className="row">
        <div className="col mb-2">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>
        <div className="col mb-2">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            value={form.time}
            onChange={(e) => handleChange("time", e.target.value)}
          />
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Motivo / Observaciones</label>
        <textarea
          className="form-control"
          value={form.reason}
          onChange={(e) => handleChange("reason", e.target.value)}
          rows={3}
        />
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
