import React, { useCallback, useEffect, useState } from 'react';
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
import { deleteFormById, getFormById, updateForm } from '../http/restCalls';
import GenericLoader from '../components/loading/GenericLoader';
import debounce from 'lodash/debounce';
import SnackbarFactory from '../components/snackbar/SnackbarFactory';

export default function EditForm() {
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
  const modalState = useSelector(selectModal);
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [data, setData] = useState({
    title: 'Untitled form',
    description: '',
    status: false,
    uuid: null,
  });

  useEffect(() => {
    const params = history.location.search;
    const id = params.split('=')[1];

    (async () => {
      const { data } = await getFormById(id);
      setData(data);
      setLoading(false);
    })().catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }, [history.location.search]);

  const debouncedFormUpdate = useCallback(
    debounce(async (data, id) => {
      await updateForm(data, id);
      setShowSavedAlert(true);
    }, 500),
    []
  );

  const handleTitleChange = (value) => {
    const newData = { ...data, title: value };
    setData(newData);
    debouncedFormUpdate(newData, data.uuid);
  };

  const handleDescriptionChange = (value) => {
    const newData = { ...data, description: value };
    setData(newData);
    debouncedFormUpdate(newData, data.uuid);
  };

  const handleFormDeletion = async () => {
    try {
      await deleteFormById(data.uuid);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleFieldDeletion = (id) => {
    dispatch(deleteField(id));
  };

  /* Renders example depending on type of field */
  const renderField = (type) => {
    switch (type) {
      case FORM_TYPE.SINGLE:
        return (
          <TextField
            id='outlined-basic'
            label='Outlined'
            variant='outlined'
            size='small'
            disabled
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
      {showSavedAlert && <SnackbarFactory message='Changes have been saved' unmount={() => setShowSavedAlert(false)} />}
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
                  value={data.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  style={{ marginBottom: '0.5rem' }}
                />
                <TextField
                  label='Form Description'
                  value={data.description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
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
                    onClick={handleFormDeletion}
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
                    {data.status ? 'Unpublish' : 'Publish'}
                  </FormButton>
                  <Link to={`/view?id=${data.uuid}`} target='_blank' style={{ textDecoration: 'none' }}>
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
