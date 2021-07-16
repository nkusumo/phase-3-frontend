import { useEffect, useState } from "react";
import GroupSelect from './GroupSelect';
import GroupInfo from './GroupInfo'
import { useHistory } from "react-router";

function GroupPage({currentName, currentUser}) {

  document.title = "Netflix and Choose | Group Page"
  const [currentGroup, setCurrentGroup] = useState('');
  const [groupList, setGroupList] = useState([]);

  let history = useHistory()

  useEffect(() => {
    console.log('I happened')
    fetch(`http://localhost:9393/users/${currentUser}/groups`)
    .then(resp => resp.json())
    .then(setGroupList)
  }, [currentUser])

  let groupName = currentGroup ? groupList.find(group => group.id == currentGroup).group_name : ''

  return (
    <>
      <h1>Welcome, {currentName}!</h1>
      <div id="groupSelect">
        <GroupSelect className="groupSelectChild" groupList={groupList} setCurrentGroup={setCurrentGroup} />
        <button className="groupSelectChild" onClick={() => history.push('/new-group')}>Create a new group</button>
      </div>
      {currentGroup ? <GroupInfo currentGroup={currentGroup} groupName={groupName}/> : null}
    </>
  )
}
  
export default GroupPage;