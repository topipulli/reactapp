import React, { useEffect, useState, } from "react";
import { AgGridReact } from'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Trainings() {
    const [train, setTrain] = useState([]);

    const [isready, setReady] = useState(false);
  
        useEffect(() => getTrain(), [])


  const getTrain = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(data => {
        setReady(true);
        setTrain(data.content);
    })
  }



    
    const columns = [
        {headerName: 'Duration', field: "duration", sortable: true, filter: true},
        {headerName: 'Activity', field: "activity", sortable: true, filter: true},  
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




