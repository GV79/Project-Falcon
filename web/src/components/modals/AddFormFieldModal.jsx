import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../slices/modalSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  // makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';

// const useStyles = makeStyles(() => ({}));

export default function AddFormFieldModal() {
  const [open, setOpen] = useState(true);
  const [type, setType] = useState('');
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
  // const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(hideModal());
    }, 200);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle style={{ color: '#5a7893', paddingTop: '2rem' }}>
        <strong>Add Form Field</strong>
      </DialogTitle>
      <DialogContent>
        <Grid container alignItems='center'>
          <DialogContentText style={{ width: '20%', margin: 0 }}>
            <strong>Field *</strong>
          </DialogContentText>
          <FormControl variant='outlined' style={{ marginLeft: 'auto', width: '75%' }}>
            <InputLabel>Type</InputLabel>
            <Select value={type} label='Question Type' onChange={(event) => setType(event.target.value)}>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={'short-text'}>Short Text</MenuItem>
              <MenuItem value={'multi-text'}>Long Text</MenuItem>
              <MenuItem value={'multi-choice'}>Multiple Choice</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container alignItems='center' style={{ margin: '1rem 0' }}>
          <DialogContentText style={{ width: '20%', margin: 0 }}>
            <strong>Label *</strong>
          </DialogContentText>
          <TextField label='Question' variant='outlined' style={{ margin: '0 0 0 auto', width: '75%' }} />
        </Grid>
        <Grid container alignItems='center'>
          <DialogContentText style={{ width: '20%', margin: 0 }}>
            <strong>Options *</strong>
          </DialogContentText>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', width: '75%' }}>
            <TextField label='Outlined' variant='outlined' />
            <Fab
              color='primary'
              aria-label='add'
              size='small'
              style={{ marginLeft: '1rem', borderRadius: 0, padding: '0 1rem' }}
            >
              <AddIcon />
            </Fab>
            <Fab
              color='primary'
              aria-label='subtract'
              size='small'
              style={{ marginLeft: '1rem', backgroundColor: '#CE3030', borderRadius: 0, padding: '0 1rem' }}
            >
              <MinusIcon />
            </Fab>
          </div>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' autoFocus>
          Cancel
        </Button>
        <Button onClick={handleClose} color='primary'>
          Add New
        </Button>
      </DialogActions>
    </Dialog>
  );
}
