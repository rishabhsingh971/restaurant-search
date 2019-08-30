import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      position: 'absolute',
      top: 10,
      left: 0,
      right: 0,
      margin: 'auto',
      zIndex: '1',
    },
    input: {
      flex: 1,
    },
    searchButton: {
      padding: 4,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

const SearchBox = React.forwardRef(({placeholder}, ref) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <IconButton className={classes.searchButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                id="searchbox"
                className={classes.input}
                placeholder={placeholder}
                inputProps={{'aria-label': placeholder}}
                ref={ref}
                type="search"
            />
        </Paper>
    )
});

export default SearchBox;