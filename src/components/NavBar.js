import {NavLink} from 'react-router-dom'

function NavBar({currentName, handleLogout}) {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to={currentName !== '' ? "/group-page" : "/login"}>Group Page</NavLink>
        {currentName !== '' ? <button onClick={handleLogout}>Logout</button> : null}
      </>
    )
  }
  
  export default NavBar;