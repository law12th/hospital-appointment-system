import { Link } from "react-router-dom";
import { ROLES } from "../../helpers/roles";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();

  const role = auth.role_id;

  const links = [
    !role && { label: "Sign up", href: "/signup" },
    !role && { label: "Sign in", href: "/signin" },
    role === ROLES.admin && { label: "Administrator", href: "/admin" },
    role === ROLES.doctor && { label: "Doctor", href: "/doctor" },
    role === ROLES.patient && { label: "Patient", href: "/patient" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link to={href}>
            <a className="nav-link text-light">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-dark bg-primary">
      <Link to="/">
        <a className="navbar-brand">HAS</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
