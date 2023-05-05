import { useRoutes } from "react-router-dom";
import Auth from "routes/Auth";

const AuthRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Auth />,
    },
  ]);

  return routes;
};

export default AuthRoutes;
