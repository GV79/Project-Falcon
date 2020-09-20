import React from 'react';
import { Fab, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AddFormWrapper } from './AddFormStyles';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

export default function AddForm() {
  const history = useHistory();

  const handleAdd = () => {
    history.push(`/create?id=${uuidv4()}`);
  };

  return (
    <AddFormWrapper onClick={handleAdd}>
      <Grid container direction='column' alignItems='center'>
        <Fab color='primary' aria-label='add' size='small' style={{ margin: '1rem 0' }}>
          <AddIcon />
        </Fab>
        Add Form
      </Grid>
    </AddFormWrapper>
  );
}
