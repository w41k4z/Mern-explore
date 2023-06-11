import { Link } from "react-router-dom";
import "../assets/css/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <Link to="/society">
        <button>Go</button>
      </Link>
    </div>
  );
};

export default LandingPage;
