import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function CSnackbar(props) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!props.message}
      autoHideDuration={3000}
      onClose={props.onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{props.message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="primary"
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}