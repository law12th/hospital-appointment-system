import axios from "axios";
import { useEffect, useState } from "react";
import AddAppointment from "./AddAppointment";

const List = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      await axios
        .get("http://localhost:5000/api/patient/:patientID/")
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAppointments();
  }, [appointments]);

  return (
    <div className="container">
      <h3 className="text-center">Appointments</h3>
      <AddAppointment />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments &&
            appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td>
                  Dr {appointment.first_name} {appointment.last_name}
                </td>
                <td>{appointment.date}</td>
                <td>{appointment.approval}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
