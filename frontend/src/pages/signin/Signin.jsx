import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:5000/api/user/signin", {
        email,
        password,
      })
      .then((res) => {
        const userJwt = res.data.userJwt;
        const role_id = res.data.role_id;
        const first_name = res.data.first_name;

        setAuth({ email, userJwt, role_id });
        // replaces success page
        navigate(from, { replace: true });

        toast.success(`Welcome ${first_name}.`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        toast.error("invalid details", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="container">
      <h3 className="text-center">Signin</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="input email"
            required
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="input password"
            required
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-md-12 text-center">
          <button className="btn btn-primary">Signin</button>
          <div className="signout-link">
            Don't have an account?{" "}
            <Link to="/signup">
              <a href="#">Sign up!</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
