import React, { useState } from 'react';
import { Alert, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers';

export default function Addtraining(props) {

    const [open, setOpen] = React.useState(false);

    const [training, setTraining] = React.useState({
        activity: '', date: '', duration: '', customer: ''
    });

    const handleClickOpen = () => {
        setTraining({
            activity: '',
            date: '',
            duration: '',
            customer: props.customer_link
        });
        console.log(training);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setTraining({...training, [e.target.name]: e.target.value })
    };

    const addTraining = () => {
        props.saveTraining(training);
        handleClose()
    };

    return(
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <div>
            <Button style={{margin: 5}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />
                    <DateTimePicker
                        name="date"
                        label="Date"
                        value={training.date}
                        onChange={(newValue) => {
                            setTraining({...training, date: newValue });
                          }}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </LocalizationProvider>
    );
}