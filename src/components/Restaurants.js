import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Restaurant from './Restaurant';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100%',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function Restaurants({restaurants, onClick, onMouseEnter, onMouseLeave}) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  if (!restaurants) return null;

  restaurants = restaurants.map((restaurant, i) => {
    return (
      <ListItem
        key={restaurant.id}
        alignItems="flex-start"
        onClick={() => {
          setSelectedIndex(i);
          onClick(i);
        }}
        onMouseEnter={() => onMouseEnter(i)}
        onMouseLeave={() => onMouseLeave(i)}
        selected={selectedIndex === i}
      >
        <Restaurant restaurant={restaurant} />
      </ListItem>
    )
  });

  return (
    <List className={classes.root}>
      {restaurants}
    </List>
  )
}