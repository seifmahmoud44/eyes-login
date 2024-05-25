import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RouteProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const useClient =
    Cookies.get("user_client") !== undefined &&
    JSON.parse(Cookies.get("user_client"));

  useEffect(() => {
    if (useClient?.powers_client === "1") {
      if (
        location.pathname !== "/dashboard" &&
        location.pathname !== "/login"
      ) {
        navigate("/dashboard", { replace: true });
      }
    } else if (useClient?.powers_client === "2") {
      navigate("/login", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, []);
  return children;
};

export default RouteProvider;
