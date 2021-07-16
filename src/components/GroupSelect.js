function GroupSelect({groupList, setCurrentGroup}) {
    return (
      <div id="groupSelectDiv">
        <label>Select your group:</label>&nbsp;&nbsp;
        <select onChange={(e)=>setCurrentGroup(e.target.value)} defaultValue="default">
          <option value="default" disabled>Select here</option>
          {groupList.map(group => <option key={group.id} value={group.id}>{group.group_name}</option>)}
        </select>
      </div>
    )
  }
  
  export default GroupSelect;