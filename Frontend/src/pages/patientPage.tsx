import { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import { getAllPatients } from "../services/patientService";
import Form from "react-bootstrap/Form";
import NavBar from "../components/layouts/navBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PatientPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllPatients().then((response) => {
      setPatients(response);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <Container>
        <h1 className="mt-4">Patient Management</h1>
        <Row>
          <Col>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>DNI</th>
                  <th>Address</th>
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
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{patient.name}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.dni}</td>
                      <td>{patient.address}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.email}</td>
                      <td>
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PatientPage;
