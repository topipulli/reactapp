import React, { useState } from'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Trainings from './Trainings';
import Customers from './Customers';
import CalendarRender from './Calendar';

function TabApp() {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => { 
         setValue(value);
        };
    
    return (
    <div>

       <Tabs  value={value} onChange={handleChange}>
            <Tab value="one" label="CUSTOMERS" />
            <Tab value="two"label="TRAININGS" />
            <Tab value="three"label="CALENDAR" />

        </Tabs>   
        {value === 'one' && <div><Customers /></div>}   
        {value === 'two' && <div><Trainings /></div>}  
        {value === 'three' && <div><CalendarRender /></div>}  

    </div>
    );
    
}
export default TabApp;