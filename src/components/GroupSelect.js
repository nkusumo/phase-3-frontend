function GroupSelect({groupList, setCurrentGroup}) {
    return (
      <>
        <label>Select your group:</label>
        <select onChange={(e)=>setCurrentGroup(e.target.value)} defaultValue="default">
          <option value="default" disabled>Select here</option>
          {groupList.map(group => <option key={group.id} value={group.id}>{group.group_name}</option>)}
        </select>
      </>
    )
  }
  
  export default GroupSelect;