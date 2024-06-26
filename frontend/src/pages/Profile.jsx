import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../components/Navigations";
import Footer from "../components/Footer";
import Account from "../components/Account";
import HeaderUser from "../components/HeaderUser";
import accountData from "../data/accountdata.json";
import { useSelector } from "react-redux";


function User() {
  // Récupération du token pour savoir si l'utilisateur est connecté
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  
// Vérification du token pour rediriger l'utilisateur vers la page de connexion si le token n'est pas présent
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }); 

  return (
    <div className="page_account">
      <Navigation />
      {token && (
        <main className="main bg-dark">
          <HeaderUser />
          {accountData.map((account) => (
            <Account
              key={account.id}
              title={account.title}
              type={account.type}
              accountnumber={account.accountnumber}
              amount={account.amount}
              description={account.description}
            />
          ))}
        </main>
      )}
      <Footer />
    </div>
  
  );
}

export default User;
