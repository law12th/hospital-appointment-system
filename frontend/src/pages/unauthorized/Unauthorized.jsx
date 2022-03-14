import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have permission to acess the requested page.</p>
      <div>
        <button className="btn btn-primary" onClick={goBack}>
          <i className="bi bi-arrow-left">Go Back</i>
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
