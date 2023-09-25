import { Link } from "react-router-dom"
import HiveHuntLogo from "../assets/png/HiveHuntLogo.png"
import HiveHuntHeader from "../assets/png/HiveHuntHeader.png"

function Header() {
  return (
    <header className='hiveHuntHeader'>
      <Link to="/">
        <img src={HiveHuntLogo} alt="header logo" height="70px" className="logo" />
        <img src={HiveHuntHeader} alt="header" height="60px" />
      </Link>
    </header>
  );
}

export default Header;