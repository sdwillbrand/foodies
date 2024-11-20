import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

export const Login = () => {
  const { login, isAuthenticated, user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target["username"].value;
    const password = e.target["password"].value;
    login(username, password);
  };

  if (isAuthenticated) {
    return <Navigate to={`/dashboard/${user._id}`} />;
  }

  return (
    <main className="w-full h-full flex items-center justify-center flex-col">
      <h1 className="text-2xl mt-5">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-5 p-2 gap-2">
        <input
          className="p-3 border rounded-lg"
          name="username"
          placeholder="Username"
          required
        />
        <input
          className="p-3 border rounded-lg"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button className="p-2 border rounded-lg bg-primary hover:bg-primary/50">
          Login
        </button>
      </form>
    </main>
  );
};
