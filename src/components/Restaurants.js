import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Restaurant from './Restaurant';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100%',
    overflowY: 'auto',
  }
}));

export default function Restaurants({restaurants}) {
  const classes = useStyles();

  if (!restaurants) return null;

  restaurants = restaurants.map((restaurant, i) => (
    <Restaurant key={restaurant.id} restaurant={restaurant} index={i} />
  ));

  return (
    <List className={classes.root}>
      {restaurants}
    </List>
  )
}