import React, { useEffect, useState, } from "react";
import { AgGridReact } from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from "moment";
import 'moment/locale/fi';
import { Button, Snackbar } from "@mui/material";

function Trainings() {
    const [train, setTrain] = useState([]);
    const [isready, setReady] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
  
    useEffect(() => getTrain(), []);

  const getTrain = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => {
        setReady(true);
        setTrain(data);
        console.log(data)
    })
    .catch(err => console.error(err))
    }

    const deleteTrain = (id) => {
        if(window.confirm('Are you sure?')){
        fetch('https://customerrest.herokuapp.com/api/trainings/'+id, 
        {
            method: 'DELETE'
        })
        .then(res => getTrain())
        .catch(err => console.log(err))
        setMessage("Instance deleted");
        setOpen(true);
    }
}
    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    const columns = [
        {headerName: 'Duration', field: "duration", sortable: true, filter: true},
        {headerName: 'Activity', field: "activity", sortable: true, filter: true},  
        {headerName: 'Date', field: "date", sortable: true, filter: true, width:300,
         cellRenderer: (params) => moment(params.data.date).format('MMM Do YYYY, HH:mm')},  
        {headerName: 'Customer', field: "customer", sortable:true, filter: true,
            valueGetter: (params) => {
                 return params.data.customer.firstname + ' ' + params.data.customer.lastname;
        }},
        {headerName: '', field: '', width: 150,
        cellRenderer: row => <Button color="secondary" size="small" onClick={() =>deleteTrain(row.data.id)}>Delete</Button>
    }
    ]


    if (!isready){
    return <p>Loading...</p>
    }

else{
     return (
        <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
            <AgGridReact
            columnDefs={columns}
            rowData={train}>
                </AgGridReact>
                <Snackbar open={open} handleClick={handleClick} message={message} autoHideDuration={6000} onClose={handleClose} />

        </div>
     )

        }
}

export default Trainings;




