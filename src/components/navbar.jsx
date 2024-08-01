
import { Link } from "react-router-dom";

function NavBar(){
    return(
        <nav className="navbar">
            <ul>
                <li>
                    <Link to={'/login-screen'}> Login</Link>
                </li>
            </ul>

        </nav>
    )
}
export default NavBar;

/*<li>
    <Link to={'/loading-screen'}> Loading</Link>
    </li>*/