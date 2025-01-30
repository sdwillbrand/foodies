import { RouterProvider } from "react-router-dom";
import { setupRouter } from "./utils/router";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { logout, user } = useContext(AuthContext);
  const router = setupRouter({ logout, userId: user && user._id });

  return <RouterProvider router={router} />;
}

export default App;
