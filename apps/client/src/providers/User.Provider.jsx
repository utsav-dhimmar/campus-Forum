import { useState } from "react";
import { userContext } from "../context/User.context";

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const logout = () => {
    setData(null);
    localStorage.removeItem("userData");
  };

  const login = (data) => {
    setData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  return (
    <userContext.Provider value={{ data, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
