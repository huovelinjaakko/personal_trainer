import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { format, parseISO } from 'date-fns';
import Button from '@mui/material/Button';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const deleteButton = (rowValue) => {
        return <Button size="small" color="secondary" onClick={() => deleteTraining(rowValue)}>Delete</Button>
    }

    const deleteTraining = (link) => {
        if (window.confirm("Do you want to delete this training?")) {
            fetch('https://customerrest.herokuapp.com/api/trainings/'+link.value, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
        
    }

    useEffect(() => fetchData(), []);

    const columns = [
        {headerName: "Activity", field: "activity", sortable:true, filter: true, floatingFilter: true},
        {headerName: "Date", field: "date", sortable:true, filter: true, floatingFilter: true, 
            cellRenderer: params => {
                return format(parseISO(params.value), 'dd.MM.yyyy HH:mm')           
            }},
        {headerName: "Duration (min)", field: "duration", sortable:true, filter: true, floatingFilter: true},
        {headerName: "Customer", valueGetter: function sumNames(params) {
            return params.data.customer.firstname + " " + params.data.customer.lastname
        }, sortable:true, filter: true, floatingFilter: true},
        {headerName: "", width: 120, field: "id", cellRenderer: deleteButton}
    ]

    return(
        <div className='ag-theme-material'
            style={{height: '1000px', width: '90%', margin: 'auto', padding: '60px'}}>
            <AgGridReact
                columnDefs={columns}
                rowData={trainings}>

            </AgGridReact>
        </div>
    )
}