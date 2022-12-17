import React, { useState } from'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Trainings from './Trainings';
import Customers from './Customers';

function TabApp() {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => { 
         setValue(value);
        };
    
    return (
    <div>

       <Tabs  value={value} onChange={handleChange}>
            <Tab value="one" label="TRAINING" />
            <Tab value="two"label="CUSTOMERS" />
        </Tabs>   
        {value === 'one' && <div><Trainings /></div>}   
        {value === 'two' && <div><Customers /></div>}  
    </div>
    );
    
}
export default TabApp;