import { useState } from "react";
import { CustomModal } from "../../components";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const onOpen = () => {
    setIsShowing(true);
  };

  const onClose = () => {
    setIsShowing(false);
    resetForm();
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:5000/api/admin/manage", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
      .then(() => {
        toast.success("Added a doctor", {
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
          title="Add Doctor"
          onClose={onClose}
          isShowing={isShowing}
          setIsShowing={setIsShowing}
        >
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="input email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="text"
                placeholder="input password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </CustomModal>
      }
    </span>
  );
};

export default AddDoctor;
