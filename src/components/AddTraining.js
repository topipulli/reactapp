import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DialogContentText } from "@mui/material";


export default function AddTraining(props){

    const [open, setOpen] = React.useState(false);
    const [newTrain, setNewTrain] = React.useState({
        date: '', 
        activity: '',
        duration: '',
        customer: props.link
    })

    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleInputChange = (event) => {
        setNewTrain({...newTrain, [event.target.name]: event.target.value})
      }

      const dateChanged = (date) => {
        setNewTrain({...newTrain, date})
    }

      
    const saveTrain = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newTrain)
        }) 
        .catch(err => console.log(err))
        handleClose();
        }

return (
    <div>
        <Button onClick={handleClickOpen}>
            ADD TRAINING
      </Button>
      <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Training</DialogTitle>
            <DialogContent>
                 <TextField
                    margin="dense"
                    name="activity"
                    value={newTrain.activity}
                    onChange={e => handleInputChange(e)}
                    label="Activity"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="duration"
                    value={newTrain.duration}
                    onChange={e => handleInputChange(e)}
                    label="Duration"
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                        label="Date & Time"
                        name="date"
                        value={newTrain.date}
                        onChange={date => dateChanged(moment(date).toISOString())}
                        renderInput={(params) => <TextField {...params} />}
                        />
                </LocalizationProvider>
                
            </DialogContent>
                <DialogContentText>
                </DialogContentText>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={saveTrain}>
                    Save
                </Button>
            </DialogActions>
      </Dialog>

    </div>
)
}
