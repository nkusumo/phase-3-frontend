import {NavLink} from 'react-router-dom'

function NavBar() {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/group-page">Group Page</NavLink>
      </>
    )
  }
  
  export default NavBar;