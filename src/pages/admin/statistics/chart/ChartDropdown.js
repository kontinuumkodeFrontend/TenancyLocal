import { Dropdown } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ChartDropdown = () => {
  const handleDropdownChange = (eventKey) => {
    console.log('Selected item:', eventKey);
    // Perform additional actions based on the selected item
  };

  return (
    <Dropdown onSelect={handleDropdownChange}>
      <Dropdown.Toggle variant='light'>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </Dropdown.Toggle>
      <Dropdown.Menu >
        <Dropdown.Item eventKey="week">Weekly</Dropdown.Item>
        <Dropdown.Item eventKey="month">Monthly</Dropdown.Item>
        <Dropdown.Item eventKey="year">Yearly</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChartDropdown;