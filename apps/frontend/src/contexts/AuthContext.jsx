import { createContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/auth.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const isAuthenticated = useMemo(
    () => user !== undefined && user !== null,
    [user]
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const user = await authService.login(username, password);
      setUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(undefined);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      setLoading(true);
      const user = await authService.checkStatus();
      setUser(user);
    } catch (e) {
      console.error(e);
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, isAuthenticated, user, login, checkStatus, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
