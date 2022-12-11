import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const deleteButton = (rowValue) => {
        return <Button size="small" color="secondary" onClick={() => deleteCustomer(rowValue)}>Delete</Button>
    }

    const editCustomer = (row) => {
        return <Editcustomer updateCustomer={updateCustomer} customer={row.data} />
    }

    const addTraining = (customer_link) => {
        console.log("Customer link: " + customer_link.value)
        return <Addtraining saveTraining={saveTraining} customer_link={customer_link.value}/>
    }

    const deleteCustomer = (link) => {
        if (window.confirm("Do you want to delete this customer?")) {
            fetch(link.value, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
        
    }

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)    
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const columns = [
        {headerName: "", width: 220, field: "links.0.href", cellRenderer: addTraining},
        {headerName: "First name", field: "firstname", sortable:true, filter: true, floatingFilter: true},
        {headerName: "Last name", field: "lastname", sortable:true, filter: true, floatingFilter: true},
        {headerName: "Email", field: "email", sortable:true, filter: true, floatingFilter: true},
        {headerName: "Phone", field: "phone", sortable:true, filter: true, floatingFilter: true},
        {headerName: "Address", field: "streetaddress", sortable:true, filter: true, floatingFilter: true},
        {headerName: "Postcode", field: "postcode", sortable:true, filter: true, floatingFilter: true},
        {headerName: "City", field: "city", sortable:true, filter: true, floatingFilter: true},
        {headerName: "", width: 150, cellRenderer: editCustomer},
        {headerName: "", width: 150, field: "links.0.href", cellRenderer: deleteButton}
    ]

    return(
        <div className='ag-theme-material'
            style={{height: '800px', width: '100%', margin: 'auto'}}>
            <Addcustomer saveCustomer={saveCustomer} />
            <AgGridReact
                columnDefs={columns}
                rowData={customers}>
            </AgGridReact>

        </div>
    );
}