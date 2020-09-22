import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import { FORM_TYPE } from '../../constants';
import { addField, selectForm } from '../../slices/formSlice';
import { OptionsWrapper } from './AddFormFieldModalStyles';
import { addFormField } from '../../http/restCalls';
import { v4 as uuidv4 } from 'uuid';

export default function AddFormFieldModal({ showSavedAlert }) {
  const [open, setOpen] = useState(true);
  const [type, setType] = useState(FORM_TYPE.SINGLE);
  const [label, setLabel] = useState('');
  const [options, setOptions] = useState([
    {
      id: uuidv4(),
      value: '',
    },
    {
      id: uuidv4(),
      value: '',
    },
  ]);

  const data = useSelector(selectForm); // form data
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(hideModal());
    }, 200);
  };

  const handleSubmit = async () => {
    const field = {
      id: uuidv4(),
      type,
      label,
      options: type === FORM_TYPE.MULTI ? options : null,
    };
    dispatch(addField(field));
    await addFormField(data, field);
    showSavedAlert();
    handleClose();
  };

  const validateInput = () => {
    if (label.length === 0) return false;

    if (type === FORM_TYPE.MULTI) {
      if (options.length < 2) return false;
      let set = new Set();
      for (let option of options) {
        if (option.value.length === 0) return false;
        if (set.has(option.value)) return false;
        set.add(option.value);
      }
    }

    return true;
  };

  const handleOptionTextChange = (id, text) => {
    setOptions(
      options.map((option) => {
        if (option.id === id) {
          option.value = text;
        }
        return option;
      })
    );
  };

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        id: options[options.length - 1].id + 1,
        value: '',
      },
    ]);
  };

  const handleDeleteOption = (id) => {
    setOptions(options.filter((option) => option.id !== id));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      style={{ maxHeight: '45rem' }}
    >
      <DialogTitle style={{ color: '#5a7893', paddingTop: '2rem' }}>
        <strong>Add Form Field</strong>
      </DialogTitle>
      <DialogContent>
        <Grid container alignItems='center' style={{ marginBottom: '1rem' }}>
          <DialogContentText style={{ width: '20%', margin: 0 }}>
            <strong>Field *</strong>
          </DialogContentText>
          <FormControl variant='outlined' style={{ marginLeft: 'auto', width: '75%' }}>
            <InputLabel>Type</InputLabel>
            <Select value={type} label='Question Type' onChange={(event) => setType(event.target.value)}>
              <MenuItem value={FORM_TYPE.SINGLE}>Short Text</MenuItem>
              <MenuItem value={FORM_TYPE.LONG}>Long Text</MenuItem>
              <MenuItem value={FORM_TYPE.MULTI}>Multiple Choice</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container alignItems='center' style={{ marginBottom: '1rem' }}>
          <DialogContentText style={{ width: '20%', margin: 0 }}>
            <strong>Label *</strong>
          </DialogContentText>
          <TextField
            label='Label'
            variant='outlined'
            style={{ margin: '0 0 0 auto', width: '75%' }}
            onChange={(e) => setLabel(e.target.value)}
          />
        </Grid>
        {type === FORM_TYPE.MULTI &&
          options.map((option, index) => (
            <Grid container alignItems='center' style={{ marginBottom: '1rem' }} key={index}>
              {index === 0 && (
                <DialogContentText style={{ width: '20%', margin: 0 }}>
                  <strong>Options *</strong>
                </DialogContentText>
              )}
              <OptionsWrapper>
                <TextField
                  label='Choice'
                  variant='outlined'
                  onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                />
                <Fab
                  color='primary'
                  aria-label='add'
                  size='small'
                  style={{ marginLeft: '1rem', borderRadius: 0, padding: '0 1rem' }}
                  onClick={handleAddOption}
                >
                  <AddIcon />
                </Fab>
                <Fab
                  color='primary'
                  aria-label='subtract'
                  size='small'
                  style={{ marginLeft: '1rem', backgroundColor: '#CE3030', borderRadius: 0, padding: '0 1rem' }}
                  disabled={index === 0 || index === 1}
                  onClick={() => handleDeleteOption(option.id)}
                >
                  <MinusIcon />
                </Fab>
              </OptionsWrapper>
            </Grid>
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' autoFocus>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='primary' disabled={!validateInput()}>
          Add New
        </Button>
      </DialogActions>
    </Dialog>
  );
}
