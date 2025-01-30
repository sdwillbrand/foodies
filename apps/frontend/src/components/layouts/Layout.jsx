import { Outlet } from "react-router-dom";
import { Header } from "../common/Header";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
