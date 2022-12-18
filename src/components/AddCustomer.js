import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props){
    const [open, setOpen] = React.useState(false);
    const [newCust, setNewCust] = React.useState({
        firstname: '', 
        lastname: '',
        phone: '',
        email: '',
        streetaddress: '',
        postcode: '',
        city: '',
    })

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleInputChange = (event) => {
        setNewCust({...newCust, [event.target.name]: event.target.value})
      }

      const addCust = () => {
        props.saveCust(newCust);
        handleClose();
      }

return (
    <div>
        <Button style={{margin: 20}} variant="outlined" onClick={handleClickOpen}>
        Create a customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New customer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={newCust.firstname}
                    onChange={e => handleInputChange(e)}
                    label="First name"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="lastname"
                    value={newCust.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Last name"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="phone"
                    value={newCust.phone}
                    onChange={e => handleInputChange(e)}
                    label="Phone"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="email"
                    value={newCust.email}
                    onChange={e => handleInputChange(e)}
                    label="Email"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="streetaddress"
                    value={newCust.streetaddress}
                    onChange={e => handleInputChange(e)}
                    label="Street address"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="postcode"
                    value={newCust.postcode}
                    onChange={e => handleInputChange(e)}
                    label="Post code"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="city"
                    value={newCust.city}
                    onChange={e => handleInputChange(e)}
                    label="City"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={addCust}>
                    Save
                </Button>
            </DialogActions>
      </Dialog>

    </div>
)
}
