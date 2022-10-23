import { useState } from 'react';
// @mui
import { Link, Stack, TextField, Checkbox, Typography } from '@mui/material';
import {  LoadingButton } from '@mui/lab';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';


// ----------------------------------------------------------------------

export default function EventForm({selectedEvent, setPostData}) {

  const [event, setEvent] = useState(selectedEvent || {name: "", description: "", isActive: false, price: 0.0, location: "", eventAt: new Date().toString()});

  const handleSubmit = () => {
    setPostData(event)
  };

  const inputInput=(key, value) => setEvent({...event,[key]: value})

  return (
    <form  method="POST" onSubmit={handleSubmit}>

      <Stack spacing={3}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
              {!selectedEvent ? "Create" : "Update"} event
        </Typography>
        <TextField required name="eventName"  label="Event Name" value={event.name} onInput={(val) => inputInput('name',val.target.value)} />
        <TextField required name="description" label="Event Description" value={event.description} 
            onInput={(val) => setEvent({...event, description: val.target.value})} 
            multiline maxRows={4}/>
        <TextField required name="price"  type="number" label="Event Price" value={event.price} onChange={(val) => inputInput('price',parseFloat((val.target?.value ? val.target.value : 0)))} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
            required
            renderInput={(props) => <TextField {...props} />}
            label="Date and Time"
            value={event.eventAt}
            onChange={(val) => inputInput('eventAt',val)}
            
        />
        </LocalizationProvider>
        <TextField required name="location" label="Event Address" value={event.location} onChange={(val) => inputInput('location',val.target.value)} />
        <Stack direction="row" alignItems="right" justifyContent="space-between" sx={{ my: 2 }}>
            <Link variant="subtitle2" underline="hover">
                isActive ?
            </Link>
            <Checkbox
                inputProps={{ 'aria-label': 'controlled' }}
                checked={event.isActive}
                onChange={(val) => inputInput('isActive', val.target.checked)}
                name="isActive" label="Is Active?" />
        </Stack>
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        {selectedEvent ? "Update" : "Create"}
      </LoadingButton>
    </form>
  );
}
