import { useEffect, useState } from "react";
import axios from "axios";
import validate from "../../helpers/validation";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      await axios
        .post("http://localhost:5000/api/create-account", {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
        })
        .then(() => {
          setSuccess(true);
          setValues({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {success ? (
        <div className="container">
          <h2>Account Successfully created, please signin.</h2>
          <br />
          <Link to="/signin" className="btn btn-primary">
            Signin
          </Link>
        </div>
      ) : (
        <div className="container">
          <form onSubmit={onSubmit}>
            <h3 className="text-center">Signup</h3>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label>First Name</label>
                  <input
                    placeholder="first name"
                    value={values.firstName}
                    type="text"
                    name="firstName"
                    required
                    className="form-control"
                    onChange={onChange}
                  />
                </div>
                <p className="text-danger">{errors.firstName}</p>
                <div className="col">
                  <label>Last Name</label>
                  <input
                    placeholder="last name"
                    value={values.lastName}
                    type="text"
                    required
                    name="lastName"
                    className="form-control"
                    onChange={onChange}
                  />
                </div>
                <p className="text-danger">{errors.lastName}</p>
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                placeholder="input email"
                value={values.email}
                type="email"
                required
                name="email"
                className="form-control"
                onChange={onChange}
              />
            </div>
            <p className="text-danger">{errors.email}</p>
            <div className="form-group">
              <label>Password</label>
              <input
                placeholder="input password"
                value={values.password}
                required
                name="password"
                className="form-control"
                type="password"
                onChange={onChange}
              />
            </div>
            <p className="text-danger">{errors.password}</p>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                placeholder="confirm your password"
                value={values.confirmPassword}
                type="password"
                required
                name="confirmPassword"
                className="form-control"
                onChange={onChange}
              />
            </div>
            <p className="text-danger">{errors.confirmPassword}</p>
            <div className="col-md-12 text-center">
              <button className="btn btn-primary">Sign up</button>
              <div className="form-input-signin">
                Already have an account?{" "}
                <Link to="/signin">
                  <a href="#">Sign in!</a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
