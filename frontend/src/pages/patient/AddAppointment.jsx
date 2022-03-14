import { useState, useEffect } from "react";
import { CustomModal } from "../../components";
import axios from "axios";
import { toast } from "react-toastify";

const AddAppointment = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(new Date());

  const resetForm = () => {
    setDoctors("");
    setDate(new Date());
  };

  const onOpen = () => {
    setIsShowing(true);
  };

  const onClose = () => {
    setIsShowing(false);
    resetForm();
  };

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
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost/api/patient/:patientID/", {
        doctor_id: doctorId,
        date,
      })
      .then(() => {
        toast.success("Created an appointment", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        resetForm();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <span>
      <button className="btn btn-primary btn-lg" onClick={onOpen}>
        <i className="bi bi-plus-circle" />
      </button>
      {
        <CustomModal
          title="Create Appointment"
          onClose={onClose}
          isShowing={isShowing}
          setIsShowing={setIsShowing}
        >
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <select placeholder="name" className="form-control">
                {doctors &&
                  doctors.map((doctor) => (
                    <option
                      onChange={() => setDoctorId(doctor.id)}
                      value={doctor.id}
                    >
                      Dr {doctor.first_name} {doctor.last_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                className="form-control"
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </CustomModal>
      }
    </span>
  );
};

export default AddAppointment;
