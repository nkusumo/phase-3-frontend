import Select from 'react-select'

function GroupSelect({groupList, setCurrentGroup}) {

  const options = groupList.map(group=> ({value: group.id, label: group.group_name}))

    return (
      <div id="groupSelectDiv">
        <label>Select your group:</label>&nbsp;&nbsp;
        {/* <select onChange={(e)=>setCurrentGroup(e.target.value)} defaultValue="default">
          <option value="default" disabled>Select here</option>
          {groupList.map(group => <option key={group.id} value={group.id}>{group.group_name}</option>)}
        </select> */}
        <Select options={options} onChange={(e)=>setCurrentGroup(e.value)}/>
      </div>
    )
  }
  
  export default GroupSelect;