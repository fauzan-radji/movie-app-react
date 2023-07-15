import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { useSessionStorage } from "usehooks-ts";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [token, setToken] = useSessionStorage("token", "");
  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
