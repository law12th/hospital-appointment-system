import { Outlet } from "react-router-dom";

const Layout = () => {
  // outlet represents all of the children of the layout component
  // allows for more customization
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default Layout;
