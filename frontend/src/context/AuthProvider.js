import { createContext, useState } from "react";

// we want global authentication authentication context
const AuthContext = createContext({});

const AuthProvider = (props) => {
  // we want to provide auth and setAuth values
  const [auth, setAuth] = useState({});

  // wrap components with Provider to use global values
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
