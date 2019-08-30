import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    width: '100%',
    height: '120px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '10px',
  },
  cover: {
    width: '100px',
    flexShrink: 0,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  title: {
    lineHeight: 1,
  },
  rating: {
    marginTop: '8px',
    display: 'inline-flex'
  },
  ratingText: {
    fontSize: '12px',
    marginLeft: '6px',
  },
  address: {
    fontSize: '13px',
    margin: '4px 0px'
  }
}));

function Restaurant({restaurant, index}) {
  const {id, name, photos, rating, user_ratings_total, icon, vicinity} = restaurant;

  const classes = useStyles();

  // const markerLetter = String.fromCharCode('A'.charCodeAt(0) + (index % 26));
  // const MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
  // const markerIcon = MARKER_PATH + markerLetter + '.png';

  const avatar = (photos && photos[0] && photos[0].getUrl && photos[0].getUrl()) || icon;

  return (
    <ListItem key={id} alignItems="flex-start">
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          component='img'
          title={name}
          image={avatar}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6" className={classes.title}>
              {name}
            </Typography>
            {rating && (
              <div className={classes.rating}>
                <Rating
                  name="rating"
                  value={rating}
                  precision={0.1}
                  readOnly
                  title={rating.toFixed(1)}
                  size='small'
                />
                <Typography
                  className={classes.ratingText}
                  variant="subtitle2"
                  color="textSecondary"
                >
                  {rating.toFixed(1)} ({user_ratings_total})
                </Typography>
              </div>
            )}
            {vicinity && (
              <Typography
                className={classes.address}
                variant="body2"
              >
                {vicinity}
              </Typography>
            )}
          </CardContent>
        </div>
      </Card>
    </ListItem>
  );
}

export default function Restaurants({restaurants}) {
  if (!restaurants) return null;

  restaurants = restaurants.map((restaurant, i) => (
    <Restaurant key={restaurant.id} restaurant={restaurant} index={i} />
  ));

  return (
    <List style={{maxHeight: '100%', overflowY: 'auto'}}>
      {restaurants}
    </List>
  )
}