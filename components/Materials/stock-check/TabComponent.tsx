// TabComponent.js
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import theme from '../../../themes/theme';

function TabComponent({ selectedTab, setSelectedTab }:any) {
  const handleChange = (event: React.SyntheticEvent,  newValue:number) => {
    console.log("event", event);
    console.log("newValue", newValue);
    setSelectedTab(newValue);
  };

  return (
    <Box>
    <Tabs
      value={selectedTab}
      onChange={handleChange}
      sx={{
        display: 'flex',
        alignContent:'center',
        ml:'16px',
        justifyContent: 'flex-start', 
        '& .MuiTab-root': {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
        },
        '& .Mui-selected': {
          color: '#2563EB !important' ,
        },
        '& .MuiTabs-indicator': {
          backgroundColor:theme.palette.secondary.main,
          
        },
      }}
    >
      <Tab label="General" value={0} />
      <Tab label="Movimiento de Stock" value={1} />
    </Tabs>
  
        </Box>
  );
}

export default TabComponent;
