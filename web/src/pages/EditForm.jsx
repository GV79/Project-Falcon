import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddFormFieldModal from '../components/modals/AddFormFieldModal';
import { Checkbox, FormControl, Grid, IconButton, Radio, TextareaAutosize, TextField } from '@material-ui/core';
import { Field, FormButton, PropertiesGrid } from './EditFormStyles';
import { selectModal, showAddFormFieldModal } from '../slices/modalSlice';
import { selectForm, deleteField } from '../slices/formSlice';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PublishIcon from '@material-ui/icons/Publish';
import { FORM_TYPE, MODAL } from '../constants';
import { Link, useHistory } from 'react-router-dom';
import { getFormById } from '../http/restCalls';
import GenericLoader from '../components/loading/GenericLoader';
// import debounce from 'lodash/debounce';

export default function EditForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
  const modalState = useSelector(selectModal);

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('Untitled form');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const params = history.location.search;
    const id = params.split('=')[1];

    (async () => {
      const { data } = await getFormById(id);

      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
      setUuid(data.uuid);
      setLoading(false);
    })().catch((err) => {
      setLoading(false);
      console.log(err);
    });
  });

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
        {loading ? (
          <GenericLoader />
        ) : (
          <>
            <PropertiesGrid container type='flex' direction='row'>
              <Grid container direction='column' justify='flex-start' style={{ flex: 1 }}>
                <TextField
                  label='Form Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ marginBottom: '0.5rem' }}
                />
                <TextField
                  label='Form Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid container direction='column' alignItems='flex-end' style={{ flex: 1 }}>
                <Grid container justify='flex-end'>
                  <FormButton
                    variant='contained'
                    color='primary'
                    startIcon={<AddIcon />}
                    style={{ backgroundColor: '#399439' }}
                    onClick={() => dispatch(showAddFormFieldModal())}
                  >
                    Add
                  </FormButton>
                  <FormButton
                    variant='contained'
                    color='secondary'
                    startIcon={<DeleteIcon />}
                    style={{ backgroundColor: '#ce3030' }}
                  >
                    Delete
                  </FormButton>
                </Grid>
                <Grid container justify='flex-end'>
                  <FormButton
                    variant='contained'
                    color='primary'
                    startIcon={<PublishIcon />}
                    style={{ backgroundColor: '#5470aa' }}
                  >
                    {status ? 'Unpublish' : 'Publish'}
                  </FormButton>
                  <Link to={`/view?id=${uuid}`} target='_blank' style={{ textDecoration: 'none' }}>
                    <FormButton variant='contained' color='primary' startIcon={<SendIcon />}>
                      Share
                    </FormButton>
                  </Link>
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
          </>
        )}
      </Grid>
    </>
  );
}
