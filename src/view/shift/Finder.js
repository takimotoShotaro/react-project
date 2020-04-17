import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function Finder(props) {

  const {groups, staff, onStaffChange} = props;

  return (
    <div style={{padding: '24px 0'}}>
      <Select
        variant={'outlined'}
        value={staff}
        onChange={onStaffChange}
      >
        <MenuItem value={0}>すべてのスタッフ</MenuItem>
      </Select>
    </div>
  );
}
