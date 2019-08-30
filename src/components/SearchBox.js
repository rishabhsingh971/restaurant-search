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
    // <TextField
    //     id="filled-simple-start-adornment"
    //     variant="filled"
    //     label="With filled TextField"
    //     inputprops={{
    //         startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
    //     }}
    //     ref={ref}
    // />
    // <div className="searchbox-with-icon" ref={ref}>
    //     <input
    //         id="searchbox"
    //         type="text"
    //         placeholder="Search…"
    //         className="input"
    //         aria-label="Search"
    //     // ref={ref}
    //     />
    //     <svg
    //         aria-hidden="true"
    //         className="svg-icon-search"
    //         width="18"
    //         height="18"
    //         viewBox="0 0 18 18"
    //     >
    //         <path d="M18 16.5l-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z" />
    //     </svg>
    // </div>
    });

export default SearchBox;