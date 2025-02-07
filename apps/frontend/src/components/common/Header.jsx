import { Link, NavLink, Form } from "react-router-dom";
import { FiCompass, FiLogIn, FiUser } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Dropdown } from "./Dropdown";
import { FiPlusCircle, FiLogOut } from "react-icons/fi";
import { Searchbar } from "../Searchbar";
import classNames from "classnames";
import logo from "../../assets/index.png";

export const Header = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <header className="fixed top-0 bg-primary w-full flex justify-between items-center h-20 z-50">
      <Link className="font-mono font-bold ml-10" to="/">
        <img src={logo} width={80} />
      </Link>
      <Searchbar />
      <div className="flex gap-5 p-5 md:mr-10">
        <NavLink
          className={({ isActive }) =>
            classNames("flex items-center gap-1", {
              "text-blue-600": isActive,
            })
          }
          to="/"
        >
          <FiCompass size={30} strokeWidth={1} />
        </NavLink>
        {isAuthenticated && (
          <Dropdown
            header={
              <p className="p-1 cursor-pointer flex items-center gap-1 hover:scale-105">
                <FiUser className="rounded-full border m-1 p-1 w-7 h-7 border-black" />
                {user.nickname}
              </p>
            }
          >
            <div className="flex flex-col gap-4 p-5 bg-white rounded-md text-sm drop-shadow-lg w-32">
              <NavLink
                end
                className={({ isActive }) =>
                  `${
                    isActive ? "underline underline-offset-2" : ""
                  } flex items-center gap-1`
                }
                to={`/dashboard`}
              >
                <span>My recipes</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "underline underline-offset-2" : ""
                  } flex items-center gap-1`
                }
                to={`/dashboard/new`}
              >
                <span>New</span>
                <FiPlusCircle />
              </NavLink>
              <Form action="/logout" method="post">
                <div className="flex items-center gap-1 bg-slate-500 text-white p-1 rounded-md">
                  <button type="submit">Logout</button>
                  <FiLogOut />
                </div>
              </Form>
            </div>
          </Dropdown>
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
