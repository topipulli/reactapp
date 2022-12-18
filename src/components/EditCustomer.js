import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Customers from "./Customers";


export default function EditCustomer(props){
    const [open, setOpen] = React.useState(false);
    const [cust, setCust] = React.useState({
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
        setCust({
            firstname: props.editCust.firstname, 
            lastname: props.editCust.lastname,
            phone: props.editCust.phone,
            email: props.editCust.email,
            streetaddress: props.editCust.streetaddress,
            postcode: props.editCust.postcode,
            city: props.editCust.city,
        })
        console.log(props.editCust);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleInputChange = (event) => {
        setCust({...cust, [event.target.name]: event.target.value})
      }

      const updateCust = () => {
        props.updateCust(cust, props.editCust.links[1].href);
        handleClose();
      }

return (
    <div>
        <Button onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit customer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={cust.firstname}
                    onChange={e => handleInputChange(e)}
                    label="First name"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="lastname"
                    value={cust.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Last name"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="phone"
                    value={cust.phone}
                    onChange={e => handleInputChange(e)}
                    label="Phone"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="email"
                    value={cust.email}
                    onChange={e => handleInputChange(e)}
                    label="Email"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="streetaddress"
                    value={cust.streetaddress}
                    onChange={e => handleInputChange(e)}
                    label="Street address"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="postcode"
                    value={cust.postcode}
                    onChange={e => handleInputChange(e)}
                    label="Post code"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="city"
                    value={cust.city}
                    onChange={e => handleInputChange(e)}
                    label="City"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={updateCust}>
                    Save
                </Button>
            </DialogActions>
      </Dialog>

    </div>
)
}
