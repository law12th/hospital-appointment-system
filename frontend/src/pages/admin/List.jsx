import { useEffect, useState } from "react";
import AddDoctor from "./AddDoctor";
import axios from "axios";
import DeleteDoctor from "./DeleteDoctor";

const List = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      await axios
        .get("http://localhost:5000/api/admin/manage")
        .then((res) => {
          setDoctors(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getDoctors();
  }, [doctors]);

  return (
    <div className="container">
      <h3 className="text-center">Manage Doctors</h3>
      <AddDoctor />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {doctors &&
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>
                  Dr {doctor.first_name} {doctor.last_name}
                </td>
                <td>{doctor.email}</td>
                <td>
                  <DeleteDoctor id={doctor.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
