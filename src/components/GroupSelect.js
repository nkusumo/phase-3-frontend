// import Select from 'react-select'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function GroupSelect({groupList, setCurrentGroup}) {
    return (
      <div id="groupSelectDiv">
        <label>Select your group:</label>&nbsp;&nbsp;
        <FormControl variant="outlined">
          <Select onChange={(e)=>setCurrentGroup(e.target.value)} label="Select Group">
            {groupList.map(group => <MenuItem key={group.id} value={group.id}>{group.group_name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    )
  }
  
  export default GroupSelect;