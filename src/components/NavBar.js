import {NavLink} from 'react-router-dom'

function NavBar({currentName, handleLogout}) {
    return (
      <div id="navBar">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/login">Login</NavLink>
        <NavLink className="nav-link" to={currentName !== '' ? "/group-page" : "/login"}>Group Page</NavLink>
        {currentName !== '' ? <button className="nav-link" id="logout" onClick={handleLogout}>Logout</button> : null}
      </div>
    )
  }
  
  export default NavBar;