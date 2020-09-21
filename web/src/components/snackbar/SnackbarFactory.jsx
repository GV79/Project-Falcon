import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

/*
 * Factory component which generates different types of snackbars depending on input params
 * type - 'error', 'warning', 'info', 'success'
 * hideDuration - # of milliseconds to pass before alert gets automatically hidden
 */
export default function SnackbarFactory({ type = 'success', message, hideDuration = 2000, unmount }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setTimeout(() => {
      unmount();
    }, 300);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={hideDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
