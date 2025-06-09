import React, { useEffect, useState } from "react";

import UserContext from "../contexts/UserContext";
import AuthServices from "../services/AuthServices";
import PATH from "../utils/path";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await AuthServices.getMe();
          console.log('response checkToken: ', response.data)

          if (response.data.success && isMounted) {
            setUser(response.data.user);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkToken();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (userData) => {
    try {
      setLoading(true);
      const res = await AuthServices.login(userData);
      setUser(res?.data?.user);
      
      localStorage.setItem("token", res?.data?.token);
      return res;
    } catch (error) {
      console.log("error login: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = PATH.login;
  };

  const values = { user, setUser, loading, login, logout };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
