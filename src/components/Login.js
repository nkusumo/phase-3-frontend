function Login({userList, handleLogin}) {

  // controlled inputs states
  
  return (
    <>
      <select onChange={handleLogin} defaultValue="default">
        <option value="default" disabled>Select here</option>
        {userList.map(user => <option value={user.id} key={user.id}>{user.name}</option>)}
      </select>
    </>
  )
}

export default Login;