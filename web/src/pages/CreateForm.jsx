import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddFormFieldModal from '../components/modals/AddFormFieldModal';
import { Button, Checkbox, Grid, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Field } from './CreateFormStyles';
import { selectModal, showAddFormFieldModal } from '../slices/modalSlice';
import { MODAL } from '../components/constants';

export default function CreateForm() {
  const modalState = useSelector(selectModal);
  const dispatch = useDispatch();

  return (
    <>
      {/* modalState === MODAL.ADD_FORM_FIELD &&  */}
      {<AddFormFieldModal />}
      <Grid container justify='center'>
        <Grid
          container
          type='flex'
          direction='column'
          justify='center'
          // alignItems='center'
          style={{
            padding: '2rem',
            backgroundColor: '#e8e8e8',
            boxShadow: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.141), 0 1px 3px 0 rgba(0,0,0,0.122)',
          }}
        >
          {/* <form className={classes.root} noValidate autoComplete="off"> */}
          <TextField id='standard-basic' label='Form Title' />
          <TextField id='standard-basic' label='Form Description' />
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            style={{ margin: '1rem 0', width: '8rem', backgroundColor: '#ce3030' }}
          >
            Delete
          </Button>
          <Button variant='contained' color='primary' startIcon={<SendIcon />} style={{ width: '8rem' }}>
            Share
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            style={{ width: '8rem', backgroundColor: '#399439' }}
            onClick={() => dispatch(showAddFormFieldModal())}
          >
            Add
          </Button>
          {/* <IconButton aria-label='delete' disabled color='primary'>
          <DeleteIcon />
        </IconButton> */}
          {/* <IconButton color='secondary' aria-label='add an alarm'>
          <AlarmIcon />
        </IconButton> */}
          {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
          {/* </form> */}
        </Grid>
        <Field>
          <Checkbox defaultChecked color='primary' inputProps={{ 'aria-label': 'required checkbox' }} />
          <p>Email *</p>
          <TextField id='outlined-basic' label='Outlined' variant='outlined' size='small' />
          <IconButton aria-label='delete' style={{ marginLeft: 'auto' }}>
            <HighlightOffIcon />
          </IconButton>
        </Field>
      </Grid>
    </>
  );
}
