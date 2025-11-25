import patientService from "../services/patientService";
import { useState, useEffect } from "react";

function PatientFormularioPage() {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await patientService.getAllPatients();
      setPatients(data || []);
    };
    fetchPatients();
  });

  return (
    <div>
      <h1>Patient Formulario Page</h1>
    </div>
  );
}
