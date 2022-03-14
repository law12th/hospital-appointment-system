import {
  Admin,
  Doctor,
  Patient,
  Unauthorized,
  NotFound,
  Home,
  Signin,
  Signup,
} from "./pages";
import { Notify, Layout, Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./helpers/RequireAuth";
import { ROLES } from "./helpers/roles";

function App() {
  return (
    <>
      <Navbar />
      <Notify />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.doctor]} />}>
            <Route path="doctor" element={<Doctor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.patient]} />}>
            <Route path="patient" element={<Patient />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
