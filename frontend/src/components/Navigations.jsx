import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/argentBankLogo-min.webp";
import { logout } from "../redux/actions/actions.authen";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/reducers/reducer.user";

function Navigation() {
  const token = useSelector((state) => state.auth.token);

  // Récupération du token pour savoir si l'utilisateur est connecté
  const isConnected = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupération du nom d'utilisateur
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      const userData = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/v1/user/profile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();

            // Dispatch de l'action userProfile pour stocker les données de l'utilisateur dans le store Redux
            dispatch(getUserProfile(data.body));
          } else {
            console.log("error while retrieving profile");
          }
        } catch (error) {
          console.error(error);
        }
      };
      userData();
    }
  }, [dispatch, token]);
  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          src={logo}
          alt="Argent Bank Logo"
          className="main-nav-logo-image"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      {isConnected ? (
        <div className="link-container">
          <Link to="/profile">
            <i className="fa fa-circle-user" />
            {userData.userName}
          </Link>
          <Link to="/" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" />
            Sign out
          </Link>
        </div>
      ) : (
        <div>
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
