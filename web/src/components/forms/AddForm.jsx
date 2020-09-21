import React from 'react';
import { Fab, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AddFormWrapper } from './AddFormStyles';
import { useHistory } from 'react-router-dom';
import { createForm } from '../../http/restCalls';

export default function AddForm() {
  const history = useHistory();

  const handleAdd = async () => {
    try {
      const {
        data: { uuid },
      } = await createForm();
      history.push(`/edit?id=${uuid}`);
    } catch (err) {
      console.log(err);
    }
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
