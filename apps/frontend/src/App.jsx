import { RouterProvider } from "react-router-dom";
import { setupRouter } from "./utils/router";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { logout } = useContext(AuthContext);
  const router = setupRouter({ logout });

  return <RouterProvider router={router} />;
}

export default App;
