import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Header } from "../Header";

export const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <>
      <Header />
      <Outlet />
    </>
  );
};
