import React from 'react';
import {Input, InputAdornment} from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import './SearchBox.css';

const SearchBox = React.forwardRef((props, ref) => (
    <Input
        id="searchbox"
        startAdornment={
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
        }
        ref={ref}
        type="search"
    />
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
));

export default SearchBox;