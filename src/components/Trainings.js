import React, { useEffect, useState, } from "react";
import { AgGridReact } from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Customers from "./Customers";
import moment from "moment";
import 'moment/locale/fi'

function Trainings() {
    const [train, setTrain] = useState([]);
    const [isready, setReady] = useState(false);
  
  
        useEffect(() => getTrain(), []);

  const getTrain = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => {
        setReady(true);
        setTrain(data);
        moment.locale('fi');
        console.log(data)
    })
    .catch(err => console.error(err))

    }
    
    
    const columns = [
        {headerName: 'Duration', field: "duration", sortable: true, filter: true},
        {headerName: 'Activity', field: "activity", sortable: true, filter: true},  
        {headerName: 'Date', field: "date", sortable: true, filter: true, width:300,
         cellRenderer: (params) => moment(params.data.date).format('lll')},  
        {headerName: 'Customer', field: "firstname", 
        valueGetter: (params) => {
           return params.data.customer.firstname + ' ' + params.data.customer.lastname;
        }
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
        </div>
     )

        }
}

export default Trainings;




