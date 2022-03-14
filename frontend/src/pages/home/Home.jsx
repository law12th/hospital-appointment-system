import { Link } from "react-router-dom";
import { ROLES } from "../../helpers/roles";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();

  const role = auth.role_id;

  const links = [
    !role && { label: "Sign in", href: "/signin" },
    role === ROLES.admin && { label: "Manage doctors", href: "/admin" },
    role === ROLES.doctor && { label: "View Appointments", href: "/doctor" },
    role === ROLES.patient && {
      label: "Manage Appointments",
      href: "/patient",
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <Link key={href} to={href} className="btn btn-primary">
          {label}
        </Link>
      );
    });

  return (
    <div className="container">
      <h1>Hospital Appointment System</h1>
      {links}
    </div>
  );
};

export default Home;
