import Home from "routes/Home";
import Profile from "routes/Profile";
import { useRoutes } from "react-router-dom";

const HomeRoutes = ({ userObj, refreshUser }) => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home userObj={userObj} />,
    },
    {
      path: "/profile",
      element: <Profile userObj={userObj} refreshUser={refreshUser} />,
    },
  ]);

  return routes;
};

export default HomeRoutes;
