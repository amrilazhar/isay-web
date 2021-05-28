import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../redux/actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FlashMessage = () => {
  
  const dispatch = useDispatch();

  const alert = useSelector ((state) => state?.alert)

  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(alertActions.clear())
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} style={{zIndex: 999999}}>
        <Alert onClose={handleClose} severity={(alert?.type === 'alert-success')?"success":"error"}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default FlashMessage
