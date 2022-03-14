import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <h1>Page not found</h1>
      <br />
      <p>The page you requested does not exist</p>
      <div>
        <button className="btn btn-primary" onClick={goBack}>
          <i className="bi bi-arrow-left">Go Back</i>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
