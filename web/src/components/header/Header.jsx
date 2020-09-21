import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { useHistory } from 'react-router-dom';
import { Title } from './HeaderStyles';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
          onClick={() => history.push('/')}
        >
          <QuestionAnswerIcon />
        </IconButton>
        <Title variant='h6'>Project Falcon Form Builder</Title>
        <Button color='inherit' style={{ marginLeft: 'auto' }}>
          Login
        </Button>
        <Button color='inherit'>Sign up</Button>
      </Toolbar>
    </AppBar>
  );
}
