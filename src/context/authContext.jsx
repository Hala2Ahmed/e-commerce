import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const authContext = createContext();

export default function AuthContextProvider({children}) {
  const [islogged, setIslogged] = useState(
    localStorage.getItem("token") != null
  );
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      verifyToken();
    }
  }, []);

  function verifyToken() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setIslogged(false);
      })
      .then(({data}) => {
        setUserId(data.decoded.id);
      });
  }

  return <authContext.Provider value={{ islogged, setIslogged, userId }}>
    {children}
  </authContext.Provider>;
}
