import React, { useEffect, useState, } from "react";
import { AgGridReact } from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";


function Customers() {
    const [cust, setCust] = useState([]);
    const [isready, setReady] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
  
        useEffect(() => getCust(), [])


    const getCust = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => {
        setReady(true);
        setCust(data.content);
        console.log(data.content);
    })
  }
  
     const deleteCust = (link) => {
        if(window.confirm('Are you sure?')){
        fetch(link, {method: 'DELETE'})
        .then(res => getCust())
        .catch(err => console.log(err))
        setMessage("Customer and all linked trainings deleted");
        setOpen(true);
        console.log(link);
    }
}

    const saveCust = (newCust) => {
        fetch('https://customerrest.herokuapp.com/api/customers',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCust)
        })
            .then(res => getCust())
            .catch(err => console.log(err))
            setMessage("New customer added");
            setOpen(true);
        }

    const updateCust = (cust, link) => {
        fetch(link, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cust)
        })
            .then(res => getCust())
            .catch(err => console.log(err))
            setMessage("Customer info updated");
            setOpen(true);
    }


const handleClose = () => {
    setOpen(false);
}

const handleClick = () => {
    setOpen(true);
}

    const columns = [
        {headerName: 'Name', field: "name", sortable: true, filter: true,
        valueGetter: (params) => {
            return params.data.firstname + ' ' + params.data.lastname;
         }},
        {headerName: 'Phone ', field: "phone", sortable: true, filter: true},   
        {headerName: 'Address ', field: "address", sortable: true, filter: true, width: 280,
        valueGetter: (params) => {
            return params.data.streetaddress + ', ' + params.data.postcode + ', ' + params.data.city;
            }
        },
        {headerName: '', field: '', width: 175,filter: false, sortable: false,
        cellRenderer: row => <AddTraining link={row.data.links[1].href} setOpen={setOpen}/>
        },
        {headerName: '', field: '', width: 150,filter: false, sortable: false,
        cellRenderer: row => <EditCustomer updateCust={updateCust} editCust={row.data}/>
        },
        {headerName: '', field: 'links.self.href', width: 150, filter: false, sortable: false,
        cellRenderer: row => <Button color="secondary" size="small" onClick={() =>deleteCust(row.data.links[0].href)}>Delete</Button>
        }
     ]


if (!isready){
    return <p>Loading...</p>
}
else{

     return (
        <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
            <AddCustomer saveCust={saveCust}/>
            <AgGridReact
            columnDefs={columns}
            rowData={cust}>
            </AgGridReact>
            <Snackbar open={open} handleClick={handleClick} message={message} autoHideDuration={6000} onClose={handleClose}  />

        </div>
     )

        }
}

export default Customers;




