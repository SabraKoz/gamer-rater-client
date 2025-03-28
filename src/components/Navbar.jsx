import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar-menu is-centered p-5">
            <li className="p-5 ">
                <NavLink className="has-text-link" to={"/games"}>Games</NavLink>
            </li>
            {
                (localStorage.getItem("rater_token") !== null) ?
                    <li className="p-5">
                        <button className="has-text-link"
                            onClick={() => {
                                localStorage.removeItem("rater_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="p-5 ">
                            <NavLink className="has-text-link" to={"/login"}>Login</NavLink>
                        </li>
                        <li className="p-5 ">
                            <NavLink className="has-text-link" to={"/register"}>Register</NavLink>
                        </li>
                    </>
            }        </ul>
    )
}