import React, { useEffect, useState, } from "react";
import { AgGridReact } from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Trainings from "./Trainings";


function Customers() {
    const [cust, setCust] = useState([]);
    const [isready, setReady] = useState(false);

  
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

    const columns = [
        {headerName: 'First Name', field: "lastname", sortable: true, filter: true},
        {headerName: 'Last Name', field: "firstname", sortable: true, filter: true},  
        {headerName: 'Phone ', field: "phone", sortable: true, filter: true},   
        {headerName: 'Address ', field: "address", sortable: true, filter: true, width: 280,
        valueGetter: (params) => {
                return params.data.streetaddress + ', ' + params.data.postcode + ', ' + params.data.city;
            }
        },
     ]


if (!isready){
    return <p>Loading...</p>
}
else{

     return (
        <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
            <AgGridReact
            columnDefs={columns}
            rowData={cust}>
            </AgGridReact>
        </div>
     )

        }
}

export default Customers;




