import { useEffect, useState } from "react";
import GroupSelect from './GroupSelect';
import GroupInfo from './GroupInfo'

function GroupPage({currentName, currentUser}) {

  const [currentGroup, setCurrentGroup] = useState('');
  const [groupList, setGroupList] = useState([]);

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
      {currentGroup ? <GroupInfo currentGroup={currentGroup} /> : null}
    </>
  )
}
  
  export default GroupPage;