import { useEffect, useState } from "react";
import GroupSelect from './GroupSelect';
import GroupInfo from './GroupInfo'
import { useHistory } from "react-router";

function GroupPage({currentName, currentUser}) {

  const [currentGroup, setCurrentGroup] = useState('');
  const [groupList, setGroupList] = useState([]);

  let history = useHistory()

  useEffect(() => {
    console.log('I happened')
    fetch(`http://localhost:9393/users/${currentUser}/groups`)
    .then(resp => resp.json())
    .then(setGroupList)
  }, [currentUser])

  return (
    <>
      <h1>Welcome {currentName}!</h1>
      <GroupSelect groupList={groupList} setCurrentGroup={setCurrentGroup} />
      <button onClick={() => history.push('/new-group')}>Create a new group</button>
      {currentGroup ? <GroupInfo currentGroup={currentGroup} /> : null}
    </>
  )
}
  
export default GroupPage;