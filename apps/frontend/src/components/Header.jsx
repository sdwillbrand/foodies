import { Link, NavLink } from "react-router-dom";
import { FiCompass, FiLogIn, FiPlusCircle, FiLogOut } from "react-icons/fi";
import { BiFoodMenu } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Header = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <header className="sticky bg-primary w-full flex justify-between items-center h-20">
      <Link className="font-mono font-bold ml-10">FOODIES</Link>
      <div className="flex gap-5 p-5 mr-10">
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "underline underline-offset-2" : ""
            } flex items-center gap-1`
          }
          to="/"
        >
          <span>Discover</span>
          <FiCompass />
        </NavLink>
        {isAuthenticated && (
          <div className="flex gap-5 p-5 mr-10">
            <p>Hello, {user.nickname}</p>
            <NavLink
              end
              className={({ isActive }) =>
                `${
                  isActive ? "underline underline-offset-2" : ""
                } flex items-center gap-1`
              }
              to="/dashboard"
            >
              <span>My recipes</span>
              <BiFoodMenu />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "underline underline-offset-2" : ""
                } flex items-center gap-1`
              }
              to="/dashboard/new"
            >
              <span>New</span>
              <FiPlusCircle />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "underline underline-offset-2" : ""
                } flex items-center gap-1`
              }
              to="/login"
            >
              <span>Logout</span>
              <FiLogOut />
            </NavLink>
          </div>
        )}
        {!isAuthenticated && (
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "underline underline-offset-2" : ""
              } flex items-center gap-1`
            }
            to="/login"
          >
            <span>Login</span>
            <FiLogIn />
          </NavLink>
        )}
      </div>
    </header>
  );
};
