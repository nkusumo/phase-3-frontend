import { useEffect, useState } from "react";

function GroupPage({currentName, currentUser}) {

  const [currentGroup, setCurrentGroup] = useState('');
  const [groupList, setGroupList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    console.log('I happened')
    fetch(`http://localhost:9393/users/${currentUser}/groups`)
    .then(resp => resp.json())
    .then(setGroupList)
  }, [currentUser])
  console.log(groupList)
  return (
    <>
      <h1>Welcome {currentName}!</h1>
      <label>Select your group:</label>
      <select>
        {groupList.map(group => <option key={group.id} value={group.id}>{group.group_name}</option>)}
      </select>
    </>
  )
}
  
  export default GroupPage;