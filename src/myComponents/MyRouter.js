import Navigation from "components/Navigation";
import HomeRoutes from "myComponents/HomeRoutes";
import AuthRoutes from "myComponents/AuthRoutes";
import { BrowserRouter } from "react-router-dom";

const AppRouter = ({ userObj, refreshUser, isLoggedIn }) => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    {isLoggedIn && <Navigation userObj={userObj} />}
    <div className="routerContainer">
      {isLoggedIn ? (
        <HomeRoutes userObj={userObj} refreshUser={refreshUser} />
      ) : (
        <AuthRoutes />
      )}
    </div>
  </BrowserRouter>
);

export default AppRouter;
