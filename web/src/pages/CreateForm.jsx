import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddFormFieldModal from '../components/modals/AddFormFieldModal';
import { Button, Checkbox, FormControl, Grid, IconButton, Radio, TextareaAutosize, TextField } from '@material-ui/core';
import { Field, PropertiesGrid } from './CreateFormStyles';
import { selectModal, showAddFormFieldModal } from '../slices/modalSlice';
import { selectForm, deleteField } from '../slices/formSlice';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PublishIcon from '@material-ui/icons/Publish';
import { FORM_TYPE, MODAL } from '../components/constants';

export default function CreateForm() {
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
  const modalState = useSelector(selectModal);

  const [title, setTitle] = useState('Untitled form');
  const [description, setDescription] = useState('');

  const handleFieldDeletion = (id) => {
    dispatch(deleteField(id));
  };

  const renderField = (type) => {
    switch (type) {
      case FORM_TYPE.SINGLE:
        return (
          <TextField
            id='outlined-basic'
            label='Outlined'
            variant='outlined'
            size='small'
            style={{ minWidth: '15rem', marginLeft: '1rem' }}
          />
        );
      case FORM_TYPE.LONG:
        return (
          <TextareaAutosize
            aria-label='minimum height'
            rowsMin={3}
            disabled
            style={{ minWidth: '15rem', marginLeft: '1rem' }}
          />
        );
      default:
        return (
          <FormControl component='fieldset' style={{ marginLeft: '1rem' }}>
            <Grid container>
              <Radio checked={true} value='a' name='radio-button' inputProps={{ 'aria-label': 'A' }} disabled />
              <Radio checked={false} value='b' name='radio-button' inputProps={{ 'aria-label': 'B' }} disabled />
              <Radio checked={false} value='c' name='radio-button' inputProps={{ 'aria-label': 'C' }} disabled />
              <Radio checked={false} value='d' name='radio-button' inputProps={{ 'aria-label': 'D' }} disabled />
            </Grid>
          </FormControl>
        );
    }
  };

  return (
    <>
      {modalState === MODAL.ADD_FORM_FIELD && <AddFormFieldModal />}
      <Grid container justify='center'>
        <PropertiesGrid container type='flex' direction='row'>
          <Grid container direction='column' justify='flex-start' style={{ flex: 1 }}>
            <TextField
              label='Form Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginBottom: '0.5rem' }}
            />
            <TextField label='Form Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          </Grid>
          <Grid container direction='column' alignItems='flex-end' style={{ flex: 1 }}>
            <Grid container justify='flex-end'>
              <Button
                variant='contained'
                color='primary'
                startIcon={<AddIcon />}
                style={{ width: '8rem', backgroundColor: '#399439', margin: '0 0 1rem 1rem' }}
                onClick={() => dispatch(showAddFormFieldModal())}
              >
                Add
              </Button>
              <Button
                variant='contained'
                color='secondary'
                startIcon={<DeleteIcon />}
                style={{ width: '8rem', backgroundColor: '#ce3030', margin: '0 0 1rem 1rem' }}
              >
                Delete
              </Button>
            </Grid>
            <Grid container justify='flex-end'>
              <Button
                variant='contained'
                color='primary'
                startIcon={<PublishIcon />}
                style={{ width: '8rem', backgroundColor: '#5470aa', margin: '0 0 1rem 1rem' }}
              >
                Publish
              </Button>
              <Button
                variant='contained'
                color='primary'
                startIcon={<SendIcon />}
                style={{ width: '8rem', margin: '0 0 1rem 1rem' }}
              >
                Share
              </Button>
            </Grid>
          </Grid>
        </PropertiesGrid>
        {form?.fields.map((field, index) => (
          <Field key={index}>
            <Checkbox
              defaultChecked
              color='primary'
              inputProps={{ 'aria-label': 'required checkbox' }}
              style={{ marginRight: '1rem' }}
            />
            <p style={{ minWidth: '8rem', maxWidth: '8rem', marginRight: '1rem' }}>{field.label}</p>
            {renderField(field.type)}
            <IconButton
              aria-label='delete'
              style={{ marginLeft: 'auto' }}
              onClick={() => handleFieldDeletion(field.id)}
            >
              <HighlightOffIcon />
            </IconButton>
          </Field>
        ))}
      </Grid>
    </>
  );
}
