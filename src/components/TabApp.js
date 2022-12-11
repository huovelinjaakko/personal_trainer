import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';

export default function TabApp() {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
    }

    return(
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Customers" />
                <Tab value="two" label="Trainings" />
            </Tabs>
            {value === 'one' && <div><Customerlist /></div>}
            {value === 'two' && <div><Traininglist /></div>}
        </div>
    )
}